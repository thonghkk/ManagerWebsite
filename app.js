/* =============================================
   APP.JS – Android Knowledge Checklist
   ============================================= */

const STORAGE_KEY = 'android_knowledge_v1';

// ── State ──────────────────────────────────────
let state = {
  categories: [],
  activeCatId: null,
};

let pendingDelete = null; // { type: 'item'|'category', catId, itemId } or { type: 'tip', catId, itemId, index }
let editingItem = null;   // { catId, itemId } or null
let editingCategory = null; // catId or null
let noteViewingItem = null; // { catId, itemId }

let currentDetailItem = null; // { catId, itemId }
let inputModalCallback = null; // config callback cho thẻ Input đa năng

// ── Persistence ────────────────────────────────
function saveState() {
  // Luôn lưu phòng hờ ở localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.categories));
  
  // Gửi dữ liệu App về database.json
  fetch('http://localhost:8080/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state.categories),
  }).catch(err => console.error('Python Server is not running'));

  // Tách riêng dữ liệu câu hỏi gửi về questions.json
  const questionsData = {};
  state.categories.forEach(cat => {
    cat.items.forEach(item => {
      if ((item.customQuestions && item.customQuestions.length > 0) || 
          (item.answers && Object.keys(item.answers).length > 0)) {
        questionsData[item.id] = {
          catId: cat.id,
          itemName: item.name,
          customQuestions: item.customQuestions || [],
          answers: item.answers || {}
        };
      }
    });
  });

  fetch('http://localhost:8080/api/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionsData),
  }).catch(err => console.error('Error saving questions'));
}

async function loadState() {
  let loadedData = null;
  let loadedQuestions = null;
  try {
    const resData = await fetch('http://localhost:8080/api/data');
    if (resData.ok) {
      const data = await resData.json();
      if (Array.isArray(data) && data.length > 0) loadedData = data;
    }
    const resQ = await fetch('http://localhost:8080/api/questions');
    if (resQ.ok) {
        loadedQuestions = await resQ.json();
    }
  } catch (err) {
    console.warn('Python server not found, falling back to localStorage');
  }

  if (!loadedData) {
    // Backup loading from localStorage
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        loadedData = JSON.parse(raw);
      } catch (_) { /* fall through */ }
    }
  }

  if (!loadedData) {
    // Fallback loading from DEFAULT_DATA
    loadedData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  loadedQuestions = loadedQuestions || {};

  // Normalize data and apply custom questions from questions.json
  loadedData.forEach(cat => {
    cat.items.forEach(item => {
      const qData = loadedQuestions[item.id];
      // Ưu tiên dữ liệu từ questions.json nếu có
      if (qData) {
          item.customQuestions = qData.customQuestions || [];
          item.answers = qData.answers || {};
      } else {
          item.customQuestions = item.customQuestions || [];
          item.answers = item.answers || {};
      }
    });
  });

  state.categories = loadedData;
  saveState();
}

// ── ID Generator ───────────────────────────────
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Selectors ──────────────────────────────────
const $ = (id) => document.getElementById(id);

// ── Stats ──────────────────────────────────────
function calcStats() {
  let totalDone = 0, totalAll = 0;
  state.categories.forEach(c => {
    totalDone += c.items.filter(i => i.done).length;
    totalAll  += c.items.length;
  });
  return { totalDone, totalAll };
}

function getCatStats(cat) {
  const done = cat.items.filter(i => i.done).length;
  return { done, total: cat.items.length };
}

// ── Render Sidebar ─────────────────────────────
function renderSidebar() {
  const nav = $('sidebar-nav');
  const { totalDone, totalAll } = calcStats();

  $('stat-done').textContent  = totalDone;
  $('stat-total').textContent = totalAll;
  const pct = totalAll ? Math.round((totalDone / totalAll) * 100) : 0;
  $('overall-progress-fill').style.width = pct + '%';
  $('overall-progress-pct').textContent  = pct + '%';

  nav.innerHTML = '';
  state.categories.forEach(cat => {
    const { done, total } = getCatStats(cat);
    const isActive = cat.id === state.activeCatId;
    const allDone  = total > 0 && done === total;

    const item = document.createElement('div');
    item.className = 'nav-item' + (isActive ? ' active' : '');
    item.dataset.catId = cat.id;
    item.innerHTML = `
      <span class="nav-item-icon">${cat.icon}</span>
      <div class="nav-item-info">
        <div class="nav-item-name">${escHtml(cat.name)}</div>
        <div class="nav-item-progress">${done}/${total} completed</div>
      </div>
      <span class="nav-badge ${allDone ? 'done' : ''}">${done}/${total}</span>
    `;
    item.addEventListener('click', () => activateCategory(cat.id));
    nav.appendChild(item);
  });
}

// ── Render Main ────────────────────────────────
function renderMain() {
  const cat = state.categories.find(c => c.id === state.activeCatId);
  const area = $('content-area');

  if (!cat) {
    $('topbar-title').textContent = 'Android Full Knowledge List';
    area.innerHTML = `
      <div class="welcome-screen">
        <div class="welcome-icon">📱</div>
        <h1>Android Full Knowledge List</h1>
        <p>Chọn một danh mục bên trái để xem và quản lý danh sách kiến thức.</p>
      </div>`;
    return;
  }

  const { done, total } = getCatStats(cat);
  const pct = total ? Math.round((done / total) * 100) : 0;
  $('topbar-title').textContent = `${cat.icon} ${cat.name}`;

  const itemsHtml = cat.items.map(item => renderCheckItem(cat.id, item)).join('');

  area.innerHTML = `
    <div class="category-header">
      <span class="category-header-icon">${cat.icon}</span>
      <div class="category-header-info">
        <div class="category-header-name">${escHtml(cat.name)}</div>
        <div class="category-header-meta">
          <span>${done} / ${total} completed • ${pct}%</span>
          <div class="cat-progress-bar">
            <div class="cat-progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
      </div>
      <div class="category-actions">
        <button class="btn-icon edit-cat" title="Sửa danh mục" id="cat-edit-btn">✏️</button>
        <button class="btn-icon del" title="Xoá danh mục" id="cat-del-btn">🗑️</button>
      </div>
    </div>
    <div class="checklist" id="checklist">
      ${cat.items.length === 0
        ? `<div style="color:var(--text-muted);font-size:14px;text-align:center;padding:40px 0;">Chưa có mục nào. Nhấn "+ Add Item" để thêm.</div>`
        : itemsHtml}
    </div>
  `;

  $('cat-edit-btn').addEventListener('click', () => openCategoryModal(cat.id));
  $('cat-del-btn').addEventListener('click',  () => openConfirmDelete('category', cat.id, null));
  attachItemEvents();
}

function renderCheckItem(catId, item) {
  const noteTag = item.note
    ? `<span class="note-badge">📝 Note</span>`
    : '';
  const notePreview = item.note
    ? `<div class="item-note-preview">${escHtml(item.note.split('\n')[0].slice(0, 80))}</div>`
    : '';

  const hasDetail = typeof ITEM_DETAILS !== 'undefined' && ITEM_DETAILS[item.id];

  return `
    <div class="check-item ${item.done ? 'done-item' : ''}" data-cat-id="${catId}" data-item-id="${item.id}">
      <div class="checkbox" data-action="toggle">✓</div>
      <div class="item-body">
        <div class="item-name ${hasDetail ? 'has-detail' : ''}" ${hasDetail ? 'data-action="detail"' : ''}>
          ${escHtml(item.name)}
          ${noteTag}
          ${hasDetail ? '<span class="detail-indicator" title="Xem chi tiết">ℹ️</span>' : ''}
        </div>
        ${notePreview}
      </div>
      <div class="item-actions">
        ${hasDetail ? '<button class="action-btn info" data-action="detail" title="Xem chi tiết">📖</button>' : ''}
        <button class="action-btn note" data-action="note" title="Xem / Sửa note">📝</button>
        <button class="action-btn edit" data-action="edit" title="Sửa tên">✏️</button>
        <button class="action-btn del"  data-action="delete" title="Xoá">🗑️</button>
      </div>
    </div>
  `;
}

function attachItemEvents() {
  const list = $('checklist');
  if (!list) return;
  list.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const row   = el.closest('.check-item');
    if (!row) return;
    const catId  = row.dataset.catId;
    const itemId = row.dataset.itemId;
    const action = el.dataset.action;

    if (action === 'toggle') toggleItem(catId, itemId);
    else if (action === 'edit')   openItemModal(catId, itemId);
    else if (action === 'note')   openNoteViewer(catId, itemId);
    else if (action === 'delete') openConfirmDelete('item', catId, itemId);
    else if (action === 'detail') openDetailModal(catId, itemId);
  });
}

// ── Activate Category ──────────────────────────
function activateCategory(catId) {
  state.activeCatId = catId;
  renderSidebar();
  renderMain();
}

// ── Toggle Item ────────────────────────────────
function toggleItem(catId, itemId) {
  const cat  = state.categories.find(c => c.id === catId);
  if (!cat) return;
  const item = cat.items.find(i => i.id === itemId);
  if (!item) return;
  item.done = !item.done;
  saveState();
  renderSidebar();
  renderMain();
}

// ── Item Modal ─────────────────────────────────
function openItemModal(catId, itemId) {
  editingItem = itemId ? { catId, itemId } : { catId, itemId: null };
  const cat  = state.categories.find(c => c.id === catId);
  const item = itemId ? cat.items.find(i => i.id === itemId) : null;

  $('modal-item-title').textContent = item ? 'Sửa Item' : 'Thêm Item';
  $('item-name-input').value = item ? item.name : '';
  $('item-note-input').value = item ? item.note : '';

  openModal('modal-item');
  setTimeout(() => $('item-name-input').focus(), 50);
}

function saveItem() {
  const name = $('item-name-input').value.trim();
  if (!name) { showToast('Vui lòng nhập tên mục!', 'error'); return; }

  const cat = state.categories.find(c => c.id === editingItem.catId);
  if (!cat) return;

  if (editingItem.itemId) {
    // Edit
    const item = cat.items.find(i => i.id === editingItem.itemId);
    if (item) { item.name = name; item.note = $('item-note-input').value.trim(); }
    showToast('Đã cập nhật!', 'success');
  } else {
    // Add
    cat.items.push({ id: uid(), name, done: false, note: $('item-note-input').value.trim() });
    showToast('Đã thêm mục mới!', 'success');
  }

  saveState();
  closeModal('modal-item');
  renderSidebar();
  renderMain();
}

function openDetailModal(catId, itemId) {
  currentDetailItem = { catId, itemId };
  const cat  = state.categories.find(c => c.id === catId);
  const item = cat ? cat.items.find(i => i.id === itemId) : null;
  if (!item) return;

  const detail = (typeof ITEM_DETAILS !== 'undefined') && ITEM_DETAILS[item.id];
  if (!detail) { showToast('Chưa có thông tin chi tiết cho mục này.', ''); return; }

  $('modal-detail-title').textContent = detail.title || item.name;
  $('detail-summary').textContent = detail.summary || '';

  const pointsEl = $('detail-points');
  pointsEl.innerHTML = (detail.points || []).map(p => `<li>${escHtml(p)}</li>`).join('');
  $('detail-points-section').style.display = detail.points && detail.points.length ? '' : 'none';

  renderTips(item, detail.interviewTips || []);

  const link = $('detail-source-link');
  if (detail.url) { link.href = detail.url; link.style.display = ''; }
  else { link.style.display = 'none'; }

  openModal('modal-detail');
}

function renderTips(item, defaultTips) {
  const tipsEl = $('detail-tips');
  
  // Khởi tạo collections nếu chưa có
  if (!item.customQuestions) item.customQuestions = [];
  if (!item.answers) item.answers = {};

  const allTips = [];
  defaultTips.forEach(tip => allTips.push({ type: 'default', text: tip, id: tip }));
  item.customQuestions.forEach((q, idx) => allTips.push({ type: 'custom', text: q, id: String(idx) }));

  let html = '';
  allTips.forEach((tip) => {
    const answer = item.answers[tip.id] || '';
    html += `
      <li class="tip-item">
        <div class="tip-question-row">
          <div class="tip-question-text">${escHtml(tip.text)}</div>
          <div class="tip-actions">
            <button class="action-btn edit tip-btn" data-action="edit-answer" data-id="${escHtml(tip.id)}" title="Trả lời / Sửa">✏️</button>
            ${tip.type === 'custom' ? `<button class="action-btn del tip-btn" data-action="delete-tip" data-idx="${tip.id}" title="Xoá câu hỏi">🗑️</button>` : ''}
          </div>
        </div>
        ${answer ? `<div class="tip-answer-box">${escHtml(answer)}</div>` : ''}
      </li>
    `;
  });

  tipsEl.innerHTML = html;
  
  // Hiển thị phần Tips nếu có bất kỳ tip nào
  $('detail-tips-section').style.display = allTips.length ? '' : 'none';
  // Luôn luôn hiển thị Add Button, nên ta chuyển logic 'none' chỉ áp dụng cho mảng rỗng nếu cần,
  // nhưng ở đây có nút Add Button thì không nên ẩn section.
  $('detail-tips-section').style.display = ''; 
}

// ── Generic Input Modal ─────────────────────────
function openInputModal(title, label, value, callback) {
  $('modal-input-title').textContent = title;
  $('modal-input-label').innerHTML = `${label} <span class="required">*</span>`;
  $('modal-input-textarea').value = value || '';
  inputModalCallback = callback;
  openModal('modal-input');
  setTimeout(() => $('modal-input-textarea').focus(), 50);
}

function saveInputModal() {
  const val = $('modal-input-textarea').value.trim();
  if (!val) {
    showToast('Nội dung không được để trống!', 'error');
    return;
  }
  if (inputModalCallback) {
    inputModalCallback(val);
  }
  closeModal('modal-input');
}

// ── Note Viewer ────────────────────────────────
function openNoteViewer(catId, itemId) {
  noteViewingItem = { catId, itemId };
  const cat  = state.categories.find(c => c.id === catId);
  const item = cat ? cat.items.find(i => i.id === itemId) : null;
  if (!item) return;

  $('modal-note-title').textContent = item.name;
  $('modal-note-content').textContent = item.note || '(Chưa có ghi chú)';
  openModal('modal-note');
}

// ── Category Modal ─────────────────────────────
function openCategoryModal(catId) {
  editingCategory = catId || null;
  const cat = catId ? state.categories.find(c => c.id === catId) : null;

  $('modal-category-title').textContent = cat ? 'Sửa Danh mục' : 'Thêm Danh mục';
  $('category-name-input').value = cat ? cat.name : '';
  $('category-icon-input').value = cat ? cat.icon : '📦';

  openModal('modal-category');
  setTimeout(() => $('category-name-input').focus(), 50);
}

function saveCategory() {
  const name = $('category-name-input').value.trim();
  const icon = $('category-icon-input').value.trim() || '📦';
  if (!name) { showToast('Vui lòng nhập tên danh mục!', 'error'); return; }

  if (editingCategory) {
    const cat = state.categories.find(c => c.id === editingCategory);
    if (cat) { cat.name = name; cat.icon = icon; }
    showToast('Đã cập nhật danh mục!', 'success');
  } else {
    state.categories.push({ id: uid(), name, icon, items: [] });
    showToast('Đã thêm danh mục mới!', 'success');
  }

  saveState();
  closeModal('modal-category');
  renderSidebar();
  if (editingCategory && editingCategory === state.activeCatId) renderMain();
}

// ── Confirm Delete ─────────────────────────────
function openConfirmDelete(type, catId, itemId, index = null) {
  pendingDelete = { type, catId, itemId, index };

  if (type === 'item') {
    const cat  = state.categories.find(c => c.id === catId);
    const item = cat ? cat.items.find(i => i.id === itemId) : null;
    $('modal-confirm-msg').textContent = `Xoá mục "${item ? item.name : ''}"?`;
  } else if (type === 'tip') {
    $('modal-confirm-msg').textContent = `Bạn có chắc muốn xoá câu hỏi interview này? (Các câu trả lời cũng sẽ bị mất)`;
  } else {
    const cat = state.categories.find(c => c.id === catId);
    $('modal-confirm-msg').textContent = `Xoá toàn bộ danh mục "${cat ? cat.name : ''}" và tất cả mục bên trong?`;
  }

  openModal('modal-confirm');
}

function confirmDelete() {
  if (!pendingDelete) return;
  const { type, catId, itemId, index } = pendingDelete;

  if (type === 'item') {
    const cat = state.categories.find(c => c.id === catId);
    if (cat) cat.items = cat.items.filter(i => i.id !== itemId);
    showToast('Đã xoá mục!', 'success');
  } else if (type === 'tip') {
    const cat = state.categories.find(c => c.id === catId);
    if (cat) {
      const item = cat.items.find(i => i.id === itemId);
      if (item && item.customQuestions && item.answers) {
         // Lấy key đang theo Index của customQuestion.
         const ansKey = String(index);
         delete item.answers[ansKey];
         item.customQuestions.splice(index, 1);
         // Shift answers of subsequent custom questions down by 1
         const newAnswers = {};
         for (const [k, v] of Object.entries(item.answers)) {
            // IF it is a number (a custom question ID) and it's > index, subtract 1
            if (!isNaN(k)) {
               const numK = parseInt(k, 10);
               if (numK > parseInt(index, 10)) {
                  newAnswers[String(numK - 1)] = v;
               } else {
                  newAnswers[k] = v;
               }
            } else {
               // Default question IDs remain unchanged
               newAnswers[k] = v;
            }
         }
         item.answers = newAnswers;
         showToast('Đã xoá câu hỏi!', 'success');
      }
    }
  } else {
    state.categories = state.categories.filter(c => c.id !== catId);
    if (state.activeCatId === catId) state.activeCatId = null;
    showToast('Đã xoá danh mục!', 'success');
  }

  saveState();
  closeModal('modal-confirm');
  renderSidebar();
  
  if (type === 'tip') {
     // Re-render detail tips without closing modal
     const detailConfig = typeof ITEM_DETAILS !== 'undefined' ? ITEM_DETAILS[itemId] : null;
     const catItem = state.categories.find(c => c.id === catId)?.items.find(i => i.id === itemId);
     if (catItem && detailConfig) renderTips(catItem, detailConfig.interviewTips || []);
  } else {
     renderMain();
  }
  pendingDelete = null;
}

// ── Modal Helpers ──────────────────────────────
function openModal(id) {
  $(id).classList.add('open');
}
function closeModal(id) {
  $(id).classList.remove('open');
}

// ── Toast ──────────────────────────────────────
let toastTimer;
function showToast(msg, type = '') {
  const toast = $('toast');
  toast.textContent = msg;
  toast.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 2500);
}

// ── Escape HTML ────────────────────────────────
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Event Wiring ───────────────────────────────
function wireEvents() {
  // Hamburger
  $('hamburger').addEventListener('click', () => {
    $('sidebar').classList.toggle('collapsed');
  });

  // Add item button (topbar)
  $('btn-add-item').addEventListener('click', () => {
    if (!state.activeCatId) { showToast('Chọn danh mục trước!', 'error'); return; }
    openItemModal(state.activeCatId, null);
  });

  // Add category button
  $('btn-add-category').addEventListener('click', () => openCategoryModal(null));

  // Modal: item
  $('modal-item-close').addEventListener('click',  () => closeModal('modal-item'));
  $('modal-item-cancel').addEventListener('click', () => closeModal('modal-item'));
  $('modal-item-save').addEventListener('click',   saveItem);
  $('item-name-input').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) saveItem(); });

  // Modal: note
  $('modal-note-close').addEventListener('click', () => closeModal('modal-note'));
  $('modal-note-edit').addEventListener('click', () => {
    closeModal('modal-note');
    if (noteViewingItem) openItemModal(noteViewingItem.catId, noteViewingItem.itemId);
  });

  // Modal: category
  $('modal-category-close').addEventListener('click',  () => closeModal('modal-category'));
  $('modal-category-cancel').addEventListener('click', () => closeModal('modal-category'));
  $('modal-category-save').addEventListener('click',   saveCategory);
  $('category-name-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') saveCategory(); });

  // Modal: confirm
  $('modal-confirm-close').addEventListener('click',  () => closeModal('modal-confirm'));
  $('modal-confirm-cancel').addEventListener('click', () => closeModal('modal-confirm'));
  $('modal-confirm-ok').addEventListener('click',     confirmDelete);

  // Modal: detail
  $('modal-detail-close').addEventListener('click', () => closeModal('modal-detail'));

  // Detail Modal Add Custom Tip Button
  $('btn-add-tip').addEventListener('click', () => {
     if (!currentDetailItem) return;
     openInputModal('Thêm câu hỏi', 'Nội dung câu hỏi', '', (val) => {
        const cat = state.categories.find(c => c.id === currentDetailItem.catId);
        if (!cat) return;
        const item = cat.items.find(i => i.id === currentDetailItem.itemId);
        if (!item) return;

        if (!item.customQuestions) item.customQuestions = [];
        item.customQuestions.push(val);
        saveState();
        showToast('Đã thêm câu hỏi!', 'success');

        const detailConfig = typeof ITEM_DETAILS !== 'undefined' ? ITEM_DETAILS[item.id] : null;
        if (detailConfig) renderTips(item, detailConfig.interviewTips || []);
     });
  });

  // Delegate cho danh sách Tips (Edit / Delete)
  $('detail-tips').addEventListener('click', (e) => {
     const el = e.target.closest('[data-action]');
     if (!el) return;
     const action = el.dataset.action;
     
     const cat = state.categories.find(c => c.id === currentDetailItem.catId);
     const item = cat ? cat.items.find(i => i.id === currentDetailItem.itemId) : null;
     if (!item) return;

     if (action === 'edit-answer') {
        const tipId = el.dataset.id;
        const currentAns = item.answers && item.answers[tipId] ? item.answers[tipId] : '';
        openInputModal('Trả lời câu hỏi', 'Câu trả lời của bạn', currentAns, (val) => {
           if (!item.answers) item.answers = {};
           item.answers[tipId] = val;
           saveState();
           showToast('Đã lưu câu trả lời!', 'success');
           const detailConfig = typeof ITEM_DETAILS !== 'undefined' ? ITEM_DETAILS[item.id] : null;
           if (detailConfig) renderTips(item, detailConfig.interviewTips || []);
        });
     } else if (action === 'delete-tip') {
        const customIdx = el.dataset.idx;
        openConfirmDelete('tip', currentDetailItem.catId, currentDetailItem.itemId, customIdx);
     }
  });

  // Modal: Generic Input
  $('modal-input-close').addEventListener('click', () => closeModal('modal-input'));
  $('modal-input-cancel').addEventListener('click', () => closeModal('modal-input'));
  $('modal-input-save').addEventListener('click', saveInputModal);

  // Close modals clicking overlay
  ['modal-item', 'modal-note', 'modal-category', 'modal-confirm', 'modal-detail', 'modal-input'].forEach(id => {
    $(id).addEventListener('click', (e) => {
      if (e.target === $(id)) closeModal(id);
    });
  });

  // Keyboard: Escape closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['modal-item', 'modal-note', 'modal-category', 'modal-confirm', 'modal-detail', 'modal-input'].forEach(closeModal);
    }
  });
}

// ── Bootstrap ──────────────────────────────────
async function init() {
  await loadState();
  if (!state.activeCatId && state.categories.length > 0) {
    state.activeCatId = state.categories[0].id;
  }
  wireEvents();
  renderSidebar();
  renderMain();
  calcStats();
}

document.addEventListener('DOMContentLoaded', init);

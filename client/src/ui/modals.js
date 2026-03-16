import { $, escHtml } from '../utils/helpers.js';
import { getState, saveItem, saveCategory, deleteCategory, deleteItem, deleteTip, addCustomTip, saveAnswer } from '../state/store.js';
import { showToast } from './toast.js';
import { ITEM_DETAILS } from '../data/itemDetails.js';

let pendingDelete = null; // { type: 'item'|'category', catId, itemId } or { type: 'tip', catId, itemId, index }
let editingItem = null;   // { catId, itemId } or null
let editingCategory = null; // catId or null
let noteViewingItem = null; // { catId, itemId }
export let currentDetailItem = null; // { catId, itemId }
let inputModalCallback = null;
let initialInputVal = '';
let initialItemData = { name: '', note: '' };
let initialCategoryData = { name: '', icon: '' };

export function openModal(id) {
  $(id).classList.add('open');
}

export function closeModal(id) {
  $(id).classList.remove('open');
}

// ── Generic Input Modal ─────────────────────────
export function openInputModal(title, label, value, callback) {
  $('modal-input-title').textContent = title;
  $('modal-input-label').innerHTML = `${label} <span class="required">*</span>`;
  $('modal-input-textarea').value = value || '';
  initialInputVal = value || '';
  inputModalCallback = callback;
  openModal('modal-input');
  setTimeout(() => $('modal-input-textarea').focus(), 50);
}

export function saveInputModal() {
  const val = $('modal-input-textarea').value.trim();
  if (!val) {
    showToast('Nội dung không được để trống!', 'error');
    return;
  }
  if (val === initialInputVal.trim()) {
    closeModal('modal-input');
    return;
  }
  if (inputModalCallback) {
    inputModalCallback(val);
  }
  closeModal('modal-input');
}


// ── Item Modal ─────────────────────────────────
export function openItemModal(catId, itemId) {
  editingItem = itemId ? { catId, itemId } : { catId, itemId: null };
  const cat  = getState().categories.find(c => c.id === catId);
  const item = itemId ? cat.items.find(i => i.id === itemId) : null;

  $('modal-item-title').textContent = item ? 'Sửa Item' : 'Thêm Item';
  $('item-name-input').value = item ? item.name : '';
  $('item-note-input').value = item ? item.note : '';
  initialItemData = { name: item ? item.name : '', note: item ? item.note : '' };

  openModal('modal-item');
  setTimeout(() => $('item-name-input').focus(), 50);
}

export function handleSaveItem() {
  const name = $('item-name-input').value.trim();
  if (!name) { showToast('Vui lòng nhập tên mục!', 'error'); return; }

  const note = $('item-note-input').value.trim();
  
  if (name === initialItemData.name && note === initialItemData.note) {
    closeModal('modal-item');
    return;
  }

  saveItem(editingItem.catId, editingItem.itemId, { name, note });
  showToast(editingItem.itemId ? 'Đã cập nhật!' : 'Đã thêm mục mới!', 'success');
  closeModal('modal-item');
}

// ── Detail Modal ─────────────────────────────────
export function openDetailModal(catId, itemId) {
  currentDetailItem = { catId, itemId };
  const cat  = getState().categories.find(c => c.id === catId);
  const item = cat ? cat.items.find(i => i.id === itemId) : null;
  if (!item) return;

  const detail = typeof ITEM_DETAILS !== 'undefined' ? ITEM_DETAILS[item.id] : null;
  if (!detail) { showToast('Chưa có thông tin chi tiết cho mục này.', ''); return; }

  $('modal-detail-title').textContent = detail.title || item.name;
  $('detail-summary').textContent = detail.summary || '';
  
  const pointsEl = $('detail-points');
  pointsEl.innerHTML = (detail.points || []).map(p => `<li>${escHtml(p)}</li>`).join('');
  $('detail-points-section').style.display = detail.points && detail.points.length ? '' : 'none';

  // Handle code display if exists
  let codeHtml = '';
  if (detail.code) {
    codeHtml = `
      <div class="detail-section">
        <h3 class="detail-section-title">💻 Code Sample</h3>
        <pre class="detail-code"><code>${escHtml(detail.code)}</code></pre>
      </div>
    `;
  }
  
  // Find a place to insert code or just append to pointsEl's parent
  const existingCode = $('detail-code-section');
  if (existingCode) existingCode.remove();
  
  if (detail.code) {
    const codeDiv = document.createElement('div');
    codeDiv.id = 'detail-code-section';
    codeDiv.innerHTML = codeHtml;
    pointsEl.parentElement.after(codeDiv);
  }

  renderTips(item, detail.interviewTips || []);

  const link = $('detail-source-link');
  if (detail.url) { link.href = detail.url; link.style.display = ''; }
  else { link.style.display = 'none'; }

  openModal('modal-detail');
}

export function renderTips(item, defaultTips) {
  const tipsEl = $('detail-tips');
  
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
  $('detail-tips-section').style.display = ''; 
}

// ── Note Viewer ────────────────────────────────
export function openNoteViewer(catId, itemId) {
  noteViewingItem = { catId, itemId };
  const cat  = getState().categories.find(c => c.id === catId);
  const item = cat ? cat.items.find(i => i.id === itemId) : null;
  if (!item) return;

  $('modal-note-title').textContent = item.name;
  $('modal-note-content').textContent = item.note || '(Chưa có ghi chú)';
  openModal('modal-note');
}

export function handleEditNote() {
    closeModal('modal-note');
    if (noteViewingItem) openItemModal(noteViewingItem.catId, noteViewingItem.itemId);
}


// ── Category Modal ─────────────────────────────
export function openCategoryModal(catId) {
  editingCategory = catId || null;
  const cat = catId ? getState().categories.find(c => c.id === catId) : null;

  $('modal-category-title').textContent = cat ? 'Sửa Danh mục' : 'Thêm Danh mục';
  $('category-name-input').value = cat ? cat.name : '';
  $('category-icon-input').value = cat ? cat.icon : '📦';
  initialCategoryData = { name: cat ? cat.name : '', icon: cat ? cat.icon : '📦' };

  openModal('modal-category');
  setTimeout(() => $('category-name-input').focus(), 50);
}

export function handleSaveCategory() {
  const name = $('category-name-input').value.trim();
  const icon = $('category-icon-input').value.trim() || '📦';
  if (!name) { showToast('Vui lòng nhập tên danh mục!', 'error'); return; }

  if (name === initialCategoryData.name && icon === initialCategoryData.icon) {
    closeModal('modal-category');
    return;
  }

  saveCategory(editingCategory, { name, icon });
  showToast(editingCategory ? 'Đã cập nhật danh mục!' : 'Đã thêm danh mục mới!', 'success');
  closeModal('modal-category');
}

// ── Confirm Delete ─────────────────────────────
export function openConfirmDelete(type, catId, itemId, index = null) {
  pendingDelete = { type, catId, itemId, index };

  if (type === 'item') {
    const cat  = getState().categories.find(c => c.id === catId);
    const item = cat ? cat.items.find(i => i.id === itemId) : null;
    $('modal-confirm-msg').textContent = `Xoá mục "${item ? item.name : ''}"?`;
  } else if (type === 'tip') {
    $('modal-confirm-msg').textContent = `Bạn có chắc muốn xoá câu hỏi interview này? (Các câu trả lời cũng sẽ bị mất)`;
  } else {
    const cat = getState().categories.find(c => c.id === catId);
    $('modal-confirm-msg').textContent = `Xoá toàn bộ danh mục "${cat ? cat.name : ''}" và tất cả mục bên trong?`;
  }

  openModal('modal-confirm');
}

export function handleConfirmDelete() {
  if (!pendingDelete) return;
  const { type, catId, itemId, index } = pendingDelete;

  if (type === 'item') {
    deleteItem(catId, itemId);
    showToast('Đã xoá mục!', 'success');
  } else if (type === 'tip') {
    deleteTip(catId, itemId, index);
    showToast('Đã xoá câu hỏi!', 'success');
  } else {
    deleteCategory(catId);
    showToast('Đã xoá danh mục!', 'success');
  }

  closeModal('modal-confirm');
  pendingDelete = null;
}

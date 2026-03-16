import { $, escHtml } from '../utils/helpers.js';
import { getState, toggleItem } from '../state/store.js';
import { getCatStats } from './sidebar.js';
import { ITEM_DETAILS } from '../data/itemDetails.js';
import { openCategoryModal, openConfirmDelete, openItemModal, openNoteViewer, openDetailModal } from './modals.js';

export function renderMain() {
  const state = getState();
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

  const isDesignPattern = cat.id === 'design-pattern';
  const itemsHtml = cat.items.map(item => isDesignPattern
    ? renderPatternCard(cat.id, item)
    : renderCheckItem(cat.id, item)).join('');

  area.innerHTML = `
    <div class="category-header fade-up">
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
        <button class="btn-icon edit-cat" title="Sửa danh mục" data-cat-action="edit" data-cat-id="${cat.id}">✏️</button>
        <button class="btn-icon del" title="Xoá danh mục" data-cat-action="delete" data-cat-id="${cat.id}">🗑️</button>
      </div>
    </div>
    <div class="${isDesignPattern ? 'pattern-grid' : 'checklist'} blur-in" id="checklist">
      ${cat.items.length === 0
      ? `<div style="color:var(--text-muted);font-size:14px;text-align:center;padding:40px 0;">Chưa có mục nào. Nhấn "+ Add Item" để thêm.</div>`
      : itemsHtml}
    </div>
  `;

  attachMainEvents(area);
}

// Set event listener once on the persistent area
let mainEventsAttached = false;
function attachMainEvents(area) {
  if (mainEventsAttached) return;
  mainEventsAttached = true;

  area.addEventListener('click', (e) => {
    // 1. Handle Category Actions
    const catBtn = e.target.closest('[data-cat-action]');
    if (catBtn) {
      e.preventDefault();
      e.stopPropagation();
      const action = catBtn.dataset.catAction;
      const catId = catBtn.dataset.catId;
      if (action === 'edit') openCategoryModal(catId);
      else if (action === 'delete') openConfirmDelete('category', catId, null);
      return;
    }

    // 2. Handle Item Actions
    const el = e.target.closest('[data-action]');
    if (!el) return;

    // Find the container (check-item or pattern-card)
    const row = el.closest('.check-item') || el.closest('.pattern-card');
    if (!row) return;

    e.preventDefault();
    const catId = row.dataset.catId;
    const itemId = row.dataset.itemId;
    const action = el.dataset.action;

    if (action === 'toggle') toggleItem(catId, itemId);
    else if (action === 'edit') openItemModal(catId, itemId);
    else if (action === 'note') openNoteViewer(catId, itemId);
    else if (action === 'delete') openConfirmDelete('item', catId, itemId);
    else if (action === 'detail') openDetailModal(catId, itemId);
  });
}

function renderPatternCard(catId, item) {
  const detail = ITEM_DETAILS[item.id] || {};
  let typeClass = 'type-creational';
  let typeLabel = 'Creational';

  // Determine type based on item.id or name for demonstration
  const creational = ['dp1', 'dp2', 'dp3', 'dp4', 'dp5'];
  const structural = ['dp6', 'dp7', 'dp8', 'dp9', 'dp10', 'dp11'];

  if (structural.includes(item.id)) {
    typeClass = 'type-structural';
    typeLabel = 'Structural';
  } else if (!creational.includes(item.id)) {
    typeClass = 'type-behavioral';
    typeLabel = 'Behavioral';
  }

  const chips = (detail.points || []).map(p => `<span class="pattern-chip">${escHtml(p)}</span>`).join('');

  return `
    <div class="pattern-card ${item.done ? 'done-pattern' : ''}" data-cat-id="${catId}" data-item-id="${item.id}">
      <div class="pattern-card-header">
        <span class="pattern-type-tag ${typeClass}">${typeLabel}</span>
        <div class="pattern-check-btn" data-action="toggle">✓</div>
      </div>
      <h3 class="pattern-card-title">${escHtml(item.name)}</h3>
      <p class="pattern-card-summary">${escHtml(detail.summary || '')}</p>
      <div class="pattern-card-chips">
        ${chips}
      </div>
      <div class="pattern-card-footer">
        <div class="pattern-action-btns">
            <button class="action-btn info" data-action="detail" title="Xem chi tiết">📖</button>
            <button class="action-btn note" data-action="note" title="Ghi chú">📝</button>
        </div>
        <div class="pattern-action-btns">
            <button class="action-btn edit" data-action="edit" title="Sửa">✏️</button>
            <button class="action-btn del" data-action="delete" title="Xoá">🗑️</button>
        </div>
      </div>
    </div>
  `;
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

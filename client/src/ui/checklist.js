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
  $('cat-del-btn').addEventListener('click', () => openConfirmDelete('category', cat.id, null));
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

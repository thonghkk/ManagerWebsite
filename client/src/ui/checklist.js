import { $, escHtml } from '../utils/helpers.js';
import { getState, toggleItem } from '../state/store.js';
import { getCatStats } from './sidebar.js';
import { ITEM_DETAILS } from '../data/itemDetails.js';
import { openCategoryModal, openConfirmDelete, openItemModal, openNoteViewer } from './modals.js';
import { openDetailSPA } from '../detail.js';

let activePatternFilter = localStorage.getItem('android_knowledge_active_filter') || 'all';

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
  
  let itemsToRender = cat.items;
  if (isDesignPattern && activePatternFilter !== 'all') {
    itemsToRender = cat.items.filter(item => getPatternType(item.id) === activePatternFilter);
  }

  const itemsHtml = itemsToRender.map(item => isDesignPattern
    ? renderPatternCard(cat.id, item)
    : renderCheckItem(cat.id, item)).join('');

  let filterHtml = '';
  if (isDesignPattern) {
    filterHtml = `
      <div class="pattern-filters">
        <button class="filter-btn ${activePatternFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
        <button class="filter-btn ${activePatternFilter === 'creational' ? 'active' : ''}" data-filter="creational">Creational</button>
        <button class="filter-btn ${activePatternFilter === 'structural' ? 'active' : ''}" data-filter="structural">Structural</button>
        <button class="filter-btn ${activePatternFilter === 'behavioral' ? 'active' : ''}" data-filter="behavioral">Behavioral</button>
      </div>
    `;
  }

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
    ${filterHtml}
    <div class="${isDesignPattern ? 'pattern-grid' : 'checklist'} blur-in" id="checklist">
      ${itemsToRender.length === 0
      ? `<div style="color:var(--text-muted);font-size:14px;text-align:center;padding:40px 0;">Không tìm thấy mục nào.</div>`
      : itemsHtml}
    </div>
  `;

  attachMainEvents(area);
}

// Helper to determine pattern type
function getPatternType(itemId) {
  const creational = ['dp1', 'dp2', 'dp3', 'dp4', 'dp5'];
  const structural = ['dp6', 'dp7', 'dp8', 'dp9', 'dp10', 'dp11'];
  if (creational.includes(itemId)) return 'creational';
  if (structural.includes(itemId)) return 'structural';
  return 'behavioral';
}

// Set event listener once on the persistent area
let mainEventsAttached = false;
function attachMainEvents(area) {
  if (mainEventsAttached) return;
  mainEventsAttached = true;

  area.addEventListener('click', (e) => {
    // Handle Pattern Filters
    const filterBtn = e.target.closest('.filter-btn');
    if (filterBtn) {
      e.stopPropagation();
      activePatternFilter = filterBtn.dataset.filter;
      localStorage.setItem('android_knowledge_active_filter', activePatternFilter);
      renderMain(); // Re-render the main area to apply the filter
      return;
    }

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
    const actionEl = e.target.closest('[data-action]');
    
    if (actionEl) {
      const row = actionEl.closest('.check-item') || actionEl.closest('.pattern-card');
      if (!row) return;

      e.preventDefault();
      const catId = row.dataset.catId;
      const itemId = row.dataset.itemId;
      const action = actionEl.dataset.action;

      if (action === 'toggle') toggleItem(catId, itemId);
      else if (action === 'edit') openItemModal(catId, itemId);
      else if (action === 'note') openNoteViewer(catId, itemId);
      else if (action === 'delete') openConfirmDelete('item', catId, itemId);
      else if (action === 'detail') {
         history.pushState({ view: 'detail', catId, itemId }, '', '?id=' + itemId);
         openDetailSPA(catId, itemId);
      }
      return;
    }

    // 3. Handle clicking on the entire pattern card
    const cardEl = e.target.closest('.pattern-card');
    if (cardEl) {
      e.preventDefault();
      const catId = cardEl.dataset.catId;
      const itemId = cardEl.dataset.itemId;
      history.pushState({ view: 'detail', catId, itemId }, '', '?id=' + itemId);
      openDetailSPA(catId, itemId);
      return;
    }
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

  const hasDetail = true;

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

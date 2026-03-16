import { $, escHtml } from '../utils/helpers.js';
import { getState, setActiveCatId } from '../state/store.js';
import { openCategoryModal, openConfirmDelete } from './modals.js';

export function calcStats() {
  let totalDone = 0, totalAll = 0;
  getState().categories.forEach(c => {
    totalDone += c.items.filter(i => i.done).length;
    totalAll  += c.items.length;
  });
  return { totalDone, totalAll };
}

export function getCatStats(cat) {
  const done = cat.items.filter(i => i.done).length;
  return { done, total: cat.items.length };
}

export function renderSidebar() {
  const nav = $('sidebar-nav');
  const state = getState();
  const { totalDone, totalAll } = calcStats();

  $('stat-done').textContent  = totalDone;
  $('stat-total').textContent = totalAll;
  const pct = totalAll ? Math.round((totalDone / totalAll) * 100) : 0;
  $('overall-progress-fill').style.width = pct + '%';
  $('overall-progress-pct').textContent  = pct + '%';

  nav.innerHTML = '';
  // Wrap in a fragment for smoother single injection
  const fragment = document.createDocumentFragment();
  
  state.categories.forEach(cat => {
    const { done, total } = getCatStats(cat);
    const isActive = cat.id === state.activeCatId;
    const allDone  = total > 0 && done === total;

    const item = document.createElement('div');
    item.className = 'nav-item' + (isActive ? ' active' : '') + ' fade-up';
    item.dataset.catId = cat.id;
    item.innerHTML = `
      <span class="nav-item-icon">${cat.icon}</span>
      <div class="nav-item-info">
        <div class="nav-item-name">${escHtml(cat.name)}</div>
        <div class="nav-item-progress">${done}/${total} completed</div>
      </div>
      <span class="nav-badge ${allDone ? 'done' : ''}">${done}/${total}</span>
    `;
    fragment.appendChild(item);
  });
  nav.appendChild(fragment);

  attachSidebarEvents(nav);
}

// Sidebar delegation to handle item selection and sub-actions
let sidebarEventsAttached = false;
function attachSidebarEvents(nav) {
  if (sidebarEventsAttached) return;
  sidebarEventsAttached = true;

  nav.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('[data-cat-action]');
    if (actionBtn) {
      e.stopPropagation(); // Prevent category activation when clicking action buttons
      const action = actionBtn.dataset.catAction;
      const catId = actionBtn.dataset.catId;
      if (action === 'edit') openCategoryModal(catId);
      else if (action === 'delete') openConfirmDelete('category', catId, null);
      return;
    }

    const navItem = e.target.closest('.nav-item');
    if (navItem) {
      const catId = navItem.dataset.catId;
      setActiveCatId(catId);
    }
  });
}

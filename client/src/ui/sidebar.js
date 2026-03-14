import { $, escHtml } from '../utils/helpers.js';
import { getState, setActiveCatId } from '../state/store.js';

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
    item.addEventListener('click', () => {
      setActiveCatId(cat.id);
    });
    nav.appendChild(item);
  });
}

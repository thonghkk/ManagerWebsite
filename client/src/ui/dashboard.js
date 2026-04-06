import { $ } from '../utils/helpers.js';
import { getCustomHubs, setActiveHubId, getActiveHubId, getActiveHubConfig } from '../data/hubs.js';
import { loadState } from '../state/store.js';

export function renderDashboard() {
  const container = $('hub-grid');
  if (!container) return;

  const hubs = getCustomHubs();
  container.innerHTML = '';

  hubs.forEach(hub => {
    const el = document.createElement('div');
    el.className = 'hub-card';
    el.style.setProperty('--hub-theme', hub.theme || '#6c63ff');
    
    el.innerHTML = `
      <div class="hub-card-icon">${hub.icon || '📦'}</div>
      <div class="hub-card-title">${hub.name}</div>
      <div class="hub-card-desc">${hub.sub || 'Knowledge Hub'}</div>
    `;

    el.addEventListener('click', () => {
      selectHub(hub.id);
    });

    const editBtn = document.createElement('div');
    editBtn.className = 'hub-edit-btn';
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Sửa Hub';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      import('./hubModal.js').then(({ openHubModal }) => openHubModal(hub));
    });

    el.appendChild(editBtn);

    container.appendChild(el);
  });

  const btnAdd = document.createElement('div');
  btnAdd.className = 'hub-card btn-add-hub';
  btnAdd.innerHTML = `
    <div class="hub-card-icon">+</div>
    <div class="hub-card-title">Tạo mới Hub</div>
    <div class="hub-card-desc">Thêm phân vùng kiến thức</div>
  `;
  
  btnAdd.addEventListener('click', () => {
    import('./modals.js').then(({ openInputModal }) => {
      openInputModal('Tạo Hub mới', 'Tên Hub (VD: Backend, iOS, UI/UX)', '', (name) => {
        if (!name.trim()) return;
        const newHub = {
          id: name.trim().toLowerCase().replace(/\s+/g, '-'),
          name: name.trim(),
          sub: 'Knowledge Hub',
          icon: '📚',
          theme: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
          title: `${name} Knowledge List`
        };
        import('../data/hubs.js').then(({ addCustomHub }) => {
          addCustomHub(newHub).then(() => {
            renderDashboard();
          });
        });
      });
    });
  });
  
  container.appendChild(btnAdd);
}

export function clearActiveHub() {
  localStorage.removeItem('active_hub_id');
  const newUrl = new URL(window.location);
  newUrl.search = ''; // Delete all search params like ?id= or ?hub=
  window.history.pushState({}, '', newUrl);
}

export function showDashboard() {
  clearActiveHub();
  $('hub-dashboard').classList.remove('hidden');
  $('sidebar').style.display = 'none';
  $('main').style.display = 'none';
  renderDashboard();
}

export function hideDashboard() {
  $('hub-dashboard').classList.add('hidden');
  $('sidebar').style.display = 'flex';
  $('main').style.display = 'flex';
}

export function selectHub(hubId) {
  setActiveHubId(hubId);
  updateAppBranding();

  // Hide dashboard
  $('hub-dashboard').classList.add('hidden');

  const config = getActiveHubConfig();
  if (config && config.type === 'task-scheduler') {
    // For task-scheduler: show main (needed for content-area), but hide sidebar + topbar
    document.body.classList.add('task-scheduler-active');
    $('main').style.display = 'flex';
    $('sidebar').style.display = 'none';
    document.querySelector('.topbar').style.display = 'none';

    import('../taskScheduler.js').then(({ TaskSchedulerController }) => {
      const tm = new TaskSchedulerController(hubId);
      tm.init();
    });
  } else {
    // Normal knowledge-hub: show everything
    document.body.classList.remove('task-scheduler-active');
    $('main').style.display = 'flex';
    $('sidebar').style.display = 'flex';
    document.querySelector('.topbar').style.display = 'flex';
    loadState();
  }
}


export function updateAppBranding() {
  const config = getActiveHubConfig();
  if (config) {
    if ($('sidebar-hub-icon')) $('sidebar-hub-icon').textContent = config.icon || '⚡';
    if ($('sidebar-hub-title')) $('sidebar-hub-title').textContent = config.name;
    if ($('sidebar-hub-sub')) $('sidebar-hub-sub').textContent = config.sub || 'Knowledge Hub';
    if ($('welcome-icon')) $('welcome-icon').textContent = config.icon || '📱';
    if ($('welcome-title')) $('welcome-title').textContent = config.title || `${config.name} Knowledge Hub`;
    document.title = config.title || `${config.name} Knowledge Hub`;
  }
}

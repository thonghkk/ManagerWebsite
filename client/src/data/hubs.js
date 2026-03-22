export const DEFAULT_HUBS = [
  {
    id: 'android',
    name: 'Android',
    sub: 'Knowledge Hub',
    icon: '🤖',
    theme: '#3ddc84',
    title: 'Android Full Knowledge List'
  },
  {
    id: 'english',
    name: 'English',
    sub: 'Knowledge Hub',
    icon: '🇬🇧',
    theme: '#00247d',
    title: 'English Learning Hub'
  }
];

// Returns current active hub based on URL query param `?hub=` or localStorage.
export function getActiveHubId() {
  const params = new URLSearchParams(window.location.search);
  const paramHub = params.get('hub');
  if (paramHub) {
    localStorage.setItem('active_hub_id', paramHub);
    return paramHub;
  }
  return localStorage.getItem('active_hub_id') || null;
}

export function setActiveHubId(hubId) {
  localStorage.setItem('active_hub_id', hubId);
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('hub', hubId);
  window.history.pushState({}, '', newUrl);
}

export function getActiveHubConfig() {
  const activeId = getActiveHubId();
  if (!activeId) return null;
  return getCustomHubs().find(h => h.id === activeId) || DEFAULT_HUBS.find(h => h.id === activeId);
}

export function getCustomHubs() {
  const raw = localStorage.getItem('custom_hubs');
  if (raw) {
    try {
      const hubs = JSON.parse(raw);
      // Ensure DEFAULT_HUBS are merged if they don't exist
      const allHubs = [...hubs];
      DEFAULT_HUBS.forEach(defaultHub => {
        if (!allHubs.some(h => h.id === defaultHub.id)) {
          allHubs.push(defaultHub);
        }
      });
      return allHubs;
    } catch (_) { }
  }
  return [...DEFAULT_HUBS];
}

export function addCustomHub(hub) {
  const hubs = getCustomHubs();
  hubs.push(hub);
  localStorage.setItem('custom_hubs', JSON.stringify(hubs));
}

export function updateCustomHub(hubId, updates) {
  const hubs = getCustomHubs();
  const index = hubs.findIndex(h => h.id === hubId);
  if (index !== -1) {
    hubs[index] = { ...hubs[index], ...updates };
    localStorage.setItem('custom_hubs', JSON.stringify(hubs));
  }
}

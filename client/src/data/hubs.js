import * as api from '../services/api.js';

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

let customHubsCache = null;

export async function loadHubsFromServer() {
  try {
    const serverHubs = await api.fetchHubs();
    customHubsCache = serverHubs;
  } catch (err) {
    console.warn("Could not load hubs from server, falling back to local defaults");
    customHubsCache = [];
  }
}

export function getCustomHubs() {
  const hubs = customHubsCache || [];
  // Ensure DEFAULT_HUBS are merged if they don't exist
  const allHubs = [...hubs];
  DEFAULT_HUBS.forEach(defaultHub => {
    if (!allHubs.some(h => h.id === defaultHub.id)) {
      allHubs.push(defaultHub);
    }
  });
  return allHubs;
}

export async function addCustomHub(hub) {
  if (!customHubsCache) customHubsCache = [];
  customHubsCache.push(hub);
  try {
    await api.saveHub(hub);
  } catch(e) {
    console.error("Failed to save hub to server", e);
  }
}

export async function updateCustomHub(hubId, updates) {
  if (!customHubsCache) customHubsCache = [];
  const index = customHubsCache.findIndex(h => h.id === hubId);
  if (index !== -1) {
    customHubsCache[index] = { ...customHubsCache[index], ...updates };
    try {
      await api.saveHub(customHubsCache[index]);
    } catch(e) {
      console.error("Failed to save hub to server", e);
    }
  } else {
    const defHub = DEFAULT_HUBS.find(h => h.id === hubId);
    if (defHub) {
      const updatedHub = { ...defHub, ...updates };
      customHubsCache.push(updatedHub);
      try {
        await api.saveHub(updatedHub);
      } catch(e) {
        console.error("Failed to save hub to server", e);
      }
    }
  }
}

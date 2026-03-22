import { $ } from '../utils/helpers.js';
import { updateCustomHub } from '../data/hubs.js';
import { openModal, closeModal } from './modals.js';
import { renderDashboard, updateAppBranding, clearActiveHub } from './dashboard.js';
import { showToast } from './toast.js';

let editingHub = null;

export function openHubModal(hub) {
  editingHub = hub;
  $('hub-name-input').value = hub.name || '';
  $('hub-icon-input').value = hub.icon || '📚';
  
  openModal('modal-hub');
  setTimeout(() => $('hub-name-input').focus(), 50);
}

export function handleSaveHub() {
  if (!editingHub) return;
  const name = $('hub-name-input').value.trim();
  const icon = $('hub-icon-input').value.trim() || '📚';
  
  if (!name) {
    showToast('Tên Hub không được để trống!', 'error');
    return;
  }
  
  updateCustomHub(editingHub.id, { name, icon, title: `${name} Knowledge List` });
  
  showToast('Đã lưu thay đổi Hub!', 'success');
  closeModal('modal-hub');
  
  // Re-render dashboard since it might be updated
  renderDashboard();
  
  // Also update active branding if changing the active one
  const activeParamId = new URLSearchParams(window.location.search).get('hub') || localStorage.getItem('active_hub_id');
  if (editingHub.id === activeParamId) {
    updateAppBranding();
  }
}

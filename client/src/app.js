import { $ } from './utils/helpers.js';
import { getState, loadState, getActiveCatId } from './state/store.js';
import { eventBus } from './events/eventBus.js';
import { renderSidebar } from './ui/sidebar.js';
import { renderMain } from './ui/checklist.js';
import { MODAL_IDS } from './constants/config.js';
import {
  openCategoryModal,
  handleSaveCategory,
  openItemModal,
  handleSaveItem,
  closeModal,
  handleConfirmDelete,
  handleEditNote,
  saveInputModal,
  openInputModal,
  renderTips,
  currentDetailItem
} from './ui/modals.js';
import { showToast } from './ui/toast.js';
import { ITEM_DETAILS } from './data/itemDetails.js';
import { saveAnswer, deleteTip, addCustomTip } from './state/store.js';

function wireUpEvents() {
  $('btn-add-category').addEventListener('click', () => openCategoryModal(null));

  $('btn-add-item').addEventListener('click', () => {
    const activeCatId = getActiveCatId();
    if (activeCatId) openItemModal(activeCatId, null);
  });

  const sidebar = $('sidebar');
  // Auto-collapse sidebar on mobile startup
  if (window.innerWidth <= 640) {
    sidebar.classList.add('collapsed');
  }

  $('hamburger').addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  $('sidebar-close-btn').addEventListener('click', () => {
    sidebar.classList.add('collapsed');
  });

  ['modal-item', 'modal-category', 'modal-note', 'modal-confirm', 'modal-detail', 'modal-input'].forEach(id => {
    // Close button (X)
    const closeBtn = $(id).querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(id));
    
    // Cancel button (Hủy)
    const cancelBtn = $(id).querySelector('.btn-secondary');
    // Only bind if it's explicitly a cancel button and not 'edit' or other secondary actions in some modals
    if (cancelBtn && cancelBtn.textContent.includes('Hủy')) {
      cancelBtn.addEventListener('click', () => closeModal(id));
    }
  });

  // Specific cancel for confirm modal which always implies closing
  $('modal-confirm-cancel').addEventListener('click', () => closeModal('modal-confirm'));

  window.addEventListener('click', (e) => {
    MODAL_IDS.forEach(id => {
      if (e.target === $(id)) closeModal(id);
    });
  });

  $('modal-item-save').addEventListener('click', handleSaveItem);
  $('modal-category-save').addEventListener('click', handleSaveCategory);
  $('modal-confirm-ok').addEventListener('click', handleConfirmDelete);
  $('modal-note-edit').addEventListener('click', handleEditNote);
  $('modal-input-save').addEventListener('click', saveInputModal);

  // Detail Modal Events
  $('btn-add-tip').addEventListener('click', () => {
    const { catId, itemId } = currentDetailItem || {};
    if (!catId || !itemId) return;

    openInputModal('Thêm Câu hỏi', 'Câu hỏi phỏng vấn', '', (question) => {
      addCustomTip(catId, itemId, question);
    });
  });

  $('detail-tips').addEventListener('click', (e) => {
    const el = e.target.closest('.tip-btn');
    if (!el) return;

    const action = el.dataset.action;
    const { catId, itemId } = currentDetailItem || {};
    if (!catId || !itemId) return;

    if (action === 'edit-answer') {
      const tipId = el.dataset.id;
      const cat = getState().categories.find(c => c.id === catId);
      const item = cat.items.find(i => i.id === itemId);

      const currentAnswer = (item.answers && item.answers[tipId]) ? item.answers[tipId] : '';
      openInputModal('Trả lời Tips', 'Câu trả lời của bạn', currentAnswer, (answerText) => {
        saveAnswer(catId, itemId, tipId, answerText);
      });
    } else if (action === 'delete-tip') {
      const idx = el.dataset.idx;
      // openConfirmDelete('tip', catId, itemId, idx);
      // Let's implement this quickly by importing openConfirmDelete or doing it directly
      // Since openConfirmDelete does exactly this:
      import('./ui/modals.js').then(({ openConfirmDelete }) => {
        openConfirmDelete('tip', catId, itemId, idx);
      });
    }
  });

  // Hotkeys
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') MODAL_IDS.forEach(closeModal);
  });

  // Handle sidebar closing on pick (mobile)
  $('sidebar-nav').addEventListener('click', (e) => {
    if (window.innerWidth <= 640 && e.target.closest('.nav-item')) {
      sidebar.classList.add('collapsed');
    }
  });
}

function wireUpSubscribers() {
  eventBus.on('stateLoaded', () => {
    renderSidebar();
    renderMain();
  });

  eventBus.on('categoriesChanged', () => {
    renderSidebar();
    renderMain();
  });

  eventBus.on('categoryActivated', () => {
    renderSidebar();
    renderMain();
  });

  eventBus.on('itemToggled', () => {
    renderSidebar();
    // In a sophisticated app, we only re-render the toggled item.
    // For simplicity, re-render main
    renderMain();
  });

  eventBus.on('customTipChanged', ({ catId, itemId }) => {
    // re-render tips if currently viewing
    if (currentDetailItem && currentDetailItem.catId === catId && currentDetailItem.itemId === itemId) {
      const cat = getState().categories.find(c => c.id === catId);
      const item = cat.items.find(i => i.id === itemId);
      const detail = ITEM_DETAILS[item.id] || {};
      renderTips(item, detail.interviewTips || []);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  wireUpSubscribers();
  wireUpEvents();
  loadState();
});

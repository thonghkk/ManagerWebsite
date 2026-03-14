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
    if (!activeCatId) return;
    openItemModal(activeCatId, null);
  });

  ['modal-item', 'modal-category', 'modal-note', 'modal-confirm', 'modal-detail', 'modal-input'].forEach(id => {
    const closeBtn = $(id).querySelector('.close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(id));
  });

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

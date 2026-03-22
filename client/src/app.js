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
  renderTips
} from './ui/modals.js';
import { showToast } from './ui/toast.js';
import { ITEM_DETAILS } from './data/itemDetails.js';
import { saveAnswer, deleteTip, addCustomTip } from './state/store.js';
import { openDetailSPA, closeDetailSPA, currentDetailItem } from './detail.js';

function wireUpEvents() {
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.view === 'detail') {
      openDetailSPA(e.state.catId, e.state.itemId);
    } else {
      closeDetailSPA();
    }
  });

  $('btn-add-category').addEventListener('click', () => openCategoryModal(null));

  $('btn-add-item').addEventListener('click', () => {
    const activeCatId = getActiveCatId();
    if (activeCatId) openItemModal(activeCatId, null);
  });

  const sidebar = $('sidebar');
  if (window.innerWidth <= 640) {
    sidebar.classList.add('collapsed');
  }

  $('hamburger').addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  $('sidebar-close-btn').addEventListener('click', () => {
    sidebar.classList.add('collapsed');
  });

  MODAL_IDS.forEach(id => {
    const modalEl = $(id);
    if (!modalEl) return;
    const closeBtn = modalEl.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(id));
    
    const cancelBtn = $(id).querySelector('.btn-secondary');
    if (cancelBtn && cancelBtn.textContent.includes('Hủy')) {
      cancelBtn.addEventListener('click', () => closeModal(id));
    }
  });

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

  // Detail SPA Events Handler (Delegated inside detail-content)
  $('detail-content').addEventListener('click', (e) => {
    const { catId, itemId } = currentDetailItem || {};
    if (!catId || !itemId) return;

    if (e.target.id === 'btn-add-tip-detail' || e.target.id === 'btn-add-tip') {
      openInputModal('Thêm Câu hỏi', 'Câu hỏi phỏng vấn', '', (question) => {
        addCustomTip(catId, itemId, question);
      });
      return;
    }

    const tipBtn = e.target.closest('.tip-btn');
    if (tipBtn) {
      const action = tipBtn.dataset.action;
      if (action === 'edit-answer') {
        const tipId = tipBtn.dataset.id;
        const cat = getState().categories.find(c => c.id === catId);
        const item = cat.items.find(i => i.id === itemId);

        const currentAnswer = (item.answers && item.answers[tipId]) ? item.answers[tipId] : '';
        openInputModal('Trả lời Tips', 'Câu trả lời của bạn', currentAnswer, (answerText) => {
          saveAnswer(catId, itemId, tipId, answerText);
        });
      } else if (action === 'delete-tip') {
        const idx = tipBtn.dataset.idx;
        import('./ui/modals.js').then(({ openConfirmDelete }) => {
          openConfirmDelete('tip', catId, itemId, idx);
        });
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') MODAL_IDS.forEach(closeModal);
  });

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
    renderMain();
  });
}

function init() {
  wireUpSubscribers();
  wireUpEvents();
  loadState();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

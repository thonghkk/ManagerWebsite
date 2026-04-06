import { $ } from './utils/helpers.js';
import { getState, loadState, getActiveCatId } from './state/store.js';
import { getActiveHubId, loadHubsFromServer, getActiveHubConfig } from './data/hubs.js';
import { showDashboard, hideDashboard, updateAppBranding } from './ui/dashboard.js';
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

  const btnBackHome = $('btn-back-home');
  if (btnBackHome) {
    btnBackHome.addEventListener('click', () => {
      closeDetailSPA();
      showDashboard();
    });
  }

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
  $('modal-hub-save').addEventListener('click', () => {
    import('./ui/hubModal.js').then(({ handleSaveHub }) => handleSaveHub());
  });

  // Detail SPA Events Handler (Delegated inside detail-page-container to cover hero)
  $('detail-page-container').addEventListener('click', (e) => {
    const { catId, itemId } = currentDetailItem || {};
    if (!catId || !itemId) return;

    // Handle generic edits
    const actionBtn = e.target.closest('.action-btn');
    if (actionBtn) {
      const action = actionBtn.dataset.action;
      
      import('./detail.js').then(({ latestDetailData, updateDetailData }) => {
        if (action === 'edit-summary') {
          const currentSummary = latestDetailData?.summary || '';
          import('./ui/modals.js').then(({ openInputModal }) => {
            openInputModal('Sửa Mô tả (Summary)', 'Description', currentSummary, (newSummary) => {
              updateDetailData(itemId, { summary: newSummary });
            });
          });
          return;
        }
        
        if (action === 'add-point') {
          import('./ui/modals.js').then(({ openInputModal }) => {
            openInputModal('Thêm Điểm quan trọng', 'Nhập điểm mới', '', (val) => {
              const points = [...(latestDetailData?.points || []), val.trim()].filter(Boolean);
              updateDetailData(itemId, { points });
            });
          });
          return;
        }

        if (action === 'edit-point') {
          const idx = parseInt(actionBtn.dataset.idx, 10);
          const currentPoints = latestDetailData?.points || [];
          import('./ui/modals.js').then(({ openInputModal }) => {
            openInputModal('Sửa Điểm quan trọng', 'Nội dung', currentPoints[idx] || '', (val) => {
              if (val.trim()) {
                const points = [...currentPoints];
                points[idx] = val.trim();
                updateDetailData(itemId, { points });
              }
            });
          });
          return;
        }

        if (action === 'delete-point') {
          if (confirm("Chắc chắn xoá điểm quan trọng này?")) {
             const idx = parseInt(actionBtn.dataset.idx, 10);
             const points = [...(latestDetailData?.points || [])];
             points.splice(idx, 1);
             updateDetailData(itemId, { points });
          }
          return;
        }

        if (action === 'edit-code') {
          const codeStr = latestDetailData?.code || '';
          import('./ui/modals.js').then(({ openInputModal }) => {
            openInputModal('Sửa Code Sample', 'Nhập mã nguồn', codeStr, (val) => {
              updateDetailData(itemId, { code: val });
            });
          });
          return;
        }

        if (action === 'edit-tips') {
          const tipsStr = (latestDetailData?.interviewTips || []).join('\n\n');
          import('./ui/modals.js').then(({ openInputModal }) => {
            openInputModal('Sửa Interview Tips (Mặc định)', 'Dạng: [Level] Câu hỏi -> Đáp án. Các câu cách nhau một dòng trống.', tipsStr, (val) => {
              const interviewTips = val.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
              updateDetailData(itemId, { interviewTips });
            });
          });
          return;
        }
      });
    }

    if (e.target.id === 'btn-add-tip-detail' || e.target.id === 'btn-add-tip') {
      import('./ui/modals.js').then(({ openInputModal }) => {
        openInputModal('Thêm Câu hỏi', 'Câu hỏi phỏng vấn', '', (question) => {
          import('./state/store.js').then(({ addCustomTip }) => addCustomTip(catId, itemId, question));
        });
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
        import('./ui/modals.js').then(({ openInputModal }) => {
          openInputModal('Trả lời Tips', 'Câu trả lời của bạn', currentAnswer, (answerText) => {
            import('./state/store.js').then(({ saveAnswer }) => saveAnswer(catId, itemId, tipId, answerText));
          });
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
    
    const detailContainer = document.getElementById('detail-page-container');
    if (detailContainer && detailContainer.style.display !== 'none') {
      closeDetailSPA();
      if (history.state && history.state.view === 'detail') {
        history.replaceState({ view: 'home' }, '', window.location.pathname);
      }
    }
  });

  eventBus.on('itemToggled', () => {
    renderSidebar();
    renderMain();
  });
}

async function init() {
  wireUpSubscribers();
  wireUpEvents();
  
  await loadHubsFromServer();

  // Always show Dashboard on page load — user must click to enter a hub
  showDashboard();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

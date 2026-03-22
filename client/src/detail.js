import { ITEM_DETAILS } from './data/itemDetails.js';
import { getState } from './state/store.js';
import { eventBus } from './events/eventBus.js';

export let currentDetailItem = null;

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function $(id) { return document.getElementById(id); }

function bindCopyBtn(btn, code) {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1800);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1800);
    });
  });
}

function getCategoryLabel(id) {
  if (!id) return { label: 'Knowledge', icon: '📖' };
  if (id.startsWith('k'))  return { label: 'Kotlin', icon: '🟣' };
  if (id.startsWith('f'))  return { label: 'Android Fundamentals', icon: '📱' };
  if (id.startsWith('uc')) return { label: 'UI Compose', icon: '🎨' };
  if (id.startsWith('ux')) return { label: 'UI XML', icon: '🖼️' };
  if (id.startsWith('a'))  return { label: 'Architecture', icon: '🏗️' };
  if (id.startsWith('j'))  return { label: 'Jetpack', icon: '🚀' };
  if (id.startsWith('c'))  return { label: 'Concurrency', icon: '⚡' };
  if (id.startsWith('n'))  return { label: 'Networking', icon: '🌐' };
  if (id.startsWith('s'))  return { label: 'Storage', icon: '💾' };
  if (id.startsWith('p'))  return { label: 'Performance', icon: '📊' };
  if (id.startsWith('t'))  return { label: 'Testing', icon: '🧪' };
  if (id.startsWith('b'))  return { label: 'Build & Release', icon: '🔨' };
  if (id.startsWith('ad')) return { label: 'Advanced', icon: '🎯' };
  if (id.startsWith('dp')) return { label: 'Design Patterns', icon: '🧩' };
  return { label: 'Knowledge', icon: '📖' };
}

export function renderDetail(id, detail) {
  const { label, icon } = getCategoryLabel(id);

  document.title = `${detail.title} – Android Knowledge`;

  const breadcrumb = $('detail-breadcrumb');
  if (breadcrumb) breadcrumb.textContent = `${icon} ${label} › ${detail.title}`;

  const badgeRow = $('detail-badge-row');
  if (badgeRow) {
    badgeRow.innerHTML = `
      <span class="detail-tag">${icon} ${escHtml(label)}</span>
      <span class="detail-id-badge">#${escHtml(id)}</span>
    `;
  }

  const titleEl = $('detail-title');
  if (titleEl) titleEl.textContent = detail.title || id;

  const summaryEl = $('detail-summary-hero');
  if (summaryEl) summaryEl.textContent = detail.summary || '';

  const content = $('detail-content');
  if (!content) return;

  let html = '';

  if (detail.points && detail.points.length > 0) {
    html += `
      <div class="detail-card" id="section-points">
        <div class="section-header">
          <span class="section-icon">⚡</span>
          <span class="section-title">Điểm quan trọng</span>
          <span class="section-count">${detail.points.length} mục</span>
        </div>
        <ul class="points-list">
          ${detail.points.map(p => `
            <li>
              <span class="point-bullet"></span>
              <span>${escHtml(p)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="detail-divider"></div>
    `;
  }

  if (detail.code) {
    html += `
      <div class="detail-card" id="section-code">
        <div class="section-header">
          <span class="section-icon">💻</span>
          <span class="section-title">Code Sample</span>
        </div>
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-lang-badge">Kotlin</span>
            <button class="btn-copy" id="btn-copy-code">Copy</button>
          </div>
          <pre class="detail-code"><code id="code-content">${escHtml(detail.code)}</code></pre>
        </div>
      </div>
      <div class="detail-divider"></div>
    `;
  }

  let itemState = null;
  if (currentDetailItem) {
    const cat = getState().categories.find(c => c.id === currentDetailItem.catId);
    if (cat) itemState = cat.items.find(i => i.id === currentDetailItem.itemId);
  }
  const customQuestions = itemState?.customQuestions || [];
  const answers = itemState?.answers || {};

  if ((detail.interviewTips && detail.interviewTips.length > 0) || customQuestions.length > 0) {
    const rawTips = detail.interviewTips || [];
    const parsedTips = rawTips.map((tip, i) => {
      const levelMatch = tip.match(/^\[([^\]]+)\]\s*/);
      const level  = levelMatch ? levelMatch[1] : null;
      const rest   = levelMatch ? tip.slice(levelMatch[0].length) : tip;

      const arrowIdx = rest.indexOf('→');
      const question = arrowIdx >= 0 ? rest.slice(0, arrowIdx).trim() : rest.trim();
      const defaultAnswer = arrowIdx >= 0 ? rest.slice(arrowIdx + 1).trim() : '';

      return { 
        level, 
        question, 
        answer: answers[tip] || defaultAnswer, // user answer overrides default
        idx: i, 
        idId: tip,
        isCustom: false 
      };
    });

    customQuestions.forEach((cq, i) => {
      parsedTips.push({
        level: 'Custom',
        question: cq,
        answer: answers[String(i)] || '',
        idx: rawTips.length + i,
        idId: String(i),
        isCustom: true
      });
    });

    const levelColors = {
      'Junior':      'level-junior',
      'Mid':         'level-mid',
      'Mid-Senior':  'level-mid-senior',
      'Senior':      'level-senior',
    };

    html += `
      <div class="detail-card" id="section-tips">
        <div class="section-header">
          <span class="section-icon">🎯</span>
          <span class="section-title">Interview Tips</span>
          <span class="section-count">${parsedTips.length} câu hỏi</span>
        </div>
        <p class="tips-hint">💡 Nhấn vào câu hỏi để xem gợi ý trả lời</p>
        <ul class="tips-accordion-list" id="tips-accordion-list">
          ${parsedTips.map(({ level, question, answer, idx, idId, isCustom }) => `
            <li class="tip-accordion-item" data-idx="${idx}">
              <div style="display: flex; gap: 8px;">
                <button class="tip-accordion-trigger" aria-expanded="false" aria-controls="tip-answer-${idx}" style="flex: 1;">
                  <span class="tip-q-left">
                    ${level ? `<span class="tip-level-badge ${levelColors[level] || 'level-mid'}">${escHtml(level)}</span>` : `<span class="tip-num">Q${idx + 1}</span>`}
                    <span class="tip-question-text">${escHtml(question)}</span>
                  </span>
                  <span class="tip-chevron">›</span>
                </button>
                <button class="action-btn edit tip-btn" data-action="edit-answer" data-id="${escHtml(idId)}" title="Trả lời / Sửa">✏️</button>
                ${isCustom ? `<button class="action-btn del tip-btn" data-action="delete-tip" data-idx="${idId}" title="Xoá câu hỏi">🗑️</button>` : ''}
              </div>
              ${answer ? `
                <div class="tip-accordion-panel" id="tip-answer-${idx}" hidden>
                  <div class="tip-answer-content">
                    <span class="tip-answer-icon">💡</span>
                    <span>${escHtml(answer)}</span>
                  </div>
                </div>
              ` : ''}
            </li>
          `).join('')}
        </ul>
        <button class="btn-secondary btn-sm" id="btn-add-tip-detail" style="margin-top: 12px; font-size: 12px;">+ Thêm câu hỏi interview</button>
      </div>
    `;
  }

  content.innerHTML = html;

  const copyBtn = $('btn-copy-code');
  if (copyBtn && detail.code) {
    bindCopyBtn(copyBtn, detail.code);
  }

  content.querySelectorAll('.tip-accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      trigger.setAttribute('aria-expanded', !isOpen);
      trigger.classList.toggle('is-open', !isOpen);
      if (panel) panel.hidden = isOpen;
    });
  });
}

function renderNotFound(id) {
  document.title = 'Không tìm thấy – Android Knowledge';

  const content = $('detail-content');
  if (!content) return;

  const hero = $('detail-hero');
  if (hero) hero.style.display = 'none';

  content.innerHTML = `
    <div class="not-found">
      <div class="not-found-icon">🔍</div>
      <h2>Không tìm thấy tài liệu</h2>
      <p>Không có nội dung nào ứng với ID <strong>"${escHtml(id || '(trống)')}"</strong>.</p>
      <button class="btn-home" id="btn-back-not-found">← Quay lại danh sách</button>
    </div>
  `;
  $('btn-back-not-found').addEventListener('click', closeDetailSPA);
}

export let latestDetailData = null;
let savedScrollY = 0;

export async function openDetailSPA(catId, itemId) {
  currentDetailItem = { catId, itemId };
  const contentArea = $('content-area');
  const topbar = document.querySelector('.topbar');
  const detailContainer = $('detail-page-container');
  const sidebar = $('sidebar');
  
  if (detailContainer && detailContainer.style.display !== 'block') {
    if (contentArea) savedScrollY = contentArea.scrollTop;
  }

  if (contentArea) contentArea.style.display = 'none';
  if (topbar) topbar.style.display = 'none';
  if (sidebar && window.innerWidth <= 640) {
    sidebar.classList.add('collapsed');
  }

  if (detailContainer) {
    detailContainer.style.display = 'block';
    detailContainer.scrollTop = 0;
  }

  const hero = $('detail-hero');
  if (hero) hero.style.display = '';

  const id = itemId;
  if (!id || !ITEM_DETAILS[id]) {
    renderNotFound(id);
    return;
  }

  const content = $('detail-content');
  if (content) {
    content.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--text-muted);">Đang tải nội dung chi tiết...</div>`;
  }

  try {
    const res = await fetch(`./src/data/details/${id}.json`);
    if (!res.ok) throw new Error("JSON not found");
    const fullDetail = await res.json();
    latestDetailData = fullDetail;
    renderDetail(id, fullDetail);
  } catch (err) {
    console.warn("Failed to load details json, falling back to summary", err);
    latestDetailData = ITEM_DETAILS[id];
    renderDetail(id, ITEM_DETAILS[id]); 
  }
}

export function closeDetailSPA() {
  const contentArea = $('content-area');
  const topbar = document.querySelector('.topbar');
  const detailContainer = $('detail-page-container');

  if (detailContainer) detailContainer.style.display = 'none';
  if (contentArea) contentArea.style.display = '';
  if (topbar) topbar.style.display = '';

  document.title = 'Android Full Knowledge List';
  if (contentArea) contentArea.scrollTop = savedScrollY;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnBack = $('btn-back-spa');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
             // Go back using history if it's SPA
             if (history.state && history.state.view === 'detail') {
                 history.back();
             } else {
                 closeDetailSPA();
             }
        });
    }
});

eventBus.on('customTipChanged', ({ catId, itemId }) => {
  if (currentDetailItem && currentDetailItem.catId === catId && currentDetailItem.itemId === itemId) {
    if (latestDetailData) {
      renderDetail(itemId, latestDetailData);
    }
  }
});

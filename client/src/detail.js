import { ITEM_DETAILS } from './data/itemDetails.js';

// ── Helpers ─────────────────────────────────────────────────
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function $(id) { return document.getElementById(id); }

// ── Scroll progress bar ─────────────────────────────────────
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ── Copy to clipboard ───────────────────────────────────────
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
      // fallback
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

// ── Category label mapping ──────────────────────────────────
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

// ── Render detail page ──────────────────────────────────────
function renderDetail(id, detail) {
  const { label, icon } = getCategoryLabel(id);

  // Update page title
  document.title = `${detail.title} – Android Knowledge`;

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', detail.summary || '');

  // ── Breadcrumb
  const breadcrumb = $('detail-breadcrumb');
  if (breadcrumb) breadcrumb.textContent = `${icon} ${label} › ${detail.title}`;

  // ── Badge row
  const badgeRow = $('detail-badge-row');
  if (badgeRow) {
    badgeRow.innerHTML = `
      <span class="detail-tag">${icon} ${escHtml(label)}</span>
      <span class="detail-id-badge">#${escHtml(id)}</span>
    `;
  }

  // ── Title
  const titleEl = $('detail-title');
  if (titleEl) titleEl.textContent = detail.title || id;

  // ── Summary hero
  const summaryEl = $('detail-summary-hero');
  if (summaryEl) summaryEl.textContent = detail.summary || '';

  const content = $('detail-content');
  if (!content) return;

  let html = '';

  // ── Key Points section — FULL, không cắt ngắn
  if (detail.points && detail.points.length > 0) {
    // Group points by comment-style prefix (// Tầng X ...) nếu có
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

  // ── Code Sample section — đầy đủ
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

  // ── Interview Tips — Accordion: click câu hỏi → hiện đáp án
  if (detail.interviewTips && detail.interviewTips.length > 0) {
    // Parse format: "[Level] Question → Answer hint"
    // hoặc plain text nếu không có dấu →
    const parsedTips = detail.interviewTips.map((tip, i) => {
      // Tách level label nếu có dạng [Junior], [Mid], [Senior]...
      const levelMatch = tip.match(/^\[([^\]]+)\]\s*/);
      const level  = levelMatch ? levelMatch[1] : null;
      const rest   = levelMatch ? tip.slice(levelMatch[0].length) : tip;

      // Tách question và answer hint bởi dấu →
      const arrowIdx = rest.indexOf('→');
      const question = arrowIdx >= 0 ? rest.slice(0, arrowIdx).trim() : rest.trim();
      const answer   = arrowIdx >= 0 ? rest.slice(arrowIdx + 1).trim() : '';

      return { level, question, answer, idx: i };
    });

    // Nhóm theo level nếu có
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
        <ul class="tips-accordion-list">
          ${parsedTips.map(({ level, question, answer, idx }) => `
            <li class="tip-accordion-item" data-idx="${idx}">
              <button class="tip-accordion-trigger" aria-expanded="false" aria-controls="tip-answer-${idx}">
                <span class="tip-q-left">
                  ${level ? `<span class="tip-level-badge ${levelColors[level] || 'level-mid'}">${escHtml(level)}</span>` : `<span class="tip-num">Q${idx + 1}</span>`}
                  <span class="tip-question-text">${escHtml(question)}</span>
                </span>
                <span class="tip-chevron">›</span>
              </button>
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
      </div>
    `;
  }

  content.innerHTML = html;

  // ── Bind copy button
  const copyBtn = $('btn-copy-code');
  if (copyBtn && detail.code) {
    bindCopyBtn(copyBtn, detail.code);
  }

  // ── Bind accordion: click câu hỏi → toggle panel
  content.querySelectorAll('.tip-accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);

      // Toggle trạng thái hiện tại
      trigger.setAttribute('aria-expanded', !isOpen);
      trigger.classList.toggle('is-open', !isOpen);
      if (panel) panel.hidden = isOpen;
    });
  });
}


// ── Render Not Found ────────────────────────────────────────
function renderNotFound(id) {
  document.title = 'Không tìm thấy – Android Knowledge';

  const content = $('detail-content');
  if (!content) return;

  // Hide hero
  const hero = $('detail-hero');
  if (hero) hero.style.display = 'none';

  content.innerHTML = `
    <div class="not-found">
      <div class="not-found-icon">🔍</div>
      <h2>Không tìm thấy tài liệu</h2>
      <p>Không có nội dung nào ứng với ID <strong>"${escHtml(id || '(trống)')}"</strong>.</p>
      <a href="index.html" class="btn-home">← Quay lại trang chủ</a>
    </div>
  `;
}

// ── Main ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initScrollProgress();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '';

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
    renderDetail(id, fullDetail);
  } catch (err) {
    console.warn("Failed to load details json, falling back to summary", err);
    renderDetail(id, ITEM_DETAILS[id]); 
  }
});

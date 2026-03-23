/**
 * englishDetail.js
 * Render detail page dành riêng cho English Grammar Hub
 * Sections: Formula | Theory Notes | Examples | My Notes | Practice
 */

import { saveDetail, fetchDetail } from './services/api.js';
import { showToast } from './ui/toast.js';
import { getState } from './state/store.js';

// ─── State ────────────────────────────────────────────────────────────────────
export let engLatestData   = null;
export let engCurrentItem  = null; // { catId, itemId }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function escHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function $(id) { return document.getElementById(id); }

// ─── Render ───────────────────────────────────────────────────────────────────
export function renderEnglishDetail(id, data) {
  document.title = `${data.title || id} – English Hub`;

  // Breadcrumb & title
  const bc = $('detail-breadcrumb');
  if (bc) bc.textContent = `🇬🇧 English › Grammar › ${data.title || id}`;

  const badgeRow = $('detail-badge-row');
  if (badgeRow) {
    badgeRow.innerHTML = `
      <span class="eng-tag">🇬🇧 English Grammar</span>
      <span class="eng-id-badge">#${escHtml(id)}</span>
    `;
  }

  const titleEl = $('detail-title');
  if (titleEl) titleEl.textContent = data.title || id;

  const summaryEl = $('detail-summary-hero');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <span id="eng-summary-text">${escHtml(data.summary || 'Nhấn ✏️ để thêm mô tả ngắn về chủ đề này...')}</span>
      <button class="eng-action-btn" data-eng-action="edit-summary" title="Sửa mô tả">✏️</button>
    `;
  }

  const content = $('detail-content');
  if (!content) return;

  // ── Build all sections ──────────────────────────────────────────────────────
  const formula     = data.formula    || '';
  const rules       = data.rules      || [];
  const examples    = data.examples   || [];
  const myNotes     = data.myNotes    || '';
  const practice    = data.practice   || [];

  content.innerHTML = `
    <!-- ① FORMULA / STRUCTURE -->
    <div class="eng-card eng-formula-card" id="eng-section-formula">
      <div class="eng-card-header">
        <span class="eng-section-icon">📐</span>
        <span class="eng-section-title">Công thức / Cấu trúc</span>
        <button class="eng-action-btn" data-eng-action="edit-formula" title="Sửa công thức">✏️</button>
      </div>
      <div class="eng-formula-box" id="eng-formula-display">
        ${formula
          ? formula.split('\n').map(line =>
              `<div class="eng-formula-line">${escHtml(line)}</div>`
            ).join('')
          : `<p class="eng-empty-hint">Nhấn ✏️ để nhập công thức (vd: S + V + O...)</p>`
        }
      </div>
    </div>

    <!-- ② RULES / THEORY NOTES -->
    <div class="eng-card" id="eng-section-rules">
      <div class="eng-card-header">
        <span class="eng-section-icon">📖</span>
        <span class="eng-section-title">Lý thuyết & Quy tắc</span>
        <span class="eng-count-badge">${rules.length}</span>
        <button class="eng-action-btn" data-eng-action="add-rule" title="Thêm quy tắc">➕</button>
      </div>
      <ul class="eng-rules-list" id="eng-rules-list">
        ${rules.length > 0
          ? rules.map((r, i) => `
            <li class="eng-rule-item" draggable="true" data-rule-idx="${i}">
              <span class="eng-rule-bullet">📌</span>
              <span class="eng-rule-text" id="eng-rule-text-${i}">${escHtml(r)}</span>
              <div class="eng-item-actions">
                <button class="eng-action-btn sm" data-eng-action="edit-rule" data-idx="${i}" title="Sửa">✏️</button>
                <button class="eng-action-btn sm danger" data-eng-action="delete-rule" data-idx="${i}" title="Xoá">🗑️</button>
              </div>
            </li>
          `).join('')
          : `<li class="eng-empty-hint" style="list-style:none;padding:16px 0;text-align:center;">Chưa có quy tắc nào. Nhấn ➕ để thêm.</li>`
        }
      </ul>
    </div>

    <!-- ③ EXAMPLES -->
    <div class="eng-card" id="eng-section-examples">
      <div class="eng-card-header">
        <span class="eng-section-icon">✨</span>
        <span class="eng-section-title">Ví dụ (Examples)</span>
        <span class="eng-count-badge">${examples.length}</span>
        <button class="eng-action-btn" data-eng-action="add-example" title="Thêm ví dụ">➕</button>
      </div>
      <div class="eng-examples-list" id="eng-examples-list">
        ${examples.length > 0
          ? examples.map((ex, i) => renderExampleCard(ex, i)).join('')
          : `<div class="eng-empty-hint" style="text-align:center;padding:20px 0;">Chưa có ví dụ nào. Nhấn ➕ để thêm ví dụ mới.</div>`
        }
      </div>
    </div>

    <!-- ④ MY NOTES (Personal) -->
    <div class="eng-card eng-notes-card" id="eng-section-notes">
      <div class="eng-card-header">
        <span class="eng-section-icon">📝</span>
        <span class="eng-section-title">Ghi chú cá nhân (My Notes)</span>
        <button class="eng-action-btn" data-eng-action="edit-notes" title="Sửa ghi chú">✏️</button>
      </div>
      <div class="eng-notes-display" id="eng-notes-display">
        ${myNotes
          ? `<pre class="eng-notes-pre">${escHtml(myNotes)}</pre>`
          : `<div class="eng-empty-hint eng-notes-placeholder">
               <span class="eng-notes-placeholder-icon">🖊️</span>
               <span>Ghi chú của bạn sẽ xuất hiện ở đây...<br>Nhấn ✏️ để bắt đầu ghi chép kiến thức, mẹo nhớ, hoặc bất cứ điều gì bổ ích!</span>
             </div>`
        }
      </div>
    </div>

    <!-- ⑤ PRACTICE / EXERCISES -->
    <div class="eng-card" id="eng-section-practice">
      <div class="eng-card-header">
        <span class="eng-section-icon">🎯</span>
        <span class="eng-section-title">Bài luyện tập (Practice)</span>
        <span class="eng-count-badge">${practice.length}</span>
        <button class="eng-action-btn" data-eng-action="add-practice" title="Thêm bài tập">➕</button>
      </div>
      <div class="eng-practice-list" id="eng-practice-list">
        ${practice.length > 0
          ? practice.map((p, i) => renderPracticeCard(p, i)).join('')
          : `<div class="eng-empty-state">
               <div class="eng-empty-icon">🏋️</div>
               <p>Chưa có bài tập nào.<br>Thêm câu hỏi để ôn luyện kiến thức!</p>
             </div>`
        }
      </div>
    </div>
  `;

  // Wire up practice toggles
  content.querySelectorAll('.eng-practice-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.eng-practice-card');
      const answer = card?.querySelector('.eng-practice-answer');
      if (!answer) return;
      const isHidden = answer.hidden;
      answer.hidden = !isHidden;
      btn.textContent = isHidden ? 'Ẩn đáp án ▲' : 'Xem đáp án ▼';
      btn.classList.toggle('revealed', isHidden);
    });
  });
}

// ─── Example Card Helper ──────────────────────────────────────────────────────
function renderExampleCard(ex, i) {
  // ex can be string (legacy) or { en, vi, note }
  const isObj = typeof ex === 'object' && ex !== null;
  const en   = isObj ? (ex.en   || '') : ex;
  const vi   = isObj ? (ex.vi   || '') : '';
  const note = isObj ? (ex.note || '') : '';

  return `
    <div class="eng-example-card" data-ex-idx="${i}">
      <div class="eng-example-inner">
        <div class="eng-example-en">
          <span class="eng-ex-label">🇬🇧 EN</span>
          <span class="eng-ex-en-text">${escHtml(en)}</span>
        </div>
        ${vi ? `
        <div class="eng-example-vi">
          <span class="eng-ex-label vi">🇻🇳 VI</span>
          <span class="eng-ex-vi-text">${escHtml(vi)}</span>
        </div>` : ''}
        ${note ? `
        <div class="eng-example-note">
          <span class="eng-ex-note-icon">💡</span>
          <span>${escHtml(note)}</span>
        </div>` : ''}
      </div>
      <div class="eng-item-actions">
        <button class="eng-action-btn sm" data-eng-action="edit-example" data-idx="${i}" title="Sửa ví dụ">✏️</button>
        <button class="eng-action-btn sm danger" data-eng-action="delete-example" data-idx="${i}" title="Xoá ví dụ">🗑️</button>
      </div>
    </div>
  `;
}

// ─── Practice Card Helper ─────────────────────────────────────────────────────
function renderPracticeCard(p, i) {
  // p can be string or { question, answer, type }
  const isObj    = typeof p === 'object' && p !== null;
  const question = isObj ? (p.question || p) : p;
  const answer   = isObj ? (p.answer   || '') : '';
  const type     = isObj ? (p.type     || 'Q&A') : 'Q&A';

  return `
    <div class="eng-practice-card" data-pr-idx="${i}">
      <div class="eng-practice-header">
        <span class="eng-practice-type-badge">${escHtml(type)}</span>
        <span class="eng-practice-q">${escHtml(question)}</span>
        <div class="eng-item-actions">
          <button class="eng-action-btn sm" data-eng-action="edit-practice" data-idx="${i}" title="Sửa">✏️</button>
          <button class="eng-action-btn sm danger" data-eng-action="delete-practice" data-idx="${i}" title="Xoá">🗑️</button>
        </div>
      </div>
      ${answer ? `
      <button class="eng-practice-toggle">Xem đáp án ▼</button>
      <div class="eng-practice-answer" hidden>
        <div class="eng-practice-answer-box">
          <span class="eng-answer-icon">✅</span>
          <span>${escHtml(answer)}</span>
        </div>
      </div>` : ''}
    </div>
  `;
}

// ─── Save Helper ──────────────────────────────────────────────────────────────
async function engSave(itemId, newFields) {
  const current = engLatestData || {};
  const updated = { ...current, ...newFields };
  try {
    await saveDetail(itemId, updated);
    engLatestData = updated;
    renderEnglishDetail(itemId, updated);
    showToast('Đã lưu! 🎉', 'success');
  } catch (e) {
    showToast('Lỗi lưu thay đổi!', 'error');
  }
}

// ─── Input Dialog Helper ──────────────────────────────────────────────────────
function engOpenInput(title, placeholder, currentVal, onSave) {
  import('./ui/modals.js').then(({ openInputModal }) => {
    openInputModal(title, placeholder, currentVal, onSave);
  });
}

// ─── Wire up detail-page-container click handler ──────────────────────────────
export function wireEnglishDetailEvents(container) {
  container.addEventListener('click', (e) => {
    if (!engCurrentItem) return;
    const { itemId } = engCurrentItem;

    const btn = e.target.closest('[data-eng-action]');
    if (!btn) return;
    const action = btn.dataset.engAction;
    const idx    = parseInt(btn.dataset.idx ?? '-1', 10);

    switch (action) {

      // ── Summary ──
      case 'edit-summary':
        engOpenInput('Sửa mô tả', 'Mô tả ngắn về chủ đề...', engLatestData?.summary || '', (val) => {
          engSave(itemId, { summary: val.trim() });
        });
        break;

      // ── Formula ──
      case 'edit-formula':
        engOpenInput(
          'Sửa Công thức / Cấu trúc',
          'Nhập công thức, mỗi dòng là một dạng khác nhau\nvd: S + V + O\nS + do/does + not + V',
          engLatestData?.formula || '',
          (val) => engSave(itemId, { formula: val })
        );
        break;

      // ── Rules ──
      case 'add-rule':
        engOpenInput('Thêm Quy tắc / Lý thuyết', 'Nhập quy tắc...', '', (val) => {
          if (!val.trim()) return;
          const rules = [...(engLatestData?.rules || []), val.trim()];
          engSave(itemId, { rules });
        });
        break;

      case 'edit-rule':
        if (idx < 0) break;
        engOpenInput('Sửa Quy tắc', 'Nội dung quy tắc...', (engLatestData?.rules || [])[idx] || '', (val) => {
          if (!val.trim()) return;
          const rules = [...(engLatestData?.rules || [])];
          rules[idx] = val.trim();
          engSave(itemId, { rules });
        });
        break;

      case 'delete-rule':
        if (idx >= 0 && confirm('Xoá quy tắc này?')) {
          const rules = [...(engLatestData?.rules || [])];
          rules.splice(idx, 1);
          engSave(itemId, { rules });
        }
        break;

      // ── Examples ──
      case 'add-example':
        engOpenExampleDialog(null, (ex) => {
          const examples = [...(engLatestData?.examples || []), ex];
          engSave(itemId, { examples });
        });
        break;

      case 'edit-example':
        if (idx < 0) break;
        engOpenExampleDialog((engLatestData?.examples || [])[idx], (ex) => {
          const examples = [...(engLatestData?.examples || [])];
          examples[idx] = ex;
          engSave(itemId, { examples });
        });
        break;

      case 'delete-example':
        if (idx >= 0 && confirm('Xoá ví dụ này?')) {
          const examples = [...(engLatestData?.examples || [])];
          examples.splice(idx, 1);
          engSave(itemId, { examples });
        }
        break;

      // ── My Notes ──
      case 'edit-notes':
        engOpenInput(
          'Ghi chú cá nhân',
          'Ghi chú tự do: mẹo nhớ, so sánh, kinh nghiệm của bạn...',
          engLatestData?.myNotes || '',
          (val) => engSave(itemId, { myNotes: val })
        );
        break;

      // ── Practice ──
      case 'add-practice':
        engOpenPracticeDialog(null, (p) => {
          const practice = [...(engLatestData?.practice || []), p];
          engSave(itemId, { practice });
        });
        break;

      case 'edit-practice':
        if (idx < 0) break;
        engOpenPracticeDialog((engLatestData?.practice || [])[idx], (p) => {
          const practice = [...(engLatestData?.practice || [])];
          practice[idx] = p;
          engSave(itemId, { practice });
        });
        break;

      case 'delete-practice':
        if (idx >= 0 && confirm('Xoá bài tập này?')) {
          const practice = [...(engLatestData?.practice || [])];
          practice.splice(idx, 1);
          engSave(itemId, { practice });
        }
        break;
    }
  });
}

// ─── Example Multi-field Dialog ───────────────────────────────────────────────
function engOpenExampleDialog(existingEx, onSave) {
  const isObj  = typeof existingEx === 'object' && existingEx !== null;
  const en     = isObj ? (existingEx.en   || '') : (existingEx || '');
  const vi     = isObj ? (existingEx.vi   || '') : '';
  const note   = isObj ? (existingEx.note || '') : '';

  // Use a multi-field approach via textarea with separator
  const current = [en, vi, note].join('\n---VI---\n');
  import('./ui/modals.js').then(({ openInputModal }) => {
    openInputModal(
      'Thêm / Sửa Ví dụ',
      'Dòng 1: Câu tiếng Anh\n---VI---\nDòng sau: Nghĩa tiếng Việt (tuỳ chọn)\n---VI---\nDòng cuối: Ghi chú (tuỳ chọn)',
      current,
      (val) => {
        const parts = val.split('---VI---').map(s => s.trim());
        onSave({ en: parts[0] || val.trim(), vi: parts[1] || '', note: parts[2] || '' });
      }
    );
  });
}

// ─── Practice Multi-field Dialog ──────────────────────────────────────────────
function engOpenPracticeDialog(existingPr, onSave) {
  const isObj    = typeof existingPr === 'object' && existingPr !== null;
  const question = isObj ? (existingPr.question || '') : (existingPr || '');
  const answer   = isObj ? (existingPr.answer   || '') : '';
  const type     = isObj ? (existingPr.type     || 'Q&A') : 'Q&A';

  const current = [type, question, answer].join('\n---ANS---\n');
  import('./ui/modals.js').then(({ openInputModal }) => {
    openInputModal(
      'Thêm / Sửa Bài tập',
      'Dòng 1: Loại (Q&A / Fill / Translate)\n---ANS---\nDòng 2: Câu hỏi / Bài tập\n---ANS---\nDòng 3: Đáp án (tuỳ chọn)',
      current,
      (val) => {
        const parts = val.split('---ANS---').map(s => s.trim());
        if (parts.length >= 2) {
          onSave({ type: parts[0] || 'Q&A', question: parts[1] || '', answer: parts[2] || '' });
        } else {
          onSave({ type: 'Q&A', question: val.trim(), answer: '' });
        }
      }
    );
  });
}

// ─── Open Detail (entrypoint) ──────────────────────────────────────────────────
export async function openEnglishDetailSPA(catId, itemId) {
  engCurrentItem = { catId, itemId };

  // Get item name from state
  const state = getState();
  const cat  = state?.categories?.find(c => c.id === catId);
  const item = cat?.items?.find(i => i.id === itemId);
  const itemName = item?.name || itemId;

  const content = $('detail-content');
  if (content) {
    content.innerHTML = `<div class="eng-loading">
      <div class="eng-loading-spinner"></div>
      <span>Đang tải nội dung...</span>
    </div>`;
  }

  // Update hero placeholder immediately
  const bc = $('detail-breadcrumb');
  if (bc) bc.textContent = `🇬🇧 English › Grammar › ${itemName}`;
  const titleEl = $('detail-title');
  if (titleEl) titleEl.textContent = itemName;
  const badgeRow = $('detail-badge-row');
  if (badgeRow) {
    badgeRow.innerHTML = `
      <span class="eng-tag">🇬🇧 English Grammar</span>
      <span class="eng-id-badge">#${escHtml(itemId)}</span>
    `;
  }
  const summaryEl = $('detail-summary-hero');
  if (summaryEl) summaryEl.innerHTML = '&nbsp;';

  try {
    const data = await fetchDetail(itemId);
    // Merge item name as title if not already set
    if (!data.title) data.title = itemName;
    engLatestData = data;
    renderEnglishDetail(itemId, data);
  } catch {
    // Start fresh
    engLatestData = { title: itemName, summary: '', formula: '', rules: [], examples: [], myNotes: '', practice: [] };
    renderEnglishDetail(itemId, engLatestData);
  }
}

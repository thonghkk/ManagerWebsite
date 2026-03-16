export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const $ = (id) => document.getElementById(id);

export function showLoading(text = 'Đang tải...') {
  const overlay = $('loading-overlay');
  const textEl = $('loading-text');
  if (overlay && textEl) {
    textEl.textContent = text;
    overlay.classList.add('active');
  }
}

export function hideLoading() {
  const overlay = $('loading-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

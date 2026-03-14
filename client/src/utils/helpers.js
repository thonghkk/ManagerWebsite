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


  // app.js - Theme toggle (works from an external JS file)
(function () {
  const THEME_KEY = 'theme';
  const body = document.body;

  function applySavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light') body.classList.add('light-mode');
    else body.classList.remove('light-mode');
  }

  function createToggleIfMissing() {
    // If you already have <button id="modeToggle"> in your nav, this won't create another.
    if (document.getElementById('modeToggle')) return document.getElementById('modeToggle');

    const nav = document.querySelector('nav');
    if (!nav) return null; // nothing we can do if there's no nav

    const btn = document.createElement('button');
    btn.id = 'modeToggle';
    btn.type = 'button';
    btn.className = 'mode-btn';
    // append the button at the end of the nav (next to links)
    nav.appendChild(btn);
    return btn;
  }

  function init() {
    applySavedTheme();

    // Ensure button exists (or create it)
    const btn = document.getElementById('modeToggle') || createToggleIfMissing();
    if (!btn) {
      console.warn('modeToggle button not found and no <nav> to append to.');
      return;
    }

    // set initial emoji based on theme
    btn.textContent = body.classList.contains('light-mode') ? '🌙' : '☀️';

    // add click listener
    btn.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-mode'); // toggles class
      btn.textContent = isLight ? '🌙' : '☀️';
      localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    });
  }

  // Wait for the DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();





(function () {
  const THEME_KEY = 'theme';
  const body = document.body;

  function applySavedTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light') body.classList.add('light-mode');
    else body.classList.remove('light-mode');
  }

  function createToggleIfMissing() {
    if (document.getElementById('modeToggle')) return document.getElementById('modeToggle');

    const nav = document.querySelector('nav');
    if (!nav) return null; 

    const btn = document.createElement('button');
    btn.id = 'modeToggle';
    btn.type = 'button';
    btn.className = 'mode-btn';
    
    nav.appendChild(btn);
    return btn;
  }

  function init() {
    applySavedTheme();

    
    const btn = document.getElementById('modeToggle') || createToggleIfMissing();
    if (!btn) {
      console.warn('modeToggle button not found and no <nav> to append to.');
      return;
    }

    btn.textContent = body.classList.contains('light-mode') ? '🌙' : '☀️';

    btn.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-mode'); 
      btn.textContent = isLight ? '🌙' : '☀️';
      localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
    });
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


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

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) {
    console.error("❌ Menu toggle or nav-links not found");
    return;
  }

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
});

// === Optional: Fetch GitHub Repos Automatically ===
document.addEventListener("DOMContentLoaded", async () => {
  const username = "Nolindo"; // <-- your GitHub username
  const container = document.querySelector(".projects-container");

  if (!container) return;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    container.innerHTML = ""; // clear placeholder cards

    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "No description provided."}</p>
        <a href="${repo.html_url}" target="_blank" class="project-link">View on GitHub</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching GitHub repos:", err);
    container.innerHTML = "<p>Unable to load projects at the moment.</p>";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const username = "Nolindo";
  const avatarUrl = "https://avatars.githubusercontent.com/u/230437184?v=4";
  const container = document.querySelector(".projects-container");

  if (!container) return;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    container.innerHTML = ""; // clear placeholder cards

    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      card.innerHTML = `
        <img src="${avatarUrl}" alt="profile" class="gh-avatar">
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "No description provided."}</p>
        <a href="${repo.html_url}" target="_blank" class="project-link">View on GitHub</a>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching GitHub repos:", err);
    container.innerHTML = "<p>Unable to load projects at the moment.</p>";
  }
});

function filterProjects() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase();
  const ul = document.getElementById('projectList');
  const projects = ul.getElementsByTagName('li');

  for (let i = 0; i < projects.length; i++) {
    const projectName = projects[i].innerText.toLowerCase();
    if (projectName.includes(filter)) {
      projects[i].style.display = '';
    } else {
      projects[i].style.display = 'none';
    }
  }
}
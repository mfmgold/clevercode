/* ============================================================
   CLEVER CODE — main.js
   ============================================================ */

// ── Navigation ───────────────────────────────────────────────
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav__hamburger');
const mobileNav = document.querySelector('.nav__mobile');
const navLinks = document.querySelectorAll('.nav__links a, .nav__mobile a');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveSection();
});

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.nav__mobile a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ── Active section highlight ─────────────────────────────────
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 90) current = section.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// ── Scroll fade-in observer ───────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Projects data. Inline project list, no fetch required.
// To add a new project, copy one of the objects below and edit it.
// Keep projects.json in sync if you use it for other purposes.
const ALLOWED_PROJECT_IDS = new Set([
  'warp',
  'pomodoro',
  'ask-aloud',
  'flow-forge',
  'classic-snake',
  'clipboard',
  'doc-extraction'
]);

const PROJECTS = [
  {
    "id": "warp",
    "name": "Warp",
    "tagline": "Fast, private file beaming for every device",
    "description": "A pocket-size P2P file sharing app being built to move files directly between phones, tablets and laptops. It is designed for private file transfer with no accounts, no analytics and no artificial upload size cap.",
    "category": "Software",
    "status": "In Progress",
    "github": "https://github.com/mfmgold",
    "demo": "",
    "download": "",
    "featured": true,
    "roadmap": [
      { "phase": "Phase 1", "title": "Core P2P Engine & Identity", "status": "complete" },
      { "phase": "Phase 2", "title": "UI — Contacts & File Transfer", "status": "complete" },
      { "phase": "Phase 3", "title": "Push Notifications & Queue Resume", "status": "complete" },
      { "phase": "Phase 4", "title": "Beta Release (iOS, Android, macOS, Windows)", "status": "upcoming" }
    ]
  },
  {
    "id": "pomodoro",
    "name": "Pomodoro Timer",
    "tagline": "A clean, distraction-free focus timer",
    "description": "A simple Pomodoro timer to help you focus with timed work and break intervals. No sign-up, no distractions, just you and the timer.",
    "category": "Web App",
    "icon": "⏱️",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/pomodoro/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "ask-aloud",
    "name": "Ask Aloud",
    "tagline": "Turn questions into spoken answers",
    "description": "A voice-friendly question and answer app that lets you ask naturally and hear the response aloud. A simple, accessible way to get answers without staying glued to the screen.",
    "category": "Web App",
    "icon": "🎙️",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/askaloud/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "flow-forge",
    "name": "Flow Forge",
    "tagline": "Shape ideas into clear visual flows",
    "description": "A browser-based workspace for mapping ideas, processes and connections into easy-to-follow flows. Useful for turning a rough concept into a clear visual plan.",
    "category": "Web App",
    "icon": "🔀",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/flowforge/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "classic-snake",
    "name": "Classic Snake Game",
    "tagline": "The timeless arcade game in your browser",
    "description": "A clean browser take on the classic Snake game. Guide the snake, collect food and chase a higher score in a quick, nostalgic arcade break.",
    "category": "Web App",
    "icon": "🐍",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/snake/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "clipboard",
    "name": "Clipboard Manager",
    "tagline": "Save and reuse text snippets in your browser",
    "description": "A handy browser-based clipboard tool for saving and reusing text snippets. Useful for repetitive copy and paste tasks, with no extensions needed.",
    "category": "Web App",
    "icon": "🗂️",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/clipboard/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "doc-extraction",
    "name": "AI Document Extraction",
    "tagline": "Intelligent parsing of invoices, contracts and forms",
    "description": "AI-assisted document extraction pipelines that turn invoices, contracts and forms into structured, usable data. Built using OCR, large language models and custom validation logic.",
    "category": "AI",
    "icon": "📄",
    "status": "In Progress",
    "github": "https://github.com/mfmgold",
    "demo": "",
    "download": "",
    "featured": false,
    "roadmap": []
  }
];

const visibleProjects = PROJECTS.filter(project => ALLOWED_PROJECT_IDS.has(project.id));

// ── Category icons / badges / status ────────────────────────
const CATEGORY_ICONS = {
  'Software':   '🚀',
  'AI':         '🤖',
  'RPA':        '⚙️',
  'Web App':    '🌐',
  'Automation': '🔁',
};

const STATUS_CLASSES = {
  'Live':        'status-live',
  'In Progress': 'status-progress',
  'MVP':         'status-mvp',
  'Archived':    'status-archived',
};

const BADGE_CLASSES = {
  'Software':   'badge--flutter',
  'AI':         'badge--ai',
  'RPA':        'badge--rpa',
  'Web App':    'badge--webapp',
  'Automation': 'badge--automation',
};

// ── Render filter bar ────────────────────────────────────────
function renderFilterBar() {
  const bar = document.getElementById('filter-bar');
  if (!bar) return;

  const categories = ['All', ...new Set(visibleProjects.map(p => p.category))];
  bar.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-cat="${cat}">
      ${cat}
    </button>
  `).join('');

  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.cat);
    });
  });
}

// ── Render project cards ─────────────────────────────────────
function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filter === 'All'
    ? visibleProjects.filter(p => !p.featured)
    : visibleProjects.filter(p => p.category === filter && !p.featured);

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:var(--text-2);grid-column:1/-1;text-align:center;padding:40px 0;">No projects in this category yet.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(p => projectCard(p)).join('');
  grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function projectCard(p) {
  const statusClass = STATUS_CLASSES[p.status] || 'status-archived';
  const badgeClass  = BADGE_CLASSES[p.category] || 'badge--webapp';
  const icon = p.icon || CATEGORY_ICONS[p.category] || '💻';
  const badge = p.category === 'Web App' && p.demo
    ? `<a href="${p.demo}" target="_blank" rel="noopener" class="badge ${badgeClass} badge--link" aria-label="Open ${p.name}">${p.category}</a>`
    : `<span class="badge ${badgeClass}">${p.category}</span>`;

  const links = [
    p.demo ? `
      <a href="${p.demo}" target="_blank" rel="noopener" class="project-link">
        🔗 Open App
      </a>` : '',
    p.download ? `
      <a href="${p.download}" target="_blank" rel="noopener" class="project-link">
        ⬇ Download
      </a>` : '',
  ].filter(Boolean).join('');

  return `
    <div class="project-card fade-in" data-category="${p.category}">
      <div class="project-card__img" aria-hidden="true">${icon}</div>
      <div class="project-card__body">
        <div class="project-card__meta">
          ${badge}
          <span style="font-size:.78rem;color:var(--text-2);">
            <span class="status-dot ${statusClass}"></span>${p.status}
          </span>
        </div>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        ${links ? `<div class="project-card__links">${links}</div>` : ''}
      </div>
    </div>
  `;
}

// ── Render Warp roadmap ──────────────────────────────────────
function renderWarp() {
  const warp = visibleProjects.find(p => p.id === 'warp');
  if (!warp) return;

  const roadmapEl = document.getElementById('warp-roadmap');
  if (roadmapEl && warp.roadmap?.length) {
    roadmapEl.innerHTML = warp.roadmap.map(r => `
      <div class="roadmap__item ${r.status}">
        <div class="roadmap__phase">${r.phase}</div>
        <div class="roadmap__title">${r.title}</div>
        <div class="roadmap__status">${r.status.replace('-', ' ')}</div>
      </div>
    `).join('');
  }
}

// ── Contact form (Formspree) ─────────────────────────────────
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const FORM_ENDPOINT = 'https://formspree.io/f/xwprzrla';

  try {
    const formData = new FormData(contactForm);
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      contactForm.innerHTML = `
        <div style="text-align:center;padding:48px 0;">
          <div style="font-size:2.5rem;margin-bottom:16px;">✅</div>
          <h3 style="color:var(--white);font-family:var(--font-display);margin-bottom:8px;">Message sent!</h3>
          <p style="color:var(--text-2);">Thanks for reaching out. I'll get back to you shortly.</p>
        </div>`;
    } else {
      throw new Error('Failed');
    }
  } catch {
    btn.textContent = 'Failed. Try emailing directly';
    btn.disabled = false;
    setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 4000);
  }
});

// ── Smooth scroll (offset for fixed nav) ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Init ─────────────────────────────────────────────────────
renderFilterBar();
renderProjects('All');
renderWarp();

// Re-observe any static fade-in elements added after DOM load
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

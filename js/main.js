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

// ── Projects data (inline — no fetch required) ───────────────
// To add a new project, copy one of the objects below and edit it.
// Keep projects.json in sync if you use it for other purposes.
const PROJECTS = [
  {
    "id": "warp",
    "name": "Warp",
    "tagline": "Fast, private file beaming for every device",
    "description": "A pocket-size P2P portal that moves files directly between phones, tablets and laptops — no cloud hop, no size cap, no accounts. End-to-end encrypted with QUIC + TLS 1.3.",
    "category": "Software",
    "status": "In Progress",
    "github": "https://github.com/mfmgold",
    "demo": "",
    "download": "",
    "featured": true,
    "roadmap": [
      { "phase": "Phase 1", "title": "Core P2P Engine & Identity", "status": "complete" },
      { "phase": "Phase 2", "title": "UI — Contacts & File Transfer", "status": "in-progress" },
      { "phase": "Phase 3", "title": "Push Notifications & Queue Resume", "status": "upcoming" },
      { "phase": "Phase 4", "title": "Beta Release (iOS, Android, macOS, Windows)", "status": "upcoming" }
    ]
  },
  {
    "id": "pomodoro",
    "name": "Pomodoro Timer",
    "tagline": "A clean, distraction-free focus timer",
    "description": "A simple Pomodoro technique timer to keep you focused with timed work and break intervals. No sign-up, no distractions — just you and the timer.",
    "category": "Web App",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/pomodoro/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "clipboard",
    "name": "Clipboard Manager",
    "tagline": "Save and reuse text snippets in your browser",
    "description": "A handy browser-based clipboard tool for saving and instantly reusing text snippets. Ideal for repetitive copy-paste tasks — no extensions needed.",
    "category": "Web App",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/clipboard/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "housie-board",
    "name": "Housie / Bingo Board",
    "tagline": "Digital caller board for Housie nights",
    "description": "A digital Housie (Bingo) caller board that makes running your Housie night a breeze. Automated number calling with a clear visual display — no paper, no fuss.",
    "category": "Web App",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/hb/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "housie-ticket",
    "name": "Housie Ticket Generator",
    "tagline": "Generate printable Housie tickets instantly",
    "description": "Instantly generate randomised, print-ready Housie (Bingo) tickets right in your browser. Fully client-side — no backend, no install, no waiting.",
    "category": "Web App",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "https://murtuza.neocities.org/ht/",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "rpa-automation",
    "name": "RPA Workflow Automations",
    "tagline": "Enterprise automation with UiPath & Power Automate",
    "description": "A portfolio of Robotic Process Automation solutions built for enterprise clients — covering data extraction, system integration, invoice processing, and end-to-end workflow automation.",
    "category": "RPA",
    "status": "Live",
    "github": "https://github.com/mfmgold",
    "demo": "",
    "download": "",
    "featured": false,
    "roadmap": []
  },
  {
    "id": "doc-extraction",
    "name": "AI Document Extraction",
    "tagline": "Intelligent parsing of invoices, contracts & forms",
    "description": "AI-powered document extraction pipelines that turn invoices, contracts, and forms into structured, usable data. Built using OCR, large language models, and custom post-processing logic.",
    "category": "AI",
    "status": "In Progress",
    "github": "https://github.com/mfmgold",
    "demo": "",
    "download": "",
    "featured": false,
    "roadmap": []
  }
];

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

  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
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
    ? PROJECTS.filter(p => !p.featured)
    : PROJECTS.filter(p => p.category === filter && !p.featured);

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
  const icon        = CATEGORY_ICONS[p.category] || '💻';

  const links = [
    p.demo ? `
      <a href="${p.demo}" target="_blank" rel="noopener" class="project-link">
        🔗 Open App
      </a>` : '',
    p.github ? `
      <a href="${p.github}" target="_blank" rel="noopener" class="project-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>` : '',
    p.download ? `
      <a href="${p.download}" target="_blank" rel="noopener" class="project-link">
        ⬇ Download
      </a>` : '',
  ].filter(Boolean).join('');

  return `
    <div class="project-card fade-in" data-category="${p.category}">
      <div class="project-card__img">${icon}</div>
      <div class="project-card__body">
        <div class="project-card__meta">
          <span class="badge ${badgeClass}">${p.category}</span>
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
  const warp = PROJECTS.find(p => p.id === 'warp');
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
          <p style="color:var(--text-2);">Thanks for reaching out — I'll get back to you shortly.</p>
        </div>`;
    } else {
      throw new Error('Failed');
    }
  } catch {
    btn.textContent = 'Failed — try emailing directly';
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

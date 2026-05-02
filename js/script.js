/* ================================================
   AVIS ZOLA PORTFOLIO — UPGRADED SCRIPT
   Features: preloader · 3-mode theme · typing ·
             counter · project/cert filter+render ·
             gallery modal · custom cursor · tilt ·
             smooth scroll · scroll reveal · parallax
   ================================================ */

'use strict';

/* ── DOM REFS ──────────────────────────────────── */
const html        = document.documentElement;
const body        = document.body;
const preloader   = document.getElementById('preloader');
const preloaderFill = document.getElementById('preloaderFill');
const pageTrans   = document.getElementById('page-transition');
const scrollBar   = document.getElementById('scroll-progress');
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const backToTop   = document.getElementById('back-to-top');
const themeToggle = document.getElementById('theme-toggle');
const typedEl     = document.getElementById('typed-text');
const statNums    = document.querySelectorAll('.stat-number');
const filterBtns  = document.querySelectorAll('.filter-btn');
const certFilters = document.querySelectorAll('.filter-cert');
const projectsGrid = document.getElementById('projectsGrid');
const certGrid    = document.getElementById('certGrid');
const navLinks    = document.querySelectorAll('.nav-link');
const sections    = document.querySelectorAll('section[id]');

/* ── THEME ─────────────────────────────────────── */
/*
  Three themes: light | dark | elegant
  Saved to localStorage. Cycling order: light→dark→elegant→light
  UPDATED: also syncs all pill buttons in nav & mobile menu
*/
const THEMES = ['light', 'dark', 'elegant'];
const ICONS  = { light: 'fa-sun', dark: 'fa-moon', elegant: 'fa-gem' };

function getTheme()   { return localStorage.getItem('theme') || 'light'; }
function setTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);

  // Update floating toggle icon
  const icon = themeToggle.querySelector('i');
  icon.className = `fas ${ICONS[t]}`;

  // Sync all pill buttons (desktop + mobile)
  document.querySelectorAll('.t-pill, .mob-t').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.t === t);
  });
}

// Initial apply
setTheme(getTheme());

// Floating toggle: cycle
themeToggle.addEventListener('click', () => {
  const idx = THEMES.indexOf(getTheme());
  setTheme(THEMES[(idx + 1) % THEMES.length]);
});

// Pill clicks (desktop nav)
document.querySelectorAll('.t-pill').forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.t));
});
// Pill clicks (mobile menu)
document.querySelectorAll('.mob-t').forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.t));
});

/* ── NEW: PRELOADER ─────────────────────────────── */
/*
  Fake progress bar that fills over ~1.5s then hides.
  Real load event triggers final fill + dismiss.
*/
let fillProgress = 0;
const fillInterval = setInterval(() => {
  fillProgress = Math.min(fillProgress + Math.random() * 18, 85);
  if (preloaderFill) preloaderFill.style.width = fillProgress + '%';
}, 120);

window.addEventListener('load', () => {
  clearInterval(fillInterval);
  if (preloaderFill) preloaderFill.style.width = '100%';
  setTimeout(() => {
    if (preloader) preloader.classList.add('hide');
  }, 400);
});

/* ── SCROLL PROGRESS + NAVBAR ──────────────────── */
// UPDATED: combined into one listener for perf
window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
  const sy  = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  // Progress bar
  if (scrollBar) scrollBar.style.width = (max > 0 ? (sy / max) * 100 : 0) + '%';

  // Navbar glass
  navbar.classList.toggle('scrolled', sy > 60);

  // Back to top
  backToTop.classList.toggle('show', sy > 300);

  // Parallax hero (lightweight, only on desktop)
  runParallax(sy);

  // Active nav link
  updateActiveLink(sy);
}

/* ── UPDATED: ACTIVE NAV LINK ─────────────────── */
function updateActiveLink(sy) {
  let current = '';
  sections.forEach(sec => {
    if (sy >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}

/* ── BACK TO TOP ───────────────────────────────── */
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── MOBILE HAMBURGER ──────────────────────────── */
// UPDATED: smooth max-height slide
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  body.style.overflow = (isOpen && window.innerWidth < 900) ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  });
});

/* ── SMOOTH SCROLL for anchor links ────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── TYPING EFFECT ─────────────────────────────── */
const roles = ['Mobile Developer', 'Flutter Enthusiast', 'RPL Student', 'Problem Solver', 'Idea Thinker'];
let rIdx = 0, cIdx = 0, deleting = false;

function typeEffect() {
  if (!typedEl) return;
  const word = roles[rIdx];
  typedEl.textContent = deleting
    ? word.substring(0, cIdx - 1)
    : word.substring(0, cIdx + 1);

  if (deleting) cIdx--; else cIdx++;

  if (!deleting && cIdx === word.length) {
    deleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }
  if (deleting && cIdx === 0) {
    deleting = false;
    rIdx = (rIdx + 1) % roles.length;
    setTimeout(typeEffect, 500);
    return;
  }
  setTimeout(typeEffect, deleting ? 45 : 95);
}
typeEffect();

/* ── COUNTER ANIMATION ─────────────────────────── */
function runCounters() {
  statNums.forEach(el => {
    const target = +el.dataset.target;
    let current  = 0;
    const step   = target / 55;
    const tick = () => {
      current += step;
      if (current < target) { el.textContent = Math.floor(current); requestAnimationFrame(tick); }
      else                  { el.textContent = target; }
    };
    tick();
  });
}

// Trigger on first intersection of stats row
const statsRow = document.querySelector('.hero-stats');
if (statsRow) {
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) { runCounters(); obs.disconnect(); }
  }, { threshold: 0.4 }).observe(statsRow);
}

/* ── PROJECTS DATA & RENDER ─────────────────────── */
// UPDATED: richer card with colour gradients per category
const projectsData = [
  {
    name: 'Aplikasi Toko Bangunan Online',
    desc: 'Manajemen inventaris & transaksi real-time dengan dashboard yang intuitif.',
    tags: ['Flutter', 'Dart', 'Postman'],
    filter: 'flutter',
    link: 'https://github.com/aviszola/TugasPostman-AvisZolaRK_05-XIR7',
    icon: 'fas fa-store',
    grad: 'linear-gradient(140deg,#1b3a6b,#2e5299)'
  },
  {
    name: 'Monsef: Tracking Money Analysis',
    desc: 'Platform AI untuk analisis keuangan secara umum & perencanaan keuangan pribadi yang cerdas.',
    tags: ['Flutter', 'Database'],
    filter: 'ai',
    link: 'https://github.com/ElZidane123/monsefApp',
    icon: 'fas fa-robot',
    grad: 'linear-gradient(140deg,#0d1f3c,#1a3a6b)'
  },
  {
    name: 'Aplikasi Absen Digital Perusahaan Tambang',
    desc: 'Aplikasi absensi yang berbasis AI & data real time .',
    tags: ['Flutter', 'Firebase', 'UI/UX'],
    filter: 'flutter',
    link: 'https://github.com/aviszola/OTW_UKL-Avis-',
    icon: 'fas fa-shield-alt',
    grad: 'linear-gradient(140deg,#112244,#1b3a6b)'
  },
  {
    name: 'Web Portfolio Dinamis',
    desc: 'Website portfolio interaktif dengan multi-theme dan animasi premium.',
    tags: ['HTML', 'CSS', 'JS'],
    filter: 'web',
    link: 'https://github.com/aviszola/AvisPorto',
    icon: 'fas fa-code',
    grad: 'linear-gradient(140deg,#162a52,#2e5299)'
  }
];

function renderProjects(filter = 'all') {
  const list = filter === 'all' ? projectsData : projectsData.filter(p => p.filter === filter);
  projectsGrid.innerHTML = list.map(p => `
    <div class="project-card reveal">
      <div class="project-thumb" style="background:${p.grad}">
        <i class="${p.icon}"></i>
      </div>
      <div class="project-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="tech-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="${p.link}" target="_blank" rel="noopener">
            <i class="fab fa-github"></i> GitHub
          </a>
        </div>
      </div>
    </div>
  `).join('');
  activateReveal();
  initTilt(); // re-init tilt on new cards
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});
renderProjects();

/* ── CERTIFICATES DATA & RENDER ─────────────────── */
/*
  UPDATED: each cert has an img path.
  Replace paths with your actual certificate image filenames.
  The modal will display the full image with prev/next gallery navigation.
*/
const certsData = [
  { name: 'Pelatihan AI Engineering For Millenial',       org: 'Kemenkomdigi',    year: '2026', img: 'images/SERTIFIKAT AI .img' },
  { name: 'Dasar Pemrograman Web Developer',              org: 'Dicoding',        year: '2026', img: 'images/Sertifikat Kompetensi - Dicoding Indonesia_page-0001.jpg' },
  { name: 'Intermediate Assistant Web Developer DEX Jatim',org:'Kemenkomdigi',    year: '2026', img: 'images/Sertifikat_AVIS ZOLA RADITYA KURNIAWAN_Intermediate Assistant Web Developer - DEX - Jawa Timur (1)_page-0001.jpg' },
  { name: 'Front End Web Development',                    org: 'Dicoding',        year: '2026', img: 'images/Sertifikat Kompetensi - Dicoding Indonesia (1)_page-0001.jpg' },

];

// Shared modal state
let certModalData  = [];
let currentCertIdx = 0;
let certModalEl    = null; // reference to active modal DOM node
let certModalAnimating = false;

function esc(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])
  );
}

function renderCerts(yearFilter = 'all') {
  const list = yearFilter === 'all' ? certsData : certsData.filter(c => c.year === yearFilter);
  certGrid.innerHTML = list.map((cert, i) => `
    <div class="cert-card reveal"
         data-idx="${i}"
         data-img="${esc(cert.img)}"
         data-name="${esc(cert.name)}"
         data-org="${esc(cert.org)}"
         data-year="${esc(cert.year)}">
      <div class="cert-thumb">
        <img src="${esc(cert.img)}"
             alt="${esc(cert.name)}"
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/300x200?text=Certificate'">
        <div class="cert-thumb-overlay"><i class="fas fa-eye"></i> Lihat Sertifikat</div>
      </div>
      <div class="cert-body">
        <h4>${esc(cert.name)}</h4>
        <p>${esc(cert.org)}</p>
        <span class="cert-year">${cert.year}</span>
      </div>
    </div>
  `).join('');

  // Store data for modal from currently visible cards
  certModalData = list.map(c => ({ ...c }));

  // Bind click
  document.querySelectorAll('.cert-card').forEach((card, i) => {
    card.addEventListener('click', () => openCertModal(i));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCertModal(i); }
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Lihat sertifikat ${certModalData[i]?.name}`);
  });

  activateReveal();
  initTilt();
}

certFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    certFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCerts(btn.dataset.certYear);
  });
});
renderCerts();

/* ── NEW: CERTIFICATE MODAL ─────────────────────── */
function openCertModal(index) {
  currentCertIdx = index;
  const root = document.getElementById('certModalRoot');
  root.innerHTML = '';

  certModalEl = document.createElement('div');
  certModalEl.className = 'cert-modal-overlay';
  certModalEl.setAttribute('role', 'dialog');
  certModalEl.setAttribute('aria-modal', 'true');
  certModalEl.innerHTML = `
    <div class="cert-modal" id="certModalBox">
      <div class="cert-modal-header">
        <h3 id="certModalTitle"></h3>
        <button class="close-modal" aria-label="Tutup">&times;</button>
      </div>
      <div class="cert-modal-body" id="certModalBody">
        <button class="modal-nav prev" aria-label="Sebelumnya"><i class="fas fa-chevron-left"></i></button>
        <button class="modal-nav next" aria-label="Berikutnya"><i class="fas fa-chevron-right"></i></button>
      </div>
      <div class="cert-modal-footer">
        <div class="modal-meta">
          <strong id="certModalOrg"></strong>
          <span id="certModalYear"></span>
        </div>
        <div class="modal-dots" id="certModalDots"></div>
      </div>
    </div>
  `;
  root.appendChild(certModalEl);
  body.style.overflow = 'hidden';

  // Build dots
  buildDots();
  setModalContent(currentCertIdx);

  // Show
  requestAnimationFrame(() => certModalEl.classList.add('active'));

  // Bind controls
  certModalEl.querySelector('.close-modal').addEventListener('click', closeCertModal);
  certModalEl.addEventListener('click', e => { if (e.target === certModalEl) closeCertModal(); });
  certModalEl.querySelector('.modal-nav.prev').addEventListener('click', () => certGo('prev'));
  certModalEl.querySelector('.modal-nav.next').addEventListener('click', () => certGo('next'));

  // Keyboard
  document._certKeyHandler = e => {
    if (e.key === 'Escape')     closeCertModal();
    if (e.key === 'ArrowLeft')  certGo('prev');
    if (e.key === 'ArrowRight') certGo('next');
  };
  document.addEventListener('keydown', document._certKeyHandler);

  // Touch swipe
  let tx = 0;
  certModalEl.querySelector('#certModalBody').addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive:true });
  certModalEl.querySelector('#certModalBody').addEventListener('touchend',   e => {
    const d = e.changedTouches[0].clientX - tx;
    if (Math.abs(d) > 50) certGo(d < 0 ? 'next' : 'prev');
  }, { passive:true });
}

function closeCertModal() {
  if (!certModalEl) return;
  certModalEl.classList.remove('active');
  body.style.overflow = '';
  document.removeEventListener('keydown', document._certKeyHandler);
  setTimeout(() => {
    certModalEl?.remove();
    certModalEl = null;
  }, 350);
}

function buildDots() {
  const container = document.getElementById('certModalDots');
  if (!container) return;
  container.innerHTML = certModalData.map((_, i) => `
    <span class="m-dot${i === currentCertIdx ? ' active' : ''}" data-i="${i}"></span>
  `).join('');
  container.querySelectorAll('.m-dot').forEach(dot => {
    dot.addEventListener('click', () => certGo(+dot.dataset.i, true));
  });
}

function setModalContent(idx) {
  const data = certModalData[idx];
  if (!data) return;
  const title = document.getElementById('certModalTitle');
  const org   = document.getElementById('certModalOrg');
  const year  = document.getElementById('certModalYear');
  if (title) title.textContent = data.name;
  if (org)   org.textContent   = data.org;
  if (year)  year.textContent  = data.year;

  // Sync dots
  document.querySelectorAll('.m-dot').forEach((d, i) => d.classList.toggle('active', i === idx));

  // Render image
  const body  = document.getElementById('certModalBody');
  const prev  = body.querySelector('.modal-nav.prev');
  const next  = body.querySelector('.modal-nav.next');
  const oldImg = body.querySelector('img');
  if (oldImg) oldImg.remove();

  const img = document.createElement('img');
  img.alt     = data.name;
  img.loading = 'lazy';
  img.src     = data.img || '';
  img.onerror = () => { img.src = 'https://via.placeholder.com/600x400?text=Sertifikat'; };
  body.insertBefore(img, prev);
}

function certGo(dirOrIdx, isDot = false) {
  if (certModalAnimating) return;
  certModalAnimating = true;

  let newIdx;
  if (isDot) {
    newIdx = dirOrIdx;
  } else {
    newIdx = dirOrIdx === 'next'
      ? (currentCertIdx + 1) % certModalData.length
      : (currentCertIdx - 1 + certModalData.length) % certModalData.length;
  }
  if (newIdx === currentCertIdx) { certModalAnimating = false; return; }

  const isNext  = isDot ? (newIdx > currentCertIdx) : (dirOrIdx === 'next');
  const outCls  = isNext ? 'slide-out-l' : 'slide-out-r';
  const inCls   = isNext ? 'slide-in-l'  : 'slide-in-r';

  const body    = document.getElementById('certModalBody');
  const oldImg  = body.querySelector('img');
  if (oldImg) oldImg.classList.add(outCls);

  setTimeout(() => {
    currentCertIdx = newIdx;
    setModalContent(currentCertIdx);
    const newImg = body.querySelector('img');
    if (newImg) {
      newImg.classList.add(inCls);
      requestAnimationFrame(() => requestAnimationFrame(() => newImg.classList.remove(inCls)));
    }
    certModalAnimating = false;
  }, 260);
}

/* ── SCROLL REVEAL ─────────────────────────────── */
function activateReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.closest('.projects-grid, .cert-grid');
        const delay  = parent
          ? Array.from(parent.children).indexOf(entry.target) * 70
          : 0;
        setTimeout(() => entry.target.classList.add('active'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
activateReveal();

/* ── NEW: HERO PARALLAX ──────────────────────────── */
const heroContent = document.querySelector('.hero-content');
const heroVisual  = document.querySelector('.hero-visual');

function runParallax(sy) {
  if (sy < window.innerHeight && window.innerWidth > 900) {
    const d = sy * 0.1;
    if (heroVisual)  heroVisual.style.transform  = `translateY(${-d}px)`;
    if (heroContent) heroContent.style.transform = `translateY(${d * 0.5}px)`;
  } else {
    if (heroVisual)  heroVisual.style.transform  = '';
    if (heroContent) heroContent.style.transform = '';
  }
}

/* ── VANILLA TILT ──────────────────────────────── */
function initTilt() {
  const cards = document.querySelectorAll('.project-card:not([data-tilt])');
  if (cards.length && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(cards, { max:7, speed:450, glare:true, 'max-glare':.15, gyroscope:true });
    cards.forEach(c => c.setAttribute('data-tilt', 'true'));
  }
}
// Wait for VanillaTilt script to load
if (typeof VanillaTilt !== 'undefined') initTilt();
else window.addEventListener('load', initTilt);

/* ── CUSTOM CURSOR ─────────────────────────────── */
// Only on non-touch devices
if (window.matchMedia('(hover:hover)').matches) {
  const dot  = document.createElement('div'); dot.className  = 'cursor-dot';
  const ring = document.createElement('div'); ring.className = 'cursor-ring';
  body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Smooth ring follow
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animRing);
  })();

  document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity='1'; ring.style.opacity='1'; });

  // Grow ring on hoverable elements
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a,button,.project-card,.cert-card,.btn')) ring.classList.add('hover');
    else ring.classList.remove('hover');
  });
}

/* ── FOOTER YEAR ───────────────────────────────── */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
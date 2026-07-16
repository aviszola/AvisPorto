/* ================================================
   AVIS ZOLA PORTFOLIO — PHASE 3
   Living Portfolio: Command Palette · GitHub API ·
   Engineering Mode · Now · Dashboard · Live Status
   Konami · Counters · Projects · Certs
   ================================================ */

'use strict';

/* ── DOM REFS ──────────────────────────────────── */
const html        = document.documentElement;
const body        = document.body;
const scrollBar   = document.getElementById('scroll-progress');
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const backToTop   = document.getElementById('back-to-top');
const themeToggle = document.getElementById('theme-toggle');
const engToggle   = document.getElementById('engModeToggle');
const engGrid     = document.getElementById('engGridOverlay');
const statNums    = document.querySelectorAll('.stat-number');
const filterBtns  = document.querySelectorAll('.filter-btn');
const certFilters = document.querySelectorAll('.filter-cert');
const projectsGrid = document.getElementById('projectsGrid');
const certGrid    = document.getElementById('certGrid');
const navLinks    = document.querySelectorAll('.nav-link');
const sections    = document.querySelectorAll('section[id]');

/* ═══════════════════════════════════════════════════
   1. THEME
   ═══════════════════════════════════════════════════ */
const THEMES = ['light', 'dark'];
const ICONS  = { light: 'fa-sun', dark: 'fa-moon' };
function getTheme() {
  const saved = localStorage.getItem('theme');
  if (saved && THEMES.includes(saved)) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function setTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  themeToggle.querySelector('i').className = `fas ${ICONS[t]}`;
  document.querySelectorAll('.mob-t').forEach(btn => btn.classList.toggle('active', btn.dataset.t === t));
}
setTheme(getTheme());
themeToggle.addEventListener('click', () => { const i=THEMES.indexOf(getTheme()); setTheme(THEMES[(i+1)%THEMES.length]); });
document.querySelectorAll('.mob-t').forEach(btn => btn.addEventListener('click', () => setTheme(btn.dataset.t)));

/* ═══════════════════════════════════════════════════
   2. ENGINEERING MODE TOGGLE
   ═══════════════════════════════════════════════════ */
let engMode = false;
engToggle.addEventListener('click', () => {
  engMode = !engMode;
  engToggle.classList.toggle('active', engMode);
  engGrid.classList.toggle('active', engMode);
  html.classList.toggle('eng-mode', engMode);
});

// Keyboard shortcut: E
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'e' || e.key === 'E') { engToggle.click(); }
});

/* ═══════════════════════════════════════════════════
   3. SCROLL
   ═══════════════════════════════════════════════════ */
window.addEventListener('scroll', onScroll, { passive: true });
function onScroll() {
  const sy = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollBar) { const p=max>0?(sy/max)*100:0; scrollBar.style.width=p+'%'; scrollBar.setAttribute('aria-valuenow',Math.round(p)); }
  navbar.classList.toggle('scrolled', sy>60);
  backToTop.classList.toggle('show', sy>300);
  updateActiveLink(sy);
}
function updateActiveLink(sy) {
  let cur=''; sections.forEach(s=>{if(sy>=s.offsetTop-140)cur=s.id;}); navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
}
backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ═══════════════════════════════════════════════════
   4. MOBILE MENU
   ═══════════════════════════════════════════════════ */
hamburger.addEventListener('click', () => { const o=hamburger.classList.toggle('active'); mobileMenu.classList.toggle('open',o); hamburger.setAttribute('aria-expanded',String(o)); body.style.overflow=(o&&window.innerWidth<900)?'hidden':''; });
document.querySelectorAll('.mob-link').forEach(a => { a.addEventListener('click', () => { hamburger.classList.remove('active'); mobileMenu.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); body.style.overflow=''; }); });

/* ── SMOOTH SCROLL ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => { a.addEventListener('click', function(e) { const id=this.getAttribute('href'); if(id==='#')return; const t=document.querySelector(id); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); } }); });

/* ── HERO STATEMENT FADE ───────────────────────── */
const hs = document.getElementById('heroStatement');
if(hs){ hs.style.opacity='0'; hs.style.transform='translateY(8px)'; requestAnimationFrame(()=>{ hs.style.transition='opacity .8s var(--ease), transform .8s var(--ease)'; hs.style.opacity='1'; hs.style.transform='translateY(0)'; }); }

/* ── COUNTER ANIMATION ─────────────────────────── */
function runCounters() { statNums.forEach(el=>{ const t=+el.dataset.target; let c=0; const s=Math.max(t/50,1); const tick=()=>{c+=s; if(c<t){el.textContent=Math.floor(c);requestAnimationFrame(tick);}else el.textContent=t;}; tick(); }); }
const statsRow = document.querySelector('.hero-stats');
if(statsRow) { new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){runCounters();o.disconnect();}},{threshold:.4}).observe(statsRow); }

/* ── DASHBOARD COUNTERS ───────────────────────── */
const dashNums = document.querySelectorAll('.dash-num[data-count]');
function runDashCounters() { dashNums.forEach(el=>{ const t=+el.dataset.count; let c=0; const s=Math.max(t/50,1); const tick=()=>{c+=s; if(c<t){el.textContent=Math.floor(c);requestAnimationFrame(tick);}else el.textContent=t;}; tick(); }); }
const dashGrid = document.querySelector('.dash-grid');
if(dashGrid) { new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){runDashCounters();o.disconnect();}},{threshold:.3}).observe(dashGrid); }

/* ═══════════════════════════════════════════════════
   5. BLUEPRINT REVEAL
   ═══════════════════════════════════════════════════ */
class BlueprintReveal {
  constructor(canvasId) {
    this.canvas=document.getElementById(canvasId); if(!this.canvas)return;
    this.ctx=this.canvas.getContext('2d'); this.wrapper=this.canvas.closest('.avatar-wrapper');
    this.animId=null; this.progress=0; this.target=0; this.lines=[];
    this.init();
  }
  init() { this.resize(); window.addEventListener('resize',()=>this.resize()); this.wrapper.addEventListener('mouseenter',()=>{this.target=1;if(!this.animId)this.animate();}); this.wrapper.addEventListener('mouseleave',()=>{this.target=0;if(!this.animId)this.animate();}); }
  resize() { const r=this.wrapper.getBoundingClientRect(); this.canvas.width=r.width; this.canvas.height=r.height; this.generateLines(); }
  generateLines() { const w=this.canvas.width,h=this.canvas.height,cx=w/2,cy=h/2,r=Math.min(w,h)/2; this.lines=[]; for(let i=1;i<=5;i++){const rr=(r/5)*i;this.lines.push({type:'circle',cx,cy,r:rr,color:`hsla(44,44%,61%,${.15+i*.05})`});} this.lines.push({type:'line',x1:cx-r*1.1,y1:cy,x2:cx+r*1.1,y2:cy,color:'hsla(44,44%,61%,.12)'}); this.lines.push({type:'line',x1:cx,y1:cy-r*1.1,x2:cx,y2:cy+r*1.1,color:'hsla(44,44%,61%,.12)'}); for(let i=-6;i<=6;i++){const sp=r/6,ox=cx+i*sp,oy=cy+i*sp;this.lines.push({type:'line',x1:ox-r,y1:oy-r,x2:ox+r,y2:oy+r,color:'hsla(44,44%,61%,.06)'});this.lines.push({type:'line',x1:ox-r,y1:oy+r,x2:ox+r,y2:oy-r,color:'hsla(44,44%,61%,.06)'});} const marks=[{angle:0},{angle:Math.PI/4},{angle:Math.PI/2},{angle:3*Math.PI/4},{angle:Math.PI},{angle:5*Math.PI/4},{angle:3*Math.PI/2},{angle:7*Math.PI/4}]; marks.forEach(m=>{const x1=cx+Math.cos(m.angle)*(r+2),y1=cy+Math.sin(m.angle)*(r+2),x2=cx+Math.cos(m.angle)*(r+10),y2=cy+Math.sin(m.angle)*(r+10);this.lines.push({type:'line',x1,y1,x2,y2,color:'hsla(44,44%,61%,.2)'});}); this.lines.push({type:'text',text:'AZ',x:cx,y:cy-8,font:'bold 20px Cormorant Garamond, serif',color:'hsla(44,44%,61%,.5)'}); this.lines.push({type:'text',text:'MOBILE DEV',x:cx,y:cy+14,font:'10px DM Sans, sans-serif',color:'hsla(44,44%,61%,.35)'}); this.lines.push({type:'text',text:'VER 2.0',x:cx+r*.55,y:cy-r*.6,font:'8px DM Sans, sans-serif',color:'hsla(44,44%,61%,.25)'}); }
  animate() { this.progress+=(this.target-this.progress)*.08; this.draw(); if(Math.abs(this.progress-this.target)>.001) this.animId=requestAnimationFrame(()=>this.animate()); else { this.progress=this.target; this.draw(); this.animId=null; } }
  draw() { const ctx=this.ctx,w=this.canvas.width,h=this.canvas.height; ctx.clearRect(0,0,w,h); if(this.progress<.01)return; ctx.save(); ctx.globalAlpha=this.progress; this.lines.forEach(l=>{if(l.type==='circle'){ctx.beginPath();ctx.arc(l.cx,l.cy,l.r*this.progress,0,Math.PI*2);ctx.strokeStyle=l.color;ctx.lineWidth=.5;ctx.stroke();}else if(l.type==='line'){ctx.beginPath();ctx.moveTo(l.x1,l.y1);ctx.lineTo(l.x2,l.y2);ctx.strokeStyle=l.color;ctx.lineWidth=.5;ctx.stroke();}else if(l.type==='text'){ctx.font=l.font;ctx.fillStyle=l.color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(l.text,l.x,l.y);}}); const scanY=h*.3+h*.4*(1-this.progress); ctx.beginPath();ctx.moveTo(0,scanY);ctx.lineTo(w,scanY);ctx.strokeStyle=`hsla(44,44%,61%,${.08*this.progress})`;ctx.lineWidth=1;ctx.stroke(); ctx.restore(); }
}
new BlueprintReveal('blueprintCanvas');

/* ═══════════════════════════════════════════════════
   6. MAGNETIC BUTTON
   ═══════════════════════════════════════════════════ */
class MagneticButton {
  constructor(el) { this.el=el; this.bound=el.getBoundingClientRect(); this.strong=el.classList.contains('btn-primary'); this.bind(); }
  bind() { this.el.addEventListener('mousemove',e=>this.move(e)); this.el.addEventListener('mouseleave',()=>this.reset()); window.addEventListener('resize',()=>{this.bound=this.el.getBoundingClientRect();}); }
  move(e) { const s=this.strong?12:8,x=e.clientX-this.bound.left-this.bound.width/2,y=e.clientY-this.bound.top-this.bound.height/2,dist=Math.sqrt(x*x+y*y),pull=Math.min(dist/100,1); this.el.style.transform=`translate(${(x/(this.bound.width/2))*s*pull}px,${(y/(this.bound.height/2))*s*pull}px)`; }
  reset() { this.el.style.transform=''; }
}
document.querySelectorAll('[data-magnetic]').forEach(el=>new MagneticButton(el));

/* ═══════════════════════════════════════════════════
   7. TIMELINE SCROLL
   ═══════════════════════════════════════════════════ */
class TimelineScroll {
  constructor() { this.timeline=document.querySelector('.timeline'); this.progress=document.getElementById('timelineProgress'); this.items=document.querySelectorAll('.tl-item'); if(!this.timeline||!this.progress||!this.items.length)return; this.observe(); }
  observe() { new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){this.updateProgress(entry.target);this.activateDots(entry.target);}});},{threshold:.3,rootMargin:'0px 0px -60px 0px'}).observe(this.items[0]); this.items.forEach((item,i)=>{if(i===0)return;new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){this.updateProgress(entry.target);this.activateDots(entry.target);}});},{threshold:.3,rootMargin:'0px 0px -60px 0px'}).observe(item);}); }
  updateProgress(entry) { const all=Array.from(this.items),idx=all.indexOf(entry); if(idx<0)return; const pct=((idx+1)/all.length)*100; if(pct>parseFloat(this.progress.style.height||'0')) this.progress.style.height=pct+'%'; }
  activateDots(entry) { const dot=entry.querySelector('.tl-dot'); if(dot)dot.classList.add('active-glow'); }
}
new TimelineScroll();

/* ═══════════════════════════════════════════════════
   8. COMMAND PALETTE
   ═══════════════════════════════════════════════════ */
class CommandPalette {
  constructor() {
    this.overlay = document.getElementById('paletteOverlay');
    this.input = document.getElementById('paletteInput');
    this.list = document.getElementById('paletteList');
    this.hint = document.getElementById('paletteHint');
    this.active = false;
    this.selectedIdx = -1;
    this.commands = [
      { icon: 'fa-microchip', label: 'Toggle Engineering Mode', action: () => { this.close(); setTimeout(()=>engToggle.click(),100); } },
      { icon: 'fa-moon', label: 'Toggle Theme', action: () => { this.close(); themeToggle.click(); } },
      { icon: 'fa-arrow-right', label: 'Open Featured Project', action: () => { this.close(); this.scrollTo('#featured'); } },
      { icon: 'fa-folder-open', label: 'View All Projects', action: () => { this.close(); this.scrollTo('#projects'); } },
      { icon: 'fa-github', label: 'GitHub Profile', action: () => { window.open('https://github.com/aviszola','_blank'); this.close(); } },
      { icon: 'fa-linkedin', label: 'LinkedIn Profile', action: () => { window.open('https://www.linkedin.com/in/avis-zola-raditya-kurniawan-407388377','_blank'); this.close(); } },
      { icon: 'fa-envelope', label: 'Contact Me', action: () => { this.close(); this.scrollTo('#contact'); } },
      { icon: 'fa-file-alt', label: 'Download Resume', action: () => { alert('Resume coming soon!'); this.close(); } },
      { icon: 'fa-code', label: 'Current Stack: Flutter, Dart, Python', action: () => { this.close(); this.scrollTo('#who-i-am'); } },
      { icon: 'fa-road', label: 'View My Journey', action: () => { this.close(); this.scrollTo('#journey'); } },
      { icon: 'fa-certificate', label: 'View Certificates', action: () => { this.close(); this.scrollTo('#achievements'); } },
      { icon: 'fa-clock', label: 'Now: Currently Building', action: () => { this.close(); this.scrollTo('#now'); } },
    ];
    this.filtered = [...this.commands];
    this.bind();
  }

  bind() {
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); this.toggle(); }
      if (e.key === 'Escape' && this.active) { this.close(); }
      if (this.active && e.key === 'ArrowDown') { e.preventDefault(); this.select(1); }
      if (this.active && e.key === 'ArrowUp') { e.preventDefault(); this.select(-1); }
      if (this.active && e.key === 'Enter') { e.preventDefault(); this.execute(); }
    });
    this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.close(); });
    this.input.addEventListener('input', () => this.filter());
  }

  toggle() {
    this.active ? this.close() : this.open();
  }

  open() {
    this.active = true;
    this.overlay.classList.add('active');
    this.input.value = '';
    this.filtered = [...this.commands];
    this.selectedIdx = 0;
    this.render();
    setTimeout(() => this.input.focus(), 100);
  }

  close() {
    this.active = false;
    this.overlay.classList.remove('active');
    this.input.blur();
  }

  filter() {
    const q = this.input.value.toLowerCase().trim();
    this.filtered = q ? this.commands.filter(c => c.label.toLowerCase().includes(q)) : [...this.commands];
    this.selectedIdx = this.filtered.length > 0 ? 0 : -1;
    this.render();
  }

  select(dir) {
    if (this.filtered.length === 0) return;
    this.selectedIdx = (this.selectedIdx + dir + this.filtered.length) % this.filtered.length;
    this.render();
  }

  execute() {
    if (this.selectedIdx >= 0 && this.filtered[this.selectedIdx]) {
      this.filtered[this.selectedIdx].action();
    }
  }

  render() {
    if (this.filtered.length === 0) {
      this.list.innerHTML = `<li class="palette-empty">No commands found</li>`;
      this.hint.textContent = 'No results';
      return;
    }
    this.hint.textContent = `${this.filtered.length} commands`;
    this.list.innerHTML = this.filtered.map((c, i) =>
      `<li class="palette-item${i === this.selectedIdx ? ' active' : ''}" data-idx="${i}">
        <i class="fas ${c.icon}"></i> ${c.label}
      </li>`
    ).join('');
    this.list.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = +el.dataset.idx;
        this.selectedIdx = idx;
        this.execute();
      });
      el.addEventListener('mouseenter', () => { this.selectedIdx = +el.dataset.idx; this.render(); });
    });
  }

  scrollTo(sel) {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
new CommandPalette();

/* ═══════════════════════════════════════════════════
   9. GITHUB INTEGRATION
   ═══════════════════════════════════════════════════ */
class GitHubAPI {
  constructor(username) {
    this.username = username;
    this.grid = document.getElementById('ghGrid');
    if (!this.grid) return;
    this.fetch();
  }

  async fetch() {
    try {
      const res = await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=6`);
      if (!res.ok) throw new Error('GitHub API error');
      const repos = await res.json();
      this.render(repos);
      // Update repo count
      const ghCount = document.getElementById('ghRepoCount');
      if (ghCount) ghCount.dataset.count = repos.length;
    } catch (e) {
      this.render([]);
    }
  }

  render(repos) {
    if (!repos || repos.length === 0) {
      this.grid.innerHTML = `<div class="gh-fallback"><i class="fas fa-github"></i> Unable to load repos. <a href="https://github.com/${this.username}" target="_blank" rel="noopener">View GitHub →</a></div>`;
      return;
    }
    this.grid.innerHTML = repos.slice(0, 4).map(r => `
      <div class="gh-card reveal">
        <h4>${esc(r.name)}</h4>
        <p>${esc(r.description || 'No description')}</p>
        <div class="gh-meta">
          <span><i class="fas fa-star"></i> ${r.stargazers_count}</span>
          <span><i class="fas fa-code-branch"></i> ${r.forks_count}</span>
          <span><i class="fas fa-circle" style="color:${r.language ? '#c9a96e' : '#666'}"></i> ${r.language || 'N/A'}</span>
        </div>
        <a href="${r.html_url}" target="_blank" rel="noopener"><i class="fab fa-github"></i> View Repo</a>
      </div>
    `).join('');
    activateReveal();
  }
}
new GitHubAPI('aviszola');

/* ═══════════════════════════════════════════════════
   10. EASTER EGG — Konami Code
   ═══════════════════════════════════════════════════ */
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  if (e.key === konamiCode[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konamiCode.length) {
      konamiIdx = 0;
      // Activate engineering mode as easter egg
      if (!engMode) engToggle.click();
      // Show secret message
      const msg = document.createElement('div');
      msg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--surface);border:2px solid var(--accent-gold);border-radius:16px;padding:2rem;z-index:9999;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,.5);font-family:DM Sans,sans-serif;';
      msg.innerHTML = '<div style="font-size:3rem;margin-bottom:.5rem;">⚡</div><h3 style="margin-bottom:.25rem;">Easter Egg!</h3><p style="color:var(--text-2);font-size:.85rem;">Engineering Mode activated. You found the secret!</p><button onclick="this.parentElement.remove()" style="margin-top:1rem;padding:.45rem 1.2rem;border-radius:8px;border:1px solid var(--accent-gold);background:none;color:var(--accent-gold);cursor:pointer;font-weight:600;">OK</button>';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 4000);
    }
  } else {
    konamiIdx = 0;
  }
});

/* ═══════════════════════════════════════════════════
   11. PROJECTS DATA & RENDER
   ═══════════════════════════════════════════════════ */
const projectsData = [
  { name:'Aplikasi Toko Bangunan Online', desc:'Manajemen inventaris & transaksi real-time.', problem:'Toko bangunan kecil kesulitan melacak stok secara manual.', tags:['Flutter','Dart','Postman'], filter:'flutter', link:'https://github.com/aviszola/TugasPostman-AvisZolaRK_05-XIR7', icon:'fa-store', image:null },
  { name:'Monsef: Tracking Money Analysis', desc:'Platform AI untuk analisis keuangan pribadi.', problem:'Banyak orang sulit melacak pengeluaran.', tags:['Flutter','Database'], filter:'ai', link:'https://github.com/ElZidane123/monsefApp', icon:'fa-robot', image:null },
  { name:'Aplikasi Absen Digital Perusahaan Tambang', desc:'Absensi berbasis AI & data real-time.', problem:'Absensi manual tidak efisien dan rawan kesalahan.', tags:['Flutter','Firebase','UI/UX'], filter:'flutter', link:'https://github.com/aviszola/OTW_UKL-Avis-', icon:'fa-shield-alt', image:null },
  { name:'Eazy Chise — Digital Franchise UMKM', desc:'Website digital untuk Franchise UMKM dengan AI.', problem:'Franchise UMKM kesulitan mengelola operasional digital.', tags:['HTML','CSS','JS'], filter:'web', link:'https://github.com/elzidane/eazychise', demo:'https://eazychise.vercel.app', icon:'fa-code', image:null }
];

function esc(str) { if(!str)return''; return str.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }
function renderProjects(filter='all') {
  const list = filter==='all'?projectsData:projectsData.filter(p=>p.filter===filter);
  if(list.length===0){ projectsGrid.innerHTML=`<div class="empty-grid"><p>Tidak ada project untuk kategori ini.</p></div>`; return; }
  projectsGrid.innerHTML = list.map(p=>`
    <div class="project-card reveal">
      <div class="project-thumb">${p.image?`<img src="${p.image}" alt="${p.name}" loading="lazy">`:`<i class="fas ${p.icon} thumb-fallback"></i>`}</div>
      <div class="project-info">
        <h3>${esc(p.name)}</h3>
        <p class="p-problem">${esc(p.problem||p.desc)}</p>
        <div class="tech-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="${p.link}" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
          ${p.demo?`<a href="${p.demo}" target="_blank" rel="noopener"><i class="fas fa-globe"></i> Live Demo</a>`:''}
        </div>
      </div>
    </div>
  `).join('');
  activateReveal();
}
filterBtns.forEach(btn=>{btn.addEventListener('click',()=>{filterBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderProjects(btn.dataset.filter);});});
renderProjects();

/* ═══════════════════════════════════════════════════
   12. CERTIFICATES
   ═══════════════════════════════════════════════════ */
const certsData = [
  { name:'Pelatihan AI Engineering For Millenial', org:'Kemenkomdigi', year:'2026', img:'images/SERTIFIKAT AI .jpg' },
  { name:'Dasar Pemrograman Web Developer', org:'Dicoding', year:'2026', img:'images/Sertifikat Kompetensi - Dicoding Indonesia_page-0001.jpg' },
  { name:'Intermediate Assistant Web Developer DEX Jatim',org:'Kemenkomdigi', year:'2026', img:'images/Sertifikat_AVIS ZOLA RADITYA KURNIAWAN_Intermediate Assistant Web Developer - DEX - Jawa Timur (1)_page-0001.jpg' },
  { name:'Front End Web Development', org:'Dicoding', year:'2026', img:'images/Sertifikat Kompetensi - Dicoding Indonesia (1)_page-0001.jpg' },
];
let certModalData=[], currentCertIdx=0, certModalEl=null;

function renderCerts(year='all') {
  const list=year==='all'?certsData:certsData.filter(c=>c.year===year);
  if(list.length===0){ certGrid.innerHTML=`<div class="empty-grid"><p>Tidak ada sertifikat.</p></div>`; certModalData=[]; return; }
  certGrid.innerHTML=list.map(c=>`
    <div class="cert-card reveal" data-img="${esc(c.img)}" data-name="${esc(c.name)}" data-org="${esc(c.org)}" data-year="${esc(c.year)}" tabindex="0" role="button" aria-label="Lihat ${esc(c.name)}">
      <div class="cert-thumb"><img src="${esc(c.img)}" alt="${esc(c.name)}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Certificate'"><span class="cert-badge">${c.year}</span></div>
      <div class="cert-body"><h4>${esc(c.name)}</h4><p>${esc(c.org)}</p></div>
    </div>
  `).join('');
  certModalData=list.map(c=>({...c}));
  document.querySelectorAll('.cert-card').forEach((card,i)=>{card.addEventListener('click',()=>openCertModal(i));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCertModal(i);}});});
  activateReveal();
}
certFilters.forEach(btn=>{btn.addEventListener('click',()=>{certFilters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderCerts(btn.dataset.certYear);});});
renderCerts();

/* ── CERT MODAL ─────────────────────────────────── */
function openCertModal(idx){currentCertIdx=idx;const root=document.getElementById('certModalRoot');root.innerHTML='';certModalEl=document.createElement('div');certModalEl.className='cert-modal-overlay';certModalEl.setAttribute('role','dialog');certModalEl.setAttribute('aria-modal','true');certModalEl.innerHTML=`<div class="cert-modal"><div class="cert-modal-header"><h3 id="certModalTitle"></h3><button class="close-modal" aria-label="Tutup">&times;</button></div><div class="cert-modal-body" id="certModalBody"><button class="modal-nav prev" aria-label="Sebelumnya"><i class="fas fa-chevron-left"></i></button><button class="modal-nav next" aria-label="Berikutnya"><i class="fas fa-chevron-right"></i></button></div><div class="cert-modal-footer"><div class="modal-meta"><strong id="certModalOrg"></strong><span id="certModalYear"></span></div><div class="modal-dots" id="certModalDots"></div></div></div>`;root.appendChild(certModalEl);body.style.overflow='hidden';buildDots();setModalContent(currentCertIdx);requestAnimationFrame(()=>certModalEl.classList.add('active'));certModalEl.querySelector('.close-modal').addEventListener('click',closeCertModal);certModalEl.addEventListener('click',e=>{if(e.target===certModalEl)closeCertModal();});certModalEl.querySelector('.modal-nav.prev').addEventListener('click',()=>certGo(-1));certModalEl.querySelector('.modal-nav.next').addEventListener('click',()=>certGo(1));document._certKeyHandler=e=>{if(e.key==='Escape')closeCertModal();if(e.key==='ArrowLeft')certGo(-1);if(e.key==='ArrowRight')certGo(1);};document.addEventListener('keydown',document._certKeyHandler);}
function closeCertModal(){if(!certModalEl)return;certModalEl.classList.remove('active');body.style.overflow='';document.removeEventListener('keydown',document._certKeyHandler);setTimeout(()=>{certModalEl?.remove();certModalEl=null;},350);}
function buildDots(){const c=document.getElementById('certModalDots');if(!c)return;c.innerHTML=certModalData.map((_,i)=>`<span class="m-dot${i===currentCertIdx?' active':''}" data-i="${i}"></span>`).join('');c.querySelectorAll('.m-dot').forEach(dot=>{dot.addEventListener('click',()=>{const i=+dot.dataset.i;if(i!==currentCertIdx){currentCertIdx=i;setModalContent(i);buildDots();}});});}
function setModalContent(idx){const d=certModalData[idx];if(!d)return;document.getElementById('certModalTitle').textContent=d.name;document.getElementById('certModalOrg').textContent=d.org;document.getElementById('certModalYear').textContent=d.year;document.querySelectorAll('.m-dot').forEach((d,i)=>d.classList.toggle('active',i===idx));const be=document.getElementById('certModalBody'),pr=be.querySelector('.modal-nav.prev'),nx=be.querySelector('.modal-nav.next'),old=be.querySelector('img');if(old)old.remove();const img=document.createElement('img');img.alt=d.name;img.loading='lazy';img.src=d.img||'';img.onerror=()=>{img.src='https://via.placeholder.com/600x400?text=Sertifikat';};be.insertBefore(img,pr);}
function certGo(dir){const t=certModalData.length,n=(currentCertIdx+dir+t)%t;if(n===currentCertIdx)return;currentCertIdx=n;setModalContent(currentCertIdx);buildDots();}

/* ═══════════════════════════════════════════════════
   13. SCROLL REVEAL
   ═══════════════════════════════════════════════════ */
function activateReveal() {
  const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const p=entry.target.closest('.projects-grid,.cert-grid,.workflow-grid,.gh-grid,.princ-ext-grid,.now-grid,.dash-grid');const d=p?Array.from(p.children).indexOf(entry.target)*80:0;setTimeout(()=>entry.target.classList.add('active'),d);obs.unobserve(entry.target);}});},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}
activateReveal();

/* ═══════════════════════════════════════════════════
   14. CONTACT FORM
   ═══════════════════════════════════════════════════ */
const contactForm=document.getElementById('contactForm');
if(contactForm){contactForm.addEventListener('submit',async(e)=>{e.preventDefault();const btn=contactForm.querySelector('.btn-submit'),txt=btn.querySelector('span'),ico=btn.querySelector('i');btn.disabled=true;txt.textContent='Mengirim...';setTimeout(()=>{btn.classList.add('success');ico.className='fas fa-check';txt.textContent='Terkirim!';contactForm.reset();setTimeout(()=>{btn.classList.remove('success');btn.disabled=false;ico.className='fas fa-paper-plane';txt.textContent='Kirim Pesan';},3000);},800);});}

/* ═══════════════════════════════════════════════════
   15. FOOTER YEAR
   ═══════════════════════════════════════════════════ */
const yearEl=document.getElementById('currentYear');
if(yearEl)yearEl.textContent=new Date().getFullYear();
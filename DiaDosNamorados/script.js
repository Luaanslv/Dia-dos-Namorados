const pContainer = document.getElementById('particles');
const symbols = ['❤', '♥', '💕', '✦', '✿'];

function createParticle() {
  const p = document.createElement('div');
  p.className = 'heart-particle';
  p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.color = `hsl(${340 + Math.random()*30}, 70%, ${60 + Math.random()*20}%)`;
  const dur = 8 + Math.random() * 12;
  p.style.animationDuration = dur + 's';
  p.style.animationDelay = Math.random() * -dur + 's';
  p.style.fontSize = (8 + Math.random() * 10) + 'px';
  pContainer.appendChild(p);
  setTimeout(() => p.remove(), dur * 1000 + 2000);
}

setInterval(createParticle, 700);
for (let i = 0; i < 15; i++) createParticle();

// ─── MUSIC
let playing = false;
const audio = document.getElementById('bgMusic');
const btn = document.getElementById('musicToggle');
const waves = document.querySelectorAll('.wave-bar');

function toggleMusic() {
  if (playing) {
    audio.pause();
    btn.textContent = '▶';
    waves.forEach(w => w.classList.add('paused'));
  } else {
    audio.play().catch(() => {});
    btn.textContent = '⏸';
    waves.forEach(w => w.classList.remove('paused'));
  }
  playing = !playing;
}

// ─── LIGHTBOX
function openLightbox(el) {
  const img = el.querySelector('img');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

// ─── TIMELINE SCROLL REVEAL
const tlItems = document.querySelectorAll('[data-tl]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.2 });
tlItems.forEach(i => observer.observe(i));

// ─── NAV DOTS
const sections = [0,1,2,3,4].map(i => document.getElementById('sec'+i));
const dots = document.querySelectorAll('.nav-dot');

function scrollToSection(i) {
  sections[i].scrollIntoView({ behavior: 'smooth' });
}

const secObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = sections.indexOf(e.target);
      dots.forEach((d,i) => d.classList.toggle('active', i === idx));
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => s && secObserver.observe(s));
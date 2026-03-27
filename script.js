// ── Typed.js ──
var typed = new Typed('#element', {
  strings: ['Web Developer', 'Part Time Editor', 'Content Creator', 'Explorer...'],
  typeSpeed: 70,
  backSpeed: 40,
  loop: true,
});

// ── Slider ──
const prevBtn     = document.querySelector('.prev');
const nextBtn     = document.querySelector('.next');
const imgCont     = document.querySelector('.img-container');
const imgs        = document.querySelectorAll('.pr-img');
const dots        = document.querySelectorAll('.dot');

let curr    = 0;
let autoplay;       // single variable — always setInterval, never setTimeout

function goTo(index) {
  // Safe wrapping in both directions
  curr = (index + imgs.length) % imgs.length;
  imgCont.style.transform = `translateX(${-curr * 100}%)`;

  // Update dots
  dots.forEach((d, i) => d.classList.toggle('active', i === curr));
}

function startAuto() {
  clearInterval(autoplay);                          // FIX: was clearTimeout on an interval ID
  autoplay = setInterval(() => goTo(curr + 1), 3000); // FIX: setInterval, not recursive setTimeout
}

// Button listeners — restart autoplay on manual interaction
nextBtn.addEventListener('click', () => { goTo(curr + 1); startAuto(); });
prevBtn.addEventListener('click', () => { goTo(curr - 1); startAuto(); });

// Dot listeners
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goTo(Number(dot.dataset.i));
    startAuto();
  });
});

// Init
goTo(0);
startAuto();
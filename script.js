// ===== 23 sentences =====
const sentences = [
  "ممنون که صبوری",
  "ممنون که مهربونی",
  "ممنون که تلاش می‌کنی",
  "ممنون که بخشنده‌ای",
  "ممنون که انقد خوب نقاشی می‌کنی",
  "ممنون که انتقاد پذیری",
  "ممنون که ویژگی‌های خوب آدم‌ها رو می‌بینی",
  "ممنون که صداقت داری",
  "ممنون که غر غرو نیستی",
  "ممنون زندگی اطرافیانت رو خوشگل و رنگی می‌کنی",
  "ممنون که شکست می‌خوری ولی بازم پا می‌شی",
  "ممنون که به هیچ‌کسی حسودی نمی‌کنی",
  "ممنون که مرتبی و بوی خوب میدی",
  "ممنون که انقد خوب دلداری میدی",
  "ممنون که انقد روانشناس خوبی هستی",
  "ممنون که پرنده زرد رو تحمل می‌کنی",
  "ممنون که نیایش رو نمی‌کشی",
  "ممنون که برای سلامت روان خودت تلاش می‌کنی",
  "ممنون که باشگاه میری",
  "ممنون که حتی در روزهای سخت بازم امیدوار هستی",
  "ممنون که انقد عاقل و فهمیده هستی",
  "ممنون که لبخند می‌زنی و لبخند رو روی لب بقیه میاری",
  "ممنون که به دنیا اومدی"
];

// ===== Cloud positions: 10 for "2", 13 for "3" =====
// Coordinates are percentages inside the .clouds container (RTL-safe via explicit left).
// Because page is RTL, we use `right` percentage instead of `left`.


const cloudPositions = [
  // =========================
  // NUMBER 2 — 11 CLOUDS
  // =========================

  // Top rounded curve
  { r: 15, t: 12 },
  { r: 25, t: 8 },
  { r: 35, t: 11 },

  // Upper-right curve
  { r: 41, t: 19 },
  { r: 39, t: 28 },

  // Diagonal descending stroke
  { r: 34, t: 37 },
  { r: 28, t: 46 },
  { r: 22, t: 55 },
  { r: 16, t: 64 },

  // Bottom horizontal stroke
  { r: 14, t: 75 },
  { r: 28, t: 79 },


  // =========================
  // NUMBER 3 — 12 CLOUDS
  // =========================

  // Top rounded curve
  { r: 60, t: 10 },
  { r: 70, t: 8 },
  { r: 79, t: 13 },

  // Upper-right curve
  { r: 83, t: 22 },
  { r: 80, t: 31 },

  // Middle indentation
  { r: 72, t: 37 },
  { r: 64, t: 39 },

  // Lower-right curve
  { r: 73, t: 45 },
  { r: 81, t: 53 },
  { r: 82, t: 64 },

  // Bottom rounded curve
  { r: 74, t: 75 },
  { r: 62, t: 77 }
];


// ===== Build clouds =====
const cloudsContainer = document.getElementById('clouds');
const card = document.getElementById('card');
const cardText = document.getElementById('cardText');

const cloudSVG = `
<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.3));">
  <path fill="#ffffff" stroke="#b3d4ff" stroke-width="2"
    d="M25 55
       C 10 55, 5 45, 12 38
       C 6 30, 14 20, 24 22
       C 26 10, 44 8, 50 18
       C 58 8, 76 12, 76 24
       C 90 24, 96 36, 88 44
       C 96 52, 88 60, 76 58
       Z"/>
</svg>`;

let lastClick = 0;

cloudPositions.forEach((pos, i) => {
  const btn = document.createElement('button');
  btn.className = 'cloud';
  btn.setAttribute('aria-label', 'ابر ' + (i + 1));
  // RTL: position from the right
  btn.style.left = pos.r + '%';
  btn.style.top = pos.t + '%';
  btn.style.animationDelay = (i * 0.12) + 's';
  btn.innerHTML = cloudSVG;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    showCard(e.currentTarget, sentences[i]);
    btn.classList.add('clicked');
  });

  cloudsContainer.appendChild(btn);
});

// ===== Show floating card near cloud =====
function showCard(cloudEl, text) {
  const rect = cloudEl.getBoundingClientRect();

  // Position card above the cloud, but flip below if near top
  let x = rect.left + rect.width / 2;
  let y = rect.top - 20;
  const flipDown = rect.top < 130;
  if (flipDown) y = rect.bottom + 90;

  // Clamp x so card stays on screen
  const cardHalf = 180;
  x = Math.max(cardHalf, Math.min(window.innerWidth - cardHalf, x));

  card.style.left = x + 'px';
  card.style.top  = y + 'px';
  cardText.textContent = text;
  card.classList.add('show');

  clearTimeout(lastClick);
  lastClick = setTimeout(() => card.classList.remove('show'), 5000);
}

// Hide card on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.cloud') && !e.target.closest('.card')) {
    card.classList.remove('show');
  }
});

// ===== Intro + music =====
const intro = document.getElementById('intro');
const scene = document.getElementById('scene');
const startBtn = document.getElementById('startBtn');
const bgm = document.getElementById('bgm');

startBtn.addEventListener('click', () => {
  bgm.volume = 0.35;
  bgm.play().catch(() => {}); // ignore autoplay rejection
  intro.classList.add('hidden');
  scene.classList.remove('hidden');
});

const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');

// Templates - using picsum + placeholder meme images (works offline via canvas drawing fallback)
const TEMPLATES = [
  { id: 'drake', name: 'Drake Hotline', img: 'https://i.imgflip.com/30b1gx.jpg', top: 'OLD WAY', bottom: 'NEW WAY' },
  { id: 'distracted', name: 'Distracted BF', img: 'https://i.imgflip.com/1ur9b0.jpg', top: 'ME', bottom: 'NEW MEME' },
  { id: 'twobuttons', name: 'Two Buttons', img: 'https://i.imgflip.com/1g8my4.jpg', top: 'BUTTON 1', bottom: 'BUTTON 2' },
  { id: 'doge', name: 'Doge', img: 'https://i.imgflip.com/4t0m5.jpg', top: 'SUCH WOW', bottom: 'MUCH MEME' },
  { id: 'disaster', name: 'Disaster Girl', img: 'https://i.imgflip.com/23ls.jpg', top: 'EVERYTHING FINE', bottom: 'IT IS BURNING' },
  { id: 'change', name: 'Change My Mind', img: 'https://i.imgflip.com/24y43o.jpg', top: 'CHANGE MY MIND', bottom: '' },
  { id: 'batman', name: 'Batman Slap', img: 'https://i.imgflip.com/9ehk.jpg', top: 'YOU SAID', bottom: 'WHAT?' },
  { id: 'surprised', name: 'Surprised Pikachu', img: 'https://i.imgflip.com/2kbn1e.jpg', top: 'WHEN YOU REALIZE', bottom: 'IT WAS YOU' },
  { id: 'philosoraptor', name: 'Philosoraptor', img: 'https://i.imgflip.com/1bhm.jpg', top: 'IF WE ARE', bottom: 'WHY ARE WE?' },
  { id: 'grumpy', name: 'Grumpy Cat', img: 'https://i.imgflip.com/8p0a.jpg', top: 'I HAD FUN', bottom: 'ONCE' },
  { id: 'success', name: 'Success Kid', img: 'https://i.imgflip.com/1bhk.jpg', top: 'STUDIED ALL NIGHT', bottom: 'PASSED EXAM' },
  { id: 'xall', name: 'X All The Y', img: 'https://i.imgflip.com/1ihzfe.jpg', top: 'MEMES', bottom: 'EVERYWHERE' },
];

const TRENDING = [
  { title: 'Monday Mood', top: 'MONDAY MORNING', bottom: 'ME: 5 MORE MINUTES' },
  { title: 'Coding Life', top: 'CODE WORKS', bottom: 'DON\'T KNOW WHY' },
  { title: 'Exam Season', top: 'STUDIED 1 CHAPTER', bottom: 'EXAM ME SAB KUCH' },
  { title: 'Indian Parents', top: 'SHARMA JI KA BETA', bottom: 'VS ME' },
  { title: 'WiFi Down', top: 'WIFI GONE', bottom: 'STONE AGE AGAIN' },
];

let currentImage = null;
let currentTemplate = TEMPLATES[0];
let textStyle = 'classic';
let extraTexts = []; // { text, x, y, size, color }
let dragging = null;
let history = JSON.parse(localStorage.getItem('meme_history')) || [];

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function renderTemplates(filter = '') {
  const container = document.getElementById('templates');
  const list = TEMPLATES.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()));
  container.innerHTML = list.map(t => `
    <button class="template ${t.id === currentTemplate.id ? 'active' : ''}" data-id="${t.id}">
      <img src="${t.img}" alt="${t.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${t.id}/200/120'" />
      <span>${t.name}</span>
    </button>
  `).join('');
  container.querySelectorAll('.template').forEach(b => b.addEventListener('click', () => {
    const tpl = TEMPLATES.find(x => x.id === b.dataset.id);
    selectTemplate(tpl);
  }));
}

function selectTemplate(tpl) {
  currentTemplate = tpl;
  document.getElementById('topText').value = tpl.top;
  document.getElementById('bottomText').value = tpl.bottom;
  extraTexts = [];
  loadImage(tpl.img);
  renderTemplates(document.getElementById('searchInput').value);
  showToast(`Template: ${tpl.name}`);
}

function loadImage(src) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => { currentImage = img; drawMeme(); };
  img.onerror = () => {
    // Fallback: generate gradient placeholder with template name
    const fallback = new Image();
    fallback.onload = () => { currentImage = fallback; drawMeme(); };
    fallback.src = `https://picsum.photos/seed/${currentTemplate.id}/600/600`;
  };
  img.src = src;
}

function getSettings() {
  return {
    top: document.getElementById('topText').value,
    bottom: document.getElementById('bottomText').value,
    font: document.getElementById('fontSelect').value,
    size: parseInt(document.getElementById('fontSize').value),
    color: document.getElementById('textColor').value,
    outline: document.getElementById('outlineColor').value,
    outlineSize: parseInt(document.getElementById('outlineSize').value),
    caps: document.getElementById('allCapsCheck').checked,
    shadow: document.getElementById('shadowCheck').checked,
  };
}

function wrapText(text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function drawTextBlock(text, x, y, align = 'center', baseline = 'top') {
  if (!text.trim()) return;
  const s = getSettings();
  const display = s.caps ? text.toUpperCase() : text;
  ctx.font = `900 ${s.size}px ${s.font}, Impact, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  const lines = wrapText(display, canvas.width - 40);
  const lineHeight = s.size * 1.1;
  lines.forEach((line, i) => {
    const ly = y + i * lineHeight;
    if (s.shadow) {
      ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 6; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2;
    } else ctx.shadowColor = 'transparent';
    // Outline
    if (s.outlineSize > 0) {
      ctx.lineWidth = s.outlineSize;
      ctx.strokeStyle = s.outline;
      ctx.lineJoin = 'round';
      ctx.strokeText(line, x, ly);
    }
    ctx.fillStyle = s.color;
    ctx.fillText(line, x, ly);
  });
  ctx.shadowColor = 'transparent';
}

function drawMeme() {
  // Background
  ctx.fillStyle = '#111'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (currentImage) {
    // Cover fit
    const scale = Math.max(canvas.width / currentImage.width, canvas.height / currentImage.height);
    const w = currentImage.width * scale, h = currentImage.height * scale;
    const x = (canvas.width - w) / 2, y = (canvas.height - h) / 2;
    ctx.drawImage(currentImage, x, y, w, h);
  }
  const s = getSettings();
  if (textStyle === 'caption') {
    // Top + Bottom white bars
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, 90);
    ctx.fillRect(0, canvas.height - 90, canvas.width, 90);
    ctx.fillStyle = '#111';
    ctx.font = `700 ${Math.min(32, s.size)}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(s.caps ? s.top.toUpperCase() : s.top, canvas.width / 2, 35);
    ctx.fillText(s.caps ? s.bottom.toUpperCase() : s.bottom, canvas.width / 2, canvas.height - 55);
  } else if (textStyle === 'top-bottom') {
    drawTextBlock(s.top, canvas.width / 2, 10, 'center', 'top');
    // Bottom text: need to measure lines to place above bottom
    const lines = wrapText(s.caps ? s.bottom.toUpperCase() : s.bottom, canvas.width - 40);
    const totalH = lines.length * s.size * 1.1;
    drawTextBlock(s.bottom, canvas.width / 2, canvas.height - totalH - 10, 'center', 'top');
  } else if (textStyle !== 'none') {
    drawTextBlock(s.top, canvas.width / 2, 10, 'center', 'top');
    const lines = wrapText(s.caps ? s.bottom.toUpperCase() : s.bottom, canvas.width - 40);
    const totalH = lines.length * s.size * 1.1;
    drawTextBlock(s.bottom, canvas.width / 2, canvas.height - totalH - 10, 'center', 'top');
  }
  // Extra draggable texts
  extraTexts.forEach(t => {
    ctx.font = `900 ${t.size}px ${s.font}, Impact, sans-serif`;
    ctx.textAlign = 'center';
    if (s.outlineSize > 0) { ctx.lineWidth = s.outlineSize; ctx.strokeStyle = s.outline; ctx.strokeText(t.text, t.x, t.y); }
    ctx.fillStyle = t.color || s.color;
    ctx.fillText(t.text, t.x, t.y);
  });
}

function saveToHistory() {
  const dataUrl = canvas.toDataURL('image/png');
  history.unshift(dataUrl);
  if (history.length > 8) history.pop();
  localStorage.setItem('meme_history', JSON.stringify(history));
  renderHistory();
}
function renderHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = history.length
    ? history.map((url, i) => `<img src="${url}" class="history-thumb" data-idx="${i}" />`).join('')
    : '<p style="font-size:12px;color:#888">No memes yet</p>';
  list.querySelectorAll('.history-thumb').forEach(img => img.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = history[parseInt(img.dataset.idx)]; link.download = 'meme.png'; link.click();
  }));
}

function renderTrending() {
  document.getElementById('trendingList').innerHTML = TRENDING.map((t, i) => `
    <div class="trending-item" data-idx="${i}"><b>${t.title}</b>${t.top} / ${t.bottom}</div>
  `).join('');
  document.querySelectorAll('.trending-item').forEach(el => el.addEventListener('click', () => {
    const t = TRENDING[parseInt(el.dataset.idx)];
    document.getElementById('topText').value = t.top;
    document.getElementById('bottomText').value = t.bottom;
    drawMeme();
    showToast('Caption applied: ' + t.title);
  }));
}

// Drag logic for extra texts + top/bottom (approx)
function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  return { x, y };
}
canvas.addEventListener('mousedown', (e) => {
  const { x, y } = getCanvasPos(e);
  // Check extra texts first (reverse order)
  for (let i = extraTexts.length - 1; i >= 0; i--) {
    const t = extraTexts[i];
    if (Math.abs(x - t.x) < 120 && Math.abs(y - t.y) < 30) { dragging = t; return; }
  }
});
canvas.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  const { x, y } = getCanvasPos(e);
  dragging.x = x; dragging.y = y;
  drawMeme();
});
canvas.addEventListener('mouseup', () => dragging = null);
canvas.addEventListener('mouseleave', () => dragging = null);

// Touch drag
canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const { x, y } = getCanvasPos(touch);
  for (let i = extraTexts.length - 1; i >= 0; i--) {
    const t = extraTexts[i];
    if (Math.abs(x - t.x) < 120 && Math.abs(y - t.y) < 30) { dragging = t; return; }
  }
}, { passive: true });
canvas.addEventListener('touchmove', (e) => {
  if (!dragging) return;
  e.preventDefault();
  const { x, y } = getCanvasPos(e.touches[0]);
  dragging.x = x; dragging.y = y; drawMeme();
}, { passive: false });
canvas.addEventListener('touchend', () => dragging = null);

// --- CONTROLS ---
['topText','bottomText','extraText'].forEach(id => document.getElementById(id).addEventListener('input', drawMeme));
document.getElementById('fontSelect').addEventListener('change', drawMeme);
document.getElementById('fontSize').addEventListener('input', (e) => { document.getElementById('sizeVal').textContent = e.target.value + 'px'; drawMeme(); });
document.getElementById('textColor').addEventListener('input', drawMeme);
document.getElementById('outlineColor').addEventListener('input', drawMeme);
document.getElementById('outlineSize').addEventListener('input', (e) => { document.getElementById('outlineVal').textContent = e.target.value + 'px'; drawMeme(); });
document.getElementById('allCapsCheck').addEventListener('change', drawMeme);
document.getElementById('shadowCheck').addEventListener('change', drawMeme);
document.querySelectorAll('.style-btn').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.style-btn').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  textStyle = b.dataset.style;
  drawMeme();
  showToast('Style: ' + b.textContent);
}));
document.getElementById('addTextBtn').addEventListener('click', () => {
  const text = document.getElementById('extraText').value.trim();
  if (!text) return showToast('Pehle extra text likho!');
  const s = getSettings();
  extraTexts.push({ text: s.caps ? text.toUpperCase() : text, x: canvas.width / 2, y: canvas.height / 2, size: s.size, color: s.color });
  document.getElementById('extraText').value = '';
  drawMeme();
  showToast('Text box added - drag to move!');
});
document.getElementById('searchInput').addEventListener('input', (e) => renderTemplates(e.target.value));
document.getElementById('uploadInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    loadImage(ev.target.result);
    currentTemplate = { id: 'custom', name: 'Custom' };
    showToast('Your image uploaded! 📤');
  };
  reader.readAsDataURL(file);
});
document.getElementById('randomBtn').addEventListener('click', () => {
  const tpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  selectTemplate(tpl);
  // Random caption
  const randomTop = ['WHEN YOU', 'ME AFTER', 'NO ONE:', 'EVERYONE:', 'MY MOM:'][Math.floor(Math.random() * 5)];
  const randomBottom = ['DOES THIS', 'REALIZES TRUTH', 'CHAI PE LO', 'EXAM CANCELLED', 'WIFI IS BACK'][Math.floor(Math.random() * 5)];
  document.getElementById('topText').value = randomTop;
  document.getElementById('bottomText').value = randomBottom;
  drawMeme();
});
document.getElementById('downloadBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'meme-' + Date.now() + '.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  saveToHistory();
  showToast('Meme Downloaded! 😂');
});
document.getElementById('copyBtn').addEventListener('click', async () => {
  try {
    const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    showToast('Copied! Paste in WhatsApp 📋');
  } catch { showToast('Copy not supported in this browser'); }
});
document.getElementById('shareBtn').addEventListener('click', async () => {
  const dataUrl = canvas.toDataURL('image/png');
  if (navigator.share) {
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'meme.png', { type: 'image/png' });
      await navigator.share({ title: 'My Meme', text: 'Check my meme! 😂', files: [file] });
    } catch { showToast('Share cancelled'); }
  } else {
    navigator.clipboard?.writeText('Check my meme! Made with Day-85 Meme Generator');
    showToast('Link copied! Share karo 📤');
  }
});
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('topText').value = 'WHEN YOU SAY';
  document.getElementById('bottomText').value = 'I WILL DO IT TOMORROW';
  extraTexts = [];
  drawMeme();
  showToast('Reset done 🔄');
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const dark = document.body.classList.toggle('dark');
  this.textContent = dark ? '☀️ Light' : '🌙 Dark';
});

// Init
renderTemplates();
renderTrending();
renderHistory();
selectTemplate(TEMPLATES[0]);
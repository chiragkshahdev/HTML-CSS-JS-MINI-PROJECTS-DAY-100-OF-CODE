const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const wrap = document.getElementById('canvasWrap');

let currentTool = 'pen';
let currentColor = '#000000';
let brushSize = 5;
let isDrawing = false;
let startX = 0, startY = 0;
let lastX = 0, lastY = 0;
let snapshot = null; // For shapes (preview)
let bgColor = '#ffffff';
let bgType = 'solid';
let zoom = 1;
let strokes = 0;

// Undo / Redo Stack - stores ImageData / DataURL
let undoStack = [];
let redoStack = [];

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

function saveState() {
  // Limit stack to 50
  undoStack.push(canvas.toDataURL());
  if (undoStack.length > 50) undoStack.shift();
  redoStack = [];
  updateCounts();
}

function restoreFromDataURL(url) {
  const img = new Image();
  img.onload = () => {
    // Clear + draw bg + image
    drawBackground();
    ctx.drawImage(img, 0, 0);
  };
  img.src = url;
}

function updateCounts() {
  document.getElementById('strokeCount').textContent = strokes;
  document.getElementById('undoCount').textContent = undoStack.length;
}

function drawBackground() {
  ctx.fillStyle = bgType === 'solid' ? bgColor : '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (bgType === 'grid') drawGrid();
  else if (bgType === 'dots') drawDots();
  else if (bgType === 'lines') drawLines();
}

function drawGrid() {
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 25) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
  for (let y = 0; y < canvas.height; y += 25) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
}
function drawDots() {
  ctx.fillStyle = '#cbd5e1';
  for (let x = 15; x < canvas.width; x += 25) for (let y = 15; y < canvas.height; y += 25) { ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill(); }
}
function drawLines() {
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  for (let y = 30; y < canvas.height; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
}

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  // Account for zoom via CSS scaling - canvas.width is fixed, rect scales
  const x = (clientX - rect.left) * (canvas.width / rect.width);
  const y = (clientY - rect.top) * (canvas.height / rect.height);
  return { x, y };
}

function applyToolSettings() {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;
  if (currentTool === 'marker') {
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = brushSize * 2;
  } else if (currentTool === 'eraser') {
    ctx.globalAlpha = 1;
    ctx.strokeStyle = bgType === 'solid' ? bgColor : '#ffffff';
    ctx.lineWidth = brushSize * 3;
  } else {
    ctx.globalAlpha = 1;
    ctx.lineWidth = brushSize;
  }
}

// --- DRAWING ---
function startDraw(e) {
  if (currentTool === 'text') return; // Text handled on dblclick
  if (currentTool === 'fill') {
    saveState();
    bgColor = currentColor;
    bgType = 'solid';
    drawBackground();
    // Redraw existing? Fill clears - need to restore? For simplicity fill is bg only, keep as new bg
    // Re-apply undo image on top would be better, but for now just fill
    showToast(`Background filled: ${currentColor} 🪣`);
    return;
  }
  isDrawing = true;
  const { x, y } = getPos(e);
  startX = x; startY = y; lastX = x; lastY = y;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  applyToolSettings();
  // Dot on click
  if (currentTool === 'pen' || currentTool === 'marker' || currentTool === 'eraser') {
    ctx.beginPath(); ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2); ctx.fill();
  }
  document.getElementById('canvasHint').style.opacity = '0';
}

function drawMove(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const { x, y } = getPos(e);
  applyToolSettings();
  if (['pen', 'marker', 'eraser'].includes(currentTool)) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x; lastY = y;
  } else {
    // Shapes: restore snapshot then draw preview
    ctx.putImageData(snapshot, 0, 0);
    drawShape(startX, startY, x, y);
  }
}

function drawShape(x1, y1, x2, y2) {
  ctx.beginPath();
  if (currentTool === 'line') {
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  } else if (currentTool === 'rect') {
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
  } else if (currentTool === 'circle') {
    const rx = Math.abs(x2 - x1) / 2, ry = Math.abs(y2 - y1) / 2;
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
  } else if (currentTool === 'arrow') {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    // Arrow head
    const headLen = 15;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }
}

function endDraw(e) {
  if (!isDrawing) return;
  isDrawing = false;
  if (['line','rect','circle','arrow'].includes(currentTool)) {
    const { x, y } = getPos(e);
    ctx.putImageData(snapshot, 0, 0);
    applyToolSettings();
    drawShape(startX, startY, x, y);
  }
  saveState();
  strokes++;
  updateCounts();
}

// Text Tool
function handleTextClick(e) {
  if (currentTool !== 'text') return;
  const { x, y } = getPos(e);
  const input = document.getElementById('textInput');
  input.classList.remove('hidden');
  // Position input near click (in canvas coords -> screen coords)
  const rect = canvas.getBoundingClientRect();
  const scaleX = rect.width / canvas.width;
  const scaleY = rect.height / canvas.height;
  input.style.left = (x * scaleX) + 'px';
  input.style.top = (y * scaleY) + 'px';
  input.dataset.x = x; input.dataset.y = y;
  input.focus();
  input.value = '';
}
document.getElementById('textInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = e.target;
    const text = input.value.trim();
    if (text) {
      saveState();
      ctx.font = `bold ${Math.max(16, brushSize * 3)}px Arial`;
      ctx.fillStyle = currentColor;
      ctx.fillText(text, parseFloat(input.dataset.x), parseFloat(input.dataset.y));
      strokes++; updateCounts();
    }
    input.classList.add('hidden');
  } else if (e.key === 'Escape') input.classList.add('hidden');
});

// Undo / Redo
function undo() {
  if (!undoStack.length) return showToast('Nothing to undo!');
  redoStack.push(canvas.toDataURL());
  const prev = undoStack.pop();
  restoreFromDataURL(prev);
  updateCounts();
}
function redo() {
  if (!redoStack.length) return showToast('Nothing to redo!');
  undoStack.push(canvas.toDataURL());
  const next = redoStack.pop();
  restoreFromDataURL(next);
  updateCounts();
}
function clearCanvas() {
  if (!confirm('Clear entire whiteboard?')) return;
  saveState();
  drawBackground();
  strokes = 0; updateCounts();
  showToast('Whiteboard cleared 🗑️');
}

// Sticky Notes
function addSticky(color) {
  const list = document.getElementById('stickyList');
  const div = document.createElement('div');
  div.className = 'sticky';
  div.style.background = color;
  div.innerHTML = `<button onclick="this.parentElement.remove()">✕</button><textarea placeholder="Type note..."></textarea>`;
  list.appendChild(div);
  div.querySelector('textarea').focus();
  showToast('Sticky note added 📝');
}

// Zoom
function applyZoom() {
  canvas.style.width = (1000 * zoom) + 'px';
  canvas.style.height = (600 * zoom) + 'px';
  document.getElementById('zoomVal').textContent = Math.round(zoom * 100) + '%';
}

// --- EVENTS ---
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawMove);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mouseleave', endDraw);
canvas.addEventListener('touchstart', startDraw, { passive: false });
canvas.addEventListener('touchmove', drawMove, { passive: false });
canvas.addEventListener('touchend', endDraw);
canvas.addEventListener('dblclick', handleTextClick);

// Tools
document.querySelectorAll('.tool').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.tool').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  currentTool = b.dataset.tool;
  canvas.style.cursor = currentTool === 'eraser' ? 'cell' : currentTool === 'text' ? 'text' : 'crosshair';
  showToast('Tool: ' + b.textContent);
}));
document.querySelectorAll('.color').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.color').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  currentColor = b.dataset.color;
  document.getElementById('sizeDot').style.background = currentColor;
}));
document.getElementById('customColor').addEventListener('input', (e) => {
  currentColor = e.target.value;
  document.getElementById('sizeDot').style.background = currentColor;
});
document.getElementById('sizeRange').addEventListener('input', (e) => {
  brushSize = parseInt(e.target.value);
  document.getElementById('sizeVal').textContent = brushSize + 'px';
  const dot = document.getElementById('sizeDot');
  dot.style.width = Math.min(30, brushSize) + 'px';
  dot.style.height = Math.min(30, brushSize) + 'px';
});

// Background
document.querySelectorAll('.bg-opt').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.bg-opt').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const val = b.dataset.bg;
  // Save current drawing, change bg, restore drawing on top
  const currentImg = canvas.toDataURL();
  if (val === 'grid' || val === 'dots' || val === 'lines') {
    bgType = val; bgColor = '#ffffff';
  } else {
    bgType = 'solid'; bgColor = val;
  }
  // Redraw bg + old image
  const img = new Image();
  img.onload = () => { drawBackground(); ctx.drawImage(img, 0, 0); };
  img.src = currentImg;
  showToast('Background: ' + b.textContent);
}));

document.getElementById('undoBtn').addEventListener('click', undo);
document.getElementById('redoBtn').addEventListener('click', redo);
document.getElementById('clearBtn').addEventListener('click', clearCanvas);
document.getElementById('zoomInBtn').addEventListener('click', () => { zoom = Math.min(2, zoom + 0.1); applyZoom(); });
document.getElementById('zoomOutBtn').addEventListener('click', () => { zoom = Math.max(0.5, zoom - 0.1); applyZoom(); });
document.getElementById('fitBtn').addEventListener('click', () => { zoom = 1; applyZoom(); canvas.style.width = '100%'; canvas.style.height = 'auto'; });
document.getElementById('gridCheck').addEventListener('change', (e) => {
  // Toggle grid overlay by redrawing with grid
  if (e.target.checked) { bgType = 'grid'; } else { bgType = 'solid'; bgColor = '#ffffff'; }
  drawBackground();
});

// Sticky
document.querySelectorAll('.sticky-add').forEach(b => b.addEventListener('click', () => addSticky(b.dataset.color)));

// Save / Load
document.getElementById('savePngBtn').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'whiteboard-' + Date.now() + '.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('PNG Downloaded 📸');
});
document.getElementById('saveJsonBtn').addEventListener('click', () => {
  const data = { image: canvas.toDataURL(), bg: bgColor, bgType, strokes, date: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'whiteboard-project.json';
  link.click();
  showToast('Project Saved 💾');
});
document.getElementById('loadBtn').addEventListener('click', () => document.getElementById('fileInput').click());
document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      restoreFromDataURL(data.image);
      bgColor = data.bg || '#ffffff'; bgType = data.bgType || 'solid';
      showToast('Project Loaded 📂');
    } catch { showToast('Invalid file!'); }
  };
  reader.readAsText(file);
});
document.getElementById('copyBtn').addEventListener('click', async () => {
  try {
    const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    showToast('Image Copied! Paste anywhere 📋');
  } catch { showToast('Copy not supported in this browser'); }
});

document.getElementById('themeBtn').addEventListener('click', function() {
  const dark = document.body.classList.toggle('dark');
  this.textContent = dark ? '☀️ Light' : '🌙 Dark';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); }
  else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); }
  else if (e.key.toLowerCase() === 'p') document.querySelector('[data-tool="pen"]').click();
  else if (e.key.toLowerCase() === 'e') document.querySelector('[data-tool="eraser"]').click();
  else if (e.key.toLowerCase() === 't') document.querySelector('[data-tool="text"]').click();
});

// Fake online count for fun
setInterval(() => {
  document.getElementById('userCount').textContent = `👥 ${1 + Math.floor(Math.random() * 3)} Online`;
}, 5000);

// Init
drawBackground();
saveState(); // Initial blank state
updateCounts();
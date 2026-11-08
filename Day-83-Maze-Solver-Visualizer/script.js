let size = 21;
let grid = []; // 0 = empty, 1 = wall
let start = { r: 1, c: 1 };
let end = { r: 19, c: 19 };
let algo = 'bfs';
let speed = 80; // 1-100, higher = faster (less delay)
let isSolving = false;
let isDragging = false;
let drawMode = 'wall';
let soundOn = true;
let visitedCount = 0;

const ALGO_DESC = {
  bfs: 'BFS: Shortest path, level-by-level explores (Queue)',
  dfs: 'DFS: Deep jata hai, pehle ek path try karta hai (Stack)',
  astar: 'A*: Heuristic + Cost, sabse fast & shortest (Priority Queue)',
  dijkstra: 'Dijkstra: Sabse kam cost wala path (Priority Queue, no heuristic)'
};

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
function beep(freq = 500) {
  if (!soundOn) return;
  try {
    const a = new (window.AudioContext || window.webkitAudioContext)();
    const o = a.createOscillator(); o.frequency.value = freq; o.connect(a.destination); o.start();
    setTimeout(() => o.stop(), 40);
  } catch(e) {}
}
function getDelay() {
  // Speed 1 = 100ms, 100 = 0ms
  return Math.max(0, (100 - speed) * 1.2);
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// --- MAZE GENERATION: Recursive Backtracker ---
function generateMaze() {
  if (isSolving) return;
  grid = Array.from({ length: size }, () => Array(size).fill(1)); // All walls
  const stack = [{ r: 1, c: 1 }];
  grid[1][1] = 0;
  const dirs = [[-2,0],[2,0],[0,-2],[0,2]];
  while (stack.length) {
    const cur = stack[stack.length - 1];
    const neighbors = [];
    for (const [dr, dc] of dirs) {
      const nr = cur.r + dr, nc = cur.c + dc;
      if (nr > 0 && nr < size - 1 && nc > 0 && nc < size - 1 && grid[nr][nc] === 1) {
        neighbors.push({ r: nr, c: nc, wallR: cur.r + dr/2, wallC: cur.c + dc/2 });
      }
    }
    if (!neighbors.length) { stack.pop(); continue; }
    const next = neighbors[Math.floor(Math.random() * neighbors.length)];
    grid[next.wallR][next.wallC] = 0;
    grid[next.r][next.c] = 0;
    stack.push({ r: next.r, c: next.c });
  }
  // Start / End
  start = { r: 1, c: 1 };
  end = { r: size - 2, c: size - 2 };
  grid[start.r][start.c] = 0;
  grid[end.r][end.c] = 0;
  // Ensure some extra openings for fun (remove 5% walls)
  for (let i = 0; i < size; i++) {
    const r = 1 + Math.floor(Math.random() * (size - 2));
    const c = 1 + Math.floor(Math.random() * (size - 2));
    if (Math.random() < 0.08) grid[r][c] = 0;
  }
  clearPathVisual();
  render();
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('statusBadge').textContent = 'Ready to Solve';
  document.getElementById('statusBadge').className = 'badge';
  document.getElementById('status').textContent = 'Ready';
  showToast('New Maze Generated! 🎲');
}

function render() {
  const container = document.getElementById('mazeGrid');
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.innerHTML = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const div = document.createElement('div');
      div.className = 'cell';
      div.dataset.r = r; div.dataset.c = c;
      if (grid[r][c] === 1) div.classList.add('wall');
      if (r === start.r && c === start.c) div.classList.add('start');
      if (r === end.r && c === end.c) div.classList.add('end');
      // Drag to draw
      div.addEventListener('mousedown', (e) => { e.preventDefault(); isDragging = true; paintCell(r, c); });
      div.addEventListener('mouseenter', () => { if (isDragging) paintCell(r, c); });
      div.addEventListener('click', () => paintCell(r, c));
      container.appendChild(div);
    }
  }
  document.getElementById('sizeTop').textContent = `${size}x${size}`;
}
document.addEventListener('mouseup', () => isDragging = false);

function paintCell(r, c) {
  if (isSolving) return;
  if (drawMode === 'wall') {
    if ((r === start.r && c === start.c) || (r === end.r && c === end.c)) return;
    grid[r][c] = 1;
  } else if (drawMode === 'erase') {
    grid[r][c] = 0;
  } else if (drawMode === 'start') {
    if (grid[r][c] === 1) return;
    start = { r, c };
  } else if (drawMode === 'end') {
    if (grid[r][c] === 1) return;
    end = { r, c };
  }
  clearPathVisual();
  render();
}

function clearPathVisual() {
  visitedCount = 0;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('visited', 'path', 'current', 'frontier');
  });
  document.getElementById('visited').textContent = '0';
  document.getElementById('pathLen').textContent = '0';
  document.getElementById('timeTaken').textContent = '0ms';
}

function getCellEl(r, c) {
  return document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
}
function isValid(r, c) {
  return r >= 0 && r < size && c >= 0 && c < size && grid[r][c] === 0;
}
function heuristic(a, b) {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c); // Manhattan
}
function getNeighbors(node) {
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  const res = [];
  for (const [dr, dc] of dirs) {
    const nr = node.r + dr, nc = node.c + dc;
    if (isValid(nr, nc)) res.push({ r: nr, c: nc });
  }
  return res;
}
function key(node) { return `${node.r},${node.c}`; }

// --- SOLVERS ---
async function solve() {
  if (isSolving) return;
  clearPathVisual();
  isSolving = true;
  document.getElementById('statusBadge').textContent = 'Solving...';
  document.getElementById('statusBadge').className = 'badge solving';
  document.getElementById('status').textContent = 'Solving...';
  const startTime = performance.now();
  let result = null;
  if (algo === 'bfs') result = await bfs();
  else if (algo === 'dfs') result = await dfs();
  else if (algo === 'astar') result = await astar();
  else if (algo === 'dijkstra') result = await dijkstra();
  const timeTaken = Math.round(performance.now() - startTime);
  document.getElementById('timeTaken').textContent = timeTaken + 'ms';
  isSolving = false;
  if (result) {
    document.getElementById('statusBadge').textContent = `Done! Path: ${result.length}`;
    document.getElementById('statusBadge').className = 'badge done';
    document.getElementById('status').textContent = 'Found ✅';
    document.getElementById('pathLen').textContent = result.length;
    beep(900);
    // Animate final path
    for (let i = 0; i < result.length; i++) {
      const node = result[i];
      if (key(node) === key(start) || key(node) === key(end)) continue;
      const el = getCellEl(node.r, node.c);
      el.classList.remove('visited');
      el.classList.add('path');
      await sleep(Math.max(5, getDelay() / 2));
    }
    showToast(`Path Found! Length: ${result.length} | Visited: ${visitedCount}`);
  } else {
    document.getElementById('statusBadge').textContent = 'No Path Found!';
    document.getElementById('statusBadge').className = 'badge fail';
    document.getElementById('status').textContent = 'No Path ❌';
    beep(200);
    showToast('No Path Found! Walls check karo');
  }
}

async function bfs() {
  const queue = [start];
  const visited = new Set([key(start)]);
  const parent = new Map();
  while (queue.length) {
    const cur = queue.shift();
    if (key(cur) === key(end)) return reconstruct(parent, cur);
    if (key(cur) !== key(start)) {
      const el = getCellEl(cur.r, cur.c);
      el.classList.add('visited');
      visitedCount++; document.getElementById('visited').textContent = visitedCount;
      await sleep(getDelay());
    }
    for (const nb of getNeighbors(cur)) {
      if (!visited.has(key(nb))) {
        visited.add(key(nb));
        parent.set(key(nb), cur);
        queue.push(nb);
      }
    }
  }
  return null;
}

async function dfs() {
  const stack = [start];
  const visited = new Set([key(start)]);
  const parent = new Map();
  while (stack.length) {
    const cur = stack.pop();
    if (key(cur) === key(end)) return reconstruct(parent, cur);
    if (key(cur) !== key(start)) {
      const el = getCellEl(cur.r, cur.c);
      el.classList.add('visited');
      visitedCount++; document.getElementById('visited').textContent = visitedCount;
      await sleep(getDelay());
    }
    for (const nb of getNeighbors(cur)) {
      if (!visited.has(key(nb))) {
        visited.add(key(nb));
        parent.set(key(nb), cur);
        stack.push(nb);
      }
    }
  }
  return null;
}

async function astar() {
  // Open set: array sorted by f = g + h
  const open = [{ ...start, g: 0, f: heuristic(start, end) }];
  const cameFrom = new Map();
  const gScore = new Map([[key(start), 0]]);
  const closed = new Set();
  while (open.length) {
    // Pick lowest f
    open.sort((a, b) => a.f - b.f);
    const cur = open.shift();
    if (key(cur) === key(end)) return reconstruct(cameFrom, cur);
    closed.add(key(cur));
    if (key(cur) !== key(start)) {
      const el = getCellEl(cur.r, cur.c);
      el.classList.add('visited');
      visitedCount++; document.getElementById('visited').textContent = visitedCount;
      await sleep(getDelay());
    }
    for (const nb of getNeighbors(cur)) {
      if (closed.has(key(nb))) continue;
      const tentativeG = gScore.get(key(cur)) + 1;
      if (!gScore.has(key(nb)) || tentativeG < gScore.get(key(nb))) {
        cameFrom.set(key(nb), cur);
        gScore.set(key(nb), tentativeG);
        const f = tentativeG + heuristic(nb, end);
        const existing = open.find(n => key(n) === key(nb));
        if (existing) existing.g = tentativeG, existing.f = f;
        else open.push({ ...nb, g: tentativeG, f });
      }
    }
  }
  return null;
}

async function dijkstra() {
  // Same as A* but f = g (no heuristic)
  const open = [{ ...start, g: 0 }];
  const cameFrom = new Map();
  const gScore = new Map([[key(start), 0]]);
  const closed = new Set();
  while (open.length) {
    open.sort((a, b) => a.g - b.g);
    const cur = open.shift();
    if (key(cur) === key(end)) return reconstruct(cameFrom, cur);
    closed.add(key(cur));
    if (key(cur) !== key(start)) {
      const el = getCellEl(cur.r, cur.c);
      el.classList.add('visited');
      visitedCount++; document.getElementById('visited').textContent = visitedCount;
      await sleep(getDelay());
    }
    for (const nb of getNeighbors(cur)) {
      if (closed.has(key(nb))) continue;
      const tentativeG = gScore.get(key(cur)) + 1;
      if (!gScore.has(key(nb)) || tentativeG < gScore.get(key(nb))) {
        cameFrom.set(key(nb), cur);
        gScore.set(key(nb), tentativeG);
        const existing = open.find(n => key(n) === key(nb));
        if (existing) existing.g = tentativeG;
        else open.push({ ...nb, g: tentativeG });
      }
    }
  }
  return null;
}

function reconstruct(parent, endNode) {
  const path = [];
  let cur = endNode;
  while (cur) {
    path.unshift(cur);
    cur = parent.get(key(cur));
  }
  return path;
}

// --- CONTROLS ---
document.querySelectorAll('.algo').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.algo').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  algo = b.dataset.algo;
  document.getElementById('algoDesc').textContent = ALGO_DESC[algo];
  document.getElementById('algoTop').textContent = b.textContent.trim();
  clearPathVisual();
  showToast('Algorithm: ' + b.textContent);
}));
document.querySelectorAll('.size').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.size').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  size = parseInt(b.dataset.size);
  generateMaze();
}));
document.querySelectorAll('.draw-mode').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.draw-mode').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  drawMode = b.dataset.mode;
  showToast('Draw Mode: ' + b.textContent);
}));
document.getElementById('speedRange').addEventListener('input', (e) => {
  speed = parseInt(e.target.value);
  document.getElementById('speedVal').textContent = speed < 30 ? 'Slow' : speed < 70 ? 'Medium' : 'Fast';
});
document.getElementById('solveBtn').addEventListener('click', solve);
document.getElementById('generateBtn').addEventListener('click', generateMaze);
document.getElementById('overlayBtn').addEventListener('click', generateMaze);
document.getElementById('clearPathBtn').addEventListener('click', () => {
  if (isSolving) return;
  clearPathVisual();
  document.getElementById('statusBadge').textContent = 'Ready to Solve';
  document.getElementById('statusBadge').className = 'badge';
  showToast('Path cleared 🧹');
});
document.getElementById('clearWallBtn').addEventListener('click', () => {
  if (isSolving) return;
  if (!confirm('Clear all walls?')) return;
  grid = Array.from({ length: size }, () => Array(size).fill(0));
  clearPathVisual(); render();
  showToast('All walls cleared!');
});
document.getElementById('soundBtn').addEventListener('click', function() {
  soundOn = !soundOn; this.textContent = soundOn ? '🔊 Sound: ON' : '🔇 Sound: OFF';
});
document.getElementById('themeBtn').addEventListener('click', function() {
  const dark = document.body.classList.toggle('dark');
  this.textContent = dark ? '☀️ Light' : '🌙 Dark';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') solve();
  if (e.key.toLowerCase() === 'g') generateMaze();
});

// Init
generateMaze();
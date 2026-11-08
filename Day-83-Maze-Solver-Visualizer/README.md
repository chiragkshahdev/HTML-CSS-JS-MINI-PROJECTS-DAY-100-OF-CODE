# Day-83 - Maze Solver Visualizer

Pathfinding visualizer - Generate maze, watch BFS/DFS/A*/Dijkstra solve it live.

## Features
- 🧩 Maze Generation - Recursive Backtracker (perfect maze)
- 🌊 4 Algorithms - BFS, DFS, A*, Dijkstra
- 🎨 Visualize - Visited (blue) + Final Path (yellow) animation
- ✏️ Draw Walls - Drag to draw/erase walls, move Start/End
- 📏 Stats - Visited count, Path length, Time taken
- ⚡ Speed Slider - Slow to Instant
- 📐 3 Sizes - 15x15, 21x21, 31x31
- 📊 Comparison Table - Which algorithm is best when
- 🔊 Sound Effects
- 🌙 Dark Mode

## Tech Stack
- HTML5 - Grid
- CSS3 - Maze cells, Animations
- Vanilla JavaScript - Graph Algorithms, Maze Generation

## File Structure
Day-83-Maze-Solver-Visualizer/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click Generate Maze
4. Pick Algorithm (try A* first)
5. Click Solve Maze - Watch it solve!

## Controls
| Action | How |
|--------|-----|
| Solve | Solve button / Enter |
| New Maze | Generate button / G |
| Draw Wall | Select Wall mode + Drag |
| Move Start/End | Select Start/End mode + Click |
| Clear Path | Clear Path button |

## Algorithm Logic
```js
// BFS: Queue (FIFO) - Level by level, guarantees shortest
// DFS: Stack (LIFO) - Deep first, fast but not shortest
// A*: Priority Queue by f = g + h
//    g = cost from start, h = Manhattan distance to end
//    Heuristic guides search toward target = fastest
// Dijkstra: Priority Queue by g only (no heuristic)
// Path Reconstruction: parent map se backtrack start -> end
// Maze Gen: Recursive Backtracker - Random DFS carving walls
# Day-77 - 2048 Game

Classic 2048 puzzle game with full game logic.

## Features
- 🔢 4x4 Grid - Real 2048 Logic
- ⌨️ Keyboard - Arrow Keys + WASD
- 👆 Swipe on Mobile + D-Pad Buttons
- 🔀 Slide & Merge Logic - Same numbers merge, score adds
- 🎲 Random Tile Spawn - 90% = 2, 10% = 4
- ↩️ Undo System - 3 Undo per game, History stack
- 🏆 Win at 2048 + Continue to 4096 option
- 💀 Lose Detection - No empty cell + No merge possible
- 🏆 Best Score + Top 5 Scores (localStorage)
- 🎨 Real 2048 Tile Colors - 2 to 2048+ gradient
- 🔊 Sound Effects
- 🌙 Dark Mode
- 📱 Fully Responsive

## Tech Stack
- HTML5 - Grid Layout
- CSS3 - 2048 Theme, Tile Colors, Animations
- Vanilla JavaScript - Slide/Merge Algorithm, Game State

## File Structure
Day-077-2048-Game-Logic/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Use Arrow Keys / Swipe to move tiles
4. Same numbers ko merge karo
5. 2048 banao!

## Controls
| Key | Action |
|-----|--------|
| ↑ ↓ ← → / W A S D | Move Tiles |
| Swipe / D-Pad | Mobile Move |
| U | Undo (3x) |
| R | Restart |

## Core Logic Explained
```js
// Slide & Merge - Heart of 2048
function slideAndMerge(row) {
  let arr = row.filter(v => v !== 0); // Remove zeros
  for (let i=0; i<arr.length-1; i++) {
    if (arr[i] === arr[i+1]) {
      arr[i] *= 2;       // Merge: 8+8=16
      gained += arr[i];  // Score += merged value
      arr.splice(i+1,1); // Remove merged tile
    }
  }
  while (arr.length < 4) arr.push(0); // Pad zeros
  return { newRow: arr, gained };
}
// Up/Down = Transpose column -> slide -> transpose back
// Lose = No empty cell AND no adjacent equal
# Day-80 - Wordle Clone

NYT Wordle-style word guessing game - 5 letters, 6 tries.

## Features
- 🔤 5-Letter Words + Hints - Category hint har word ke liye
- 🎯 6 Tries - Board with Flip Animation
- 🟩🟨⬛ Color Logic - Correct / Present / Absent
- ⌨️ On-Screen Keyboard + Physical Keyboard Support
- 💡 Hint System - 3 Hints per game, letter reveal
- 📊 Stats Modal - Played, Win %, Streak, Max Streak, Distribution
- 🏳️ Give Up Button - Word reveal
- 🔄 New Word - Random word every game
- 📤 Share Result - Clipboard copy
- 🔊 Sound Effects
- 🌙 Dark Mode
- 📱 Mobile Friendly - Touch Keyboard
- 💾 Stats saved in localStorage

## Tech Stack
- HTML5 - Board, Keyboard
- CSS3 - Wordle Theme (Green/Yellow/Grey), Flip Animation
- Vanilla JavaScript - Evaluate Logic, Keyboard, Stats

## File Structure
Day-080-Wordle-Clone/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Type 5-letter word -> Enter
4. Colors dekh ke next guess karo
5. 6 tries me word guess karo

## Color Guide
| Color | Meaning |
|-------|---------|
| 🟩 Green | Letter sahi hai + sahi jagah hai |
| 🟨 Yellow | Letter word me hai, par galat jagah |
| ⬛ Grey | Letter word me nahi hai |

## Logic Explained
```js
// Two-pass evaluation (handles duplicate letters correctly)
function evaluateGuess(guess) {
  // Pass 1: Mark CORRECT (exact position)
  // Pass 2: Mark PRESENT if letter exists in unused position
  // Else: ABSENT
}
// Example: Target APPLE, Guess PAPER
// P -> present, A -> present, P -> correct, E -> present, R -> absent
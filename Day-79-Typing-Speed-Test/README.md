# Day-79 - Typing Speed Test

MonkeyType-style typing test with WPM, Accuracy, live stats.

## Features
- ⌨️ Live Typing - Char-by-char correct (green) / wrong (red) highlight
- ⏱️ 4 Timers - 15s / 30s / 60s / 2 min
- 🎯 Live WPM + Accuracy + Progress Bar
- 📝 3 Modes - Words / Sentences / Code Snippets
- ⚡ 3 Difficulties - Easy / Medium / Hard (Word bank changes)
- ↩️ Backspace Support - Correct/Wrong count adjusts
- 🏆 Best WPM + Best Accuracy + Avg WPM + Total Tests
- 📊 Recent Results History (Last 10, localStorage)
- 🥇 Rank System - Beginner to Typing Master (80+ WPM)
- 📤 Share Result - Clipboard copy
- 🔊 Keypress Sound
- 🌙 Dark Mode
- 📱 Responsive

## Tech Stack
- HTML5 - Text Display, Stats
- CSS3 - Caret Animation, Highlight, Results
- Vanilla JavaScript - Typing Logic, WPM Formula

## File Structure
Day-79-Typing-Speed-Test/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Click on text box (auto-focus)
4. Type karo - timer pehle key se start hoga
5. Time khatam -> Results dekho

## Controls
| Key | Action |
|-----|--------|
| Any Letter / Space | Type |
| Backspace | Delete last char |
| Click Text | Focus |

## Logic Explained
```js
// WPM Formula (Standard)
WPM = (CorrectChars / 5) / Minutes
// 5 chars = 1 word (standard)
// Accuracy = Correct / (Correct + Wrong) * 100

// Example: 150 correct chars in 1 min
WPM = (150 / 5) / 1 = 30 WPM
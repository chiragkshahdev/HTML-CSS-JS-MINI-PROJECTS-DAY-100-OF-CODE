# Day-85 - Meme Generator

Create viral memes - templates, custom upload, drag text, download & share.

## Features
- 🖼️ 12 Templates - Drake, Distracted BF, Doge, Disaster Girl, Pikachu...
- 📤 Upload Own Image - Apni photo se meme banao
- ✏️ Top / Bottom / Extra Text - Unlimited extra text boxes
- 🖱️ Drag Text - Extra text ko drag karke kahin bhi rakho
- 🎨 Fonts - Impact (Classic), Arial Black, Comic Sans, Georgia
- 📏 Font Size 20-100px + Outline Size + Colors
- 🅰️ ALL CAPS Toggle + Shadow Toggle
- 🎭 4 Styles - Classic, Top/Bottom, Caption Bar, No Text
- 🔍 Search Templates
- 🔥 Trending Captions - 1-click apply (Indian + Global)
- 🎲 Random Meme Button
- 📸 Download PNG + 📋 Copy Image + 📤 Share (Web Share API)
- 🕒 Recent Memes History (localStorage)
- 🌙 Dark Mode
- 📱 Mobile Friendly - Touch drag

## Tech Stack
- HTML5 - Canvas API
- CSS3 - 3-Column Layout
- Vanilla JavaScript - Canvas Text Rendering, Drag, Wrap Text

## File Structure
Day-85-Meme-Generator/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Template select karo ya apni image upload karo
4. Top/Bottom text likho
5. Download / Copy / Share karo

## Controls
| Action | How |
|--------|-----|
| Edit Text | Top/Bottom inputs |
| Add Text Box | Extra text + Add button |
| Move Text | Drag extra text on canvas |
| Random | 🎲 Random Meme button |
| Download | 📸 Download Meme |

## Logic Explained
```js
// Text Wrapping: measureText() se line break
function wrapText(text, maxWidth) {
  // Words ko ek-ek karke add karo, width > maxWidth => new line
}
// Cover Fit: Image ko canvas pe bina stretch ke fill karo
const scale = Math.max(canvas.width/img.width, canvas.height/img.height)
// Outline: strokeText() + fillText() - classic meme look
// Drag: mousedown -> check if near text (120px), mousemove -> update x,y
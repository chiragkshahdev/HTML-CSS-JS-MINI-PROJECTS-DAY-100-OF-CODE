# Day-84 - Whiteboard Canvas Drawing

Excalidraw / MS Paint style whiteboard - draw, shapes, text, sticky notes, save.

## Features
- ✏️ 9 Tools - Pen, Marker, Eraser, Line, Rect, Circle, Arrow, Text, Fill
- 🎨 Colors - 9 Presets + Custom Color Picker
- 📏 Brush Size - 1px to 50px + Live Preview Dot
- ↩️ Undo / Redo - Ctrl+Z / Ctrl+Y, 50 steps stack
- 🖼️ Backgrounds - White, Yellow, Blackboard, Grid, Dots, Lines
- 📝 Sticky Notes - 4 Colors, Editable, Deletable
- 🔤 Text Tool - Double-click canvas, type, Enter
- 🔍 Zoom - 50% to 200%, Fit button
- 💾 Save - Download PNG, Save Project JSON, Load Project
- 📋 Copy Image - Clipboard API
- 🗑️ Clear Board
- 📱 Touch Support - Draw with finger / stylus
- 🌙 Dark Mode
- ⌨️ Shortcuts - P Pen, E Eraser, T Text, Ctrl+Z Undo

## Tech Stack
- HTML5 - Canvas API
- CSS3 - Toolbar, Sticky Notes, Responsive
- Vanilla JavaScript - Canvas Drawing, Undo Stack, File API

## File Structure
Day-84-Whiteboard-Canvas-Drawing/
├── index.html
├── style.css
├── script.js
└── README.md

## How to Run
1. Keep all 4 files in same folder
2. Open `index.html` in browser
3. Pen select karo, canvas pe drag karo
4. Shapes ke liye drag + release
5. Text ke liye Text tool -> Double-click
6. Save PNG se download karo

## Controls
| Key | Action |
|-----|--------|
| P | Pen |
| E | Eraser |
| T | Text Tool |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| Double-click | Add Text |

## Logic Explained
```js
// Undo Stack: Each stroke saves canvas as DataURL
undoStack.push(canvas.toDataURL())
// Undo: Pop -> Draw previous DataURL on canvas
// Shapes: Save snapshot on mousedown, restore on mousemove, draw preview
// Eraser: Stroke with bg color + bigger width
// Marker: globalAlpha 0.5 + 2x width
// Zoom: CSS width scaling, getPos() accounts for rect scaling
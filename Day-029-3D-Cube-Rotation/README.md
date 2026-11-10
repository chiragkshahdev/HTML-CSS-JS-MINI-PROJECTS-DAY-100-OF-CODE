# Day 29 - 3D Cube Rotation 🧊

**100 Days of Code | By Chirag Kiran Shah**

Interactive 3D cube with pure CSS 3D transforms + JS drag logic.

## ✨ Features
- **CSS 3D:** `perspective:1000px`, `transform-style:preserve-3d`, each face `translateZ(100px)`
- **Rotation Logic:**
    - Auto rotate: `requestAnimationFrame` loop, `rotY += speed`
    - Drag rotate: `mousedown` -> `mousemove` delta -> `rotX`, `rotY` update
- **Controls:** Pause/Play auto, Reset, Speed slider, Zoom slider, Scroll zoom
- **Touch Support:** Mobile drag supported
- **Design:** 6 faces with different gradients, glassmorphism container

## 📂 Files
# Day 06 - Parallax Scroll Effect

A cool parallax scrolling effect using HTML, CSS & Vanilla JS.

### 🚀 Live Demo
[Add your live link here]

### ✨ Features
- Smooth parallax effect on scroll
- Pure HTML/CSS/JS - No library
- Responsive design
- Background moves slower than foreground

### 🛠️ Tech Stack
- HTML5
- CSS3 (transform, perspective)
- JavaScript (scroll event listener)

### 📁 Files
- `index.html` - Main structure
- `style.css` - Parallax styling
- `script.js` - Scroll logic

### 💡 How it works
```js
window.addEventListener('scroll', () => {
  let value = window.scrollY;
  background.style.top = value * 0.5 + 'px';
})
# Day 07 - Counter App

Simple Counter App with Increase, Decrease, Reset.

### ✨ Features
- Increase / Decrease / Reset buttons
- Color change: Green for >0, Red for <0, Black for 0
- Clean UI with box shadow

### 🛠️ Tech Used
- HTML5
- CSS3 (Flexbox, Box-shadow)
- JavaScript (DOM, EventListener, classList)

### 💡 Logic
```js
if (classList.contains("increase")) count++
else if (classList.contains("decrease")) count--
else count = 0
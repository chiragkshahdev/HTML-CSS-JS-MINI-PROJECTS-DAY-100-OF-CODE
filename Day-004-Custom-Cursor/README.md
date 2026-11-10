# Day 004 - Custom Cursor

**Goal:** Create a premium custom cursor with trailing effect.

### Features
- Dot + Outline cursor
- Smooth trailing animation using `requestAnimationFrame`
- Hover effect on buttons - outline scales & changes color
- Default cursor hidden with `cursor: none`

### Logic
1.  `mousemove` event se mouse X,Y lete hai
2.  Small dot instantly follow karta hai
3.  Big outline `lerp (linear interpolation)` se slowly follow karta hai = smooth effect
4.  `hover-target` class wale element pe `hover` class add hoti hai

### How to Run
Just open `index.html` in browser.

### Next Upgrade Ideas
- Click pe cursor shrink effect
- Different cursor for different sections
- Magnetic button effect
# Day-05-Glowing-button-Hover

Day 5 of HTML-CSS-JS 30 Mini Projects.

### Demo
A neon glowing button with hover animation. 3 buttons with different colors using CSS variables.

### What I Learned
- CSS Variables: `style="--clr:#ff00c8"` se color dynamic
- `box-shadow` for glow effect: `0 0 10px, 0 0 30px, 0 0 60px`
- `transform: scale()` on hover
- `::before` pseudo element for border animation
- Flexbox for centering

### Concepts
```css
/* Main trick */
.glowing-btn:hover{
    box-shadow: 0 0 10px var(--clr),
                0 0 30px var(--clr),
                0 0 60px var(--clr);
}
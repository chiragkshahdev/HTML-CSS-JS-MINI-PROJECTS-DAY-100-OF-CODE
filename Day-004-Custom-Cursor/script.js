// Day 4 - Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
const hoverTargets = document.querySelectorAll('.hover-target');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Dot follows instantly
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

// Outline follows with smooth delay (trailing effect)
function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;
  
  outline.style.left = `${outlineX - 20}px`;
  outline.style.top = `${outlineY - 20}px`;
  
  requestAnimationFrame(animateOutline);
}
animateOutline();

// Hover effect
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    outline.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    outline.classList.remove('hover');
  });
});
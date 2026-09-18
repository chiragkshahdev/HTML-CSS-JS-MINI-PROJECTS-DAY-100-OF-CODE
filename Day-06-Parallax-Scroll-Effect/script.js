let text = document.getElementById('text');
let bg = document.getElementById('bg');
let mountain = document.getElementById('mountain');

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  
  text.style.marginTop = value * 1.5 + 'px';
  bg.style.top = value * 0.5 + 'px';
  mountain.style.top = value * 0.2 + 'px';
});
const box = document.getElementById('box');
const btn = document.getElementById('btn');
const input = document.getElementById('input');

btn.addEventListener('click', () => {
  box.classList.toggle('active');
  if (box.classList.contains('active')) {
    input.focus();
  } else {
    input.value = '';
  }
});
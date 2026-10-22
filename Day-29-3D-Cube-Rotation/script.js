// Day 29 - 3D Cube Rotation - Chirag Kiran Shah
const cube = document.getElementById('cube');
const scene = document.querySelector('.scene');
let rotX = -20, rotY = 30;
let isDragging = false, lastX, lastY;
let autoRotate = true, speed = 2, zoom = 1;
let animId = null;

function updateCube(){
  cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${zoom})`;
}

// Auto Rotation Loop
function autoLoop(){
  if(autoRotate && !isDragging){
    rotY += speed * 0.5;
    updateCube();
  }
  animId = requestAnimationFrame(autoLoop);
}
autoLoop();

// Mouse Drag Rotation
cube.addEventListener('mousedown', (e)=>{
  isDragging=true; lastX=e.clientX; lastY=e.clientY;
  cube.style.transition='none';
});
window.addEventListener('mouseup', ()=>{
  isDragging=false; cube.style.transition='transform 0.1s';
});
window.addEventListener('mousemove', (e)=>{
  if(!isDragging) return;
  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;
  rotY += deltaX * 0.5;
  rotX -= deltaY * 0.5;
  lastX=e.clientX; lastY=e.clientY;
  updateCube();
});

// Touch for Mobile
cube.addEventListener('touchstart', (e)=>{
  isDragging=true; lastX=e.touches[0].clientX; lastY=e.touches[0].clientY;
});
window.addEventListener('touchend', ()=>isDragging=false);
window.addEventListener('touchmove', (e)=>{
  if(!isDragging) return;
  const deltaX = e.touches[0].clientX - lastX;
  const deltaY = e.touches[0].clientY - lastY;
  rotY += deltaX * 0.5; rotX -= deltaY * 0.5;
  lastX=e.touches[0].clientX; lastY=e.touches[0].clientY;
  updateCube();
});

// Controls
document.getElementById('autoBtn').onclick = function(){
  autoRotate=!autoRotate;
  this.textContent = autoRotate ? '⏸️ Pause Auto' : '▶️ Play Auto';
}
document.getElementById('resetBtn').onclick = ()=>{
  rotX=-20; rotY=30; zoom=1;
  document.getElementById('zoom').value=1;
  updateCube();
}
document.getElementById('speed').oninput = (e)=> speed=parseFloat(e.target.value);
document.getElementById('zoom').oninput = (e)=>{ zoom=parseFloat(e.target.value); updateCube(); }

// Scroll Zoom
scene.addEventListener('wheel', (e)=>{
  e.preventDefault();
  zoom += e.deltaY * -0.001;
  zoom = Math.min(Math.max(0.5, zoom), 2);
  document.getElementById('zoom').value=zoom;
  updateCube();
});

updateCube();
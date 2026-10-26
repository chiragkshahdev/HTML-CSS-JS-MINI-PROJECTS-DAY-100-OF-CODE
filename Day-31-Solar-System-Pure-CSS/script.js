document.querySelectorAll('.planet').forEach(p=>{
  p.addEventListener('mouseenter', e=>{
    document.querySelector('.title').innerText = e.target.className.toUpperCase();
  })
  p.addEventListener('mouseleave', ()=>{
    document.querySelector('.title').innerText = "SOLAR SYSTEM";
  })
});
const iphone = document.getElementById('iphone');
const features = document.querySelectorAll('.feature');
const screens = document.querySelectorAll('.screen-item');
const stickyWrap = document.querySelector('.sticky-wrap');
let currentStep = 0;

function updateOnScroll(){
  const rect = stickyWrap.getBoundingClientRect();
  const progress = Math.min(Math.max(-rect.top/(rect.height-window.innerHeight),0),1);
  const totalSteps = features.length;
  const stepProgress = progress*totalSteps;
  const newStep = Math.min(Math.floor(stepProgress),totalSteps-1);

  const rotY = -15+progress*30;
  const rotX = 10-progress*20;
  const scale = 1-progress*0.15;

  if(window.innerWidth>900){
    iphone.style.transform = `perspective(2000px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;
  }

  if(newStep!==currentStep){
    currentStep=newStep;
    features.forEach((f,i)=>f.classList.toggle('active',i===currentStep));
    screens.forEach((s,i)=>s.classList.toggle('active',i===currentStep));
  }
}
window.addEventListener('scroll',updateOnScroll,{passive:true});
updateOnScroll();
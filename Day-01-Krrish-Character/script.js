// Create City Buildings
const city = document.getElementById('city');
for(let i=0; i<50; i++){
  const building = document.createElement('div');
  building.className = 'building';
  building.style.height = (Math.random()*100 + 40) + 'px';
  city.appendChild(building);
}

const plane = document.getElementById('plane');
const krrish = document.getElementById('krrish');
const message = document.getElementById('message');
const btn = document.getElementById('btn');

let rescued = false;

function rescuePlane(){
  if(rescued){
    location.reload();
    return;
  }

  message.innerText = "PLANE FALLING... KRRISH COMING!";
  plane.classList.add('falling');
  btn.innerText = "KRRISH FLYING...";

  setTimeout(()=>{
    krrish.classList.add('fly');
  },600);

  setTimeout(()=>{
    plane.classList.remove('falling');
    plane.classList.add('saved');
    message.innerText = "KRRISH SAVED THE PLANE! HERO!";
    btn.innerText = "PLAY AGAIN";
    rescued = true;
  },2800);
}

// Event Listeners
btn.addEventListener('click', rescuePlane);
krrish.addEventListener('click', rescuePlane);
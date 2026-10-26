const card = document.getElementById('card');
const bigHeart = document.getElementById('bigHeart');
const likeBtn = document.getElementById('likeBtn');
const countEl = document.getElementById('count');
let likes = 0;
let liked = false;

function triggerLike(e){
  // Big heart pop
  bigHeart.classList.remove('active');
  void bigHeart.offsetWidth; // restart animation
  bigHeart.classList.add('active');
  
  // Floating small hearts
  for(let i=0; i<5; i++){
    const h = document.createElement('div');
    h.className = 'floating-heart';
    h.innerText = '❤️';
    h.style.left = (e.clientX - card.getBoundingClientRect().left + (Math.random()*80-40)) + 'px';
    h.style.top = (e.clientY - card.getBoundingClientRect().top) + 'px';
    card.appendChild(h);
    setTimeout(()=> h.remove(), 1500);
  }

  if(!liked){
    likes++;
    liked = true;
    likeBtn.innerText = '❤️';
    likeBtn.classList.add('liked');
    countEl.innerText = likes + ' Likes';
  }
}

card.addEventListener('dblclick', triggerLike);
likeBtn.addEventListener('click', (e)=>{
  if(liked){
    likes--; liked=false;
    likeBtn.innerText='🤍';
    countEl.innerText= likes + ' Likes';
  } else {
    triggerLike({clientX: card.getBoundingClientRect().left+160, clientY: card.getBoundingClientRect().top+225});
  }
});
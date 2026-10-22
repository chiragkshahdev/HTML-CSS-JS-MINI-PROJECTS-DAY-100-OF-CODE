// Day 28 - Memory Flip Card Game - Chirag Kiran Shah
const emojis = ['🚀','🎮','🧠','🔥','💡','⚡','🎯','👾'];
let firstCard=null, secondCard=null, lockBoard=false;
let moves=0, matchedPairs=0, seconds=0, timer=null, hints=3;

const grid=document.getElementById('grid');
const movesEl=document.getElementById('moves');
const matchedEl=document.getElementById('matched');
const timerEl=document.getElementById('timer');
const winModal=document.getElementById('winModal');

function shuffle(a){return a.sort(()=>Math.random()-0.5)}

function init(){
  const cards=shuffle([...emojis,...emojis]);
  grid.innerHTML=''; firstCard=secondCard=null; lockBoard=false;
  moves=0; matchedPairs=0; seconds=0; hints=3;
  movesEl.textContent=0; matchedEl.textContent='0/8'; timerEl.textContent='00:00';
  clearInterval(timer); startTimer();
  document.getElementById('hint').textContent=`💡 Hint (${hints})`;
  cards.forEach(icon=>{
    const card=document.createElement('div');
    card.className='card'; card.dataset.icon=icon;
    card.innerHTML=`<div class="card-face card-back"></div><div class="card-face card-front">${icon}</div>`;
    card.addEventListener('click',()=>flip(card));
    grid.appendChild(card);
  });
}
function startTimer(){
  timer=setInterval(()=>{
    seconds++; 
    timerEl.textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  },1000);
}
function flip(card){
  if(lockBoard || card.classList.contains('flip') || card.classList.contains('matched')) return;
  card.classList.add('flip');
  if(!firstCard){firstCard=card; return;}
  secondCard=card; moves++; movesEl.textContent=moves; check();
}
function check(){
  lockBoard=true;
  const isMatch=firstCard.dataset.icon===secondCard.dataset.icon;
  if(isMatch){
    firstCard.classList.add('matched'); secondCard.classList.add('matched');
    matchedPairs++; matchedEl.textContent=`${matchedPairs}/8`;
    reset(); if(matchedPairs===8) win();
  }else{
    setTimeout(()=>{firstCard.classList.remove('flip');secondCard.classList.remove('flip');reset();},800);
  }
}
function reset(){[firstCard,secondCard,lockBoard]=[null,null,false]}
function win(){
  clearInterval(timer);
  document.getElementById('winStats').textContent=`Moves: ${moves} | Time: ${timerEl.textContent}`;
  winModal.classList.remove('hidden');
}
document.getElementById('restart').onclick=init;
document.getElementById('playAgain').onclick=()=>{winModal.classList.add('hidden');init();}
document.getElementById('hint').onclick=()=>{
  if(hints<=0||lockBoard) return; hints--;
  document.getElementById('hint').textContent=`💡 Hint (${hints})`;
  const unflipped=[...document.querySelectorAll('.card:not(.flip):not(.matched)')].slice(0,2);
  unflipped.forEach(c=>c.classList.add('flip'));
  setTimeout(()=>unflipped.forEach(c=>{if(!c.classList.contains('matched'))c.classList.remove('flip')}),600);
}
init();
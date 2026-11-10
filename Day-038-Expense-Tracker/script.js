const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const listEl = document.getElementById('list');
const form = document.getElementById('form');
const textEl = document.getElementById('text');
const amountEl = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('expense38')) || [];

function addToDOM(t){
  const li = document.createElement('li');
  li.classList.add(t.amount < 0 ? 'minus' : 'plus');
  li.innerHTML = `
    <button class="delete-btn" onclick="remove(${t.id})">x</button>
    ${t.text} <span>${t.amount < 0 ? '-' : '+'}₹${Math.abs(t.amount)}</span>
  `;
  listEl.appendChild(li);
}

function updateValues(){
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((a,b)=>a+b,0).toFixed(2);
  const income = amounts.filter(a=>a>0).reduce((a,b)=>a+b,0).toFixed(2);
  const expense = (amounts.filter(a=>a<0).reduce((a,b)=>a+b,0) * -1).toFixed(2);
  
  balanceEl.innerText = `₹${total}`;
  incomeEl.innerText = `+₹${income}`;
  expenseEl.innerText = `-₹${expense}`;
}

function save(){
  localStorage.setItem('expense38', JSON.stringify(transactions));
}

function init(){
  listEl.innerHTML = '';
  transactions.forEach(addToDOM);
  updateValues();
}

function remove(id){
  transactions = transactions.filter(t => t.id !== id);
  save();
  init();
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  if(!textEl.value.trim() || !amountEl.value.trim()) return alert('Fill all fields');
  
  const transaction = {
    id: Date.now(),
    text: textEl.value,
    amount: +amountEl.value
  };
  
  transactions.push(transaction);
  addToDOM(transaction);
  updateValues();
  save();
  
  textEl.value = '';
  amountEl.value = '';
});

init();
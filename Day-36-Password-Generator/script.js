const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('uppercase');
const lowerEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const funcs = {
  lower: () => String.fromCharCode(Math.floor(Math.random()*26)+97),
  upper: () => String.fromCharCode(Math.floor(Math.random()*26)+65),
  number: () => String.fromCharCode(Math.floor(Math.random()*10)+48),
  symbol: () => {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random()*symbols.length)];
  }
};

generateBtn.addEventListener('click', ()=>{
  const length = +lengthEl.value;
  const hasLower = lowerEl.checked;
  const hasUpper = upperEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  let password = '';
  const typesArr = [];
  if(hasLower) typesArr.push('lower');
  if(hasUpper) typesArr.push('upper');
  if(hasNumber) typesArr.push('number');
  if(hasSymbol) typesArr.push('symbol');

  if(typesArr.length === 0) return alert('Select at least one option');

  for(let i=0; i<length; i++){
    const type = typesArr[Math.floor(Math.random()*typesArr.length)];
    password += funcs[type]();
  }
  resultEl.value = password;
});

copyBtn.addEventListener('click', ()=>{
  if(!resultEl.value) return;
  navigator.clipboard.writeText(resultEl.value);
  copyBtn.innerText = '✅';
  setTimeout(()=> copyBtn.innerText = '📋', 1500);
});
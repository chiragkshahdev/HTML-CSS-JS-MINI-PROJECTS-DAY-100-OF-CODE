const heightEl = document.getElementById('height');
const weightEl = document.getElementById('weight');
const calcBtn = document.getElementById('calcBtn');
const bmiValue = document.getElementById('bmiValue');
const bmiStatus = document.getElementById('bmiStatus');

calcBtn.addEventListener('click', ()=>{
  const h = parseFloat(heightEl.value) / 100;
  const w = parseFloat(weightEl.value);

  if(!h || !w || h <= 0 || w <= 0){
    alert('Enter valid height & weight');
    return;
  }

  const bmi = (w / (h * h)).toFixed(1);
  bmiValue.innerText = bmi;

  let status = '';
  let color = '';
  
  if(bmi < 18.5){
    status = 'Underweight 😒';
    color = '#74b9ff';
  } else if(bmi < 24.9){
    status = 'Normal - Fit hai! 😍';
    color = '#00b894';
  } else if(bmi < 29.9){
    status = 'Overweight 😬';
    color = '#fdcb6e';
  } else {
    status = 'Obese - Dhyan de! 😰';
    color = '#d63031';
  }

  bmiStatus.innerText = status;
  bmiStatus.style.color = color;
  bmiValue.style.color = color;
});
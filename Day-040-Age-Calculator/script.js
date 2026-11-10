const dobEl = document.getElementById('dob');
const calcBtn = document.getElementById('calcBtn');
const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const fullEl = document.getElementById('fullAge');

calcBtn.addEventListener('click', ()=>{
  if(!dobEl.value) return alert('Select your DOB');
  
  const birthDate = new Date(dobEl.value);
  const today = new Date();

  if(birthDate > today) return alert('Future date not allowed');

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if(days < 0){
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if(months < 0){
    years--;
    months += 12;
  }

  yearsEl.innerText = years;
  monthsEl.innerText = months;
  daysEl.innerText = days;
  
  fullEl.innerText = `You are ${years} years, ${months} months and ${days} days old.`;
});
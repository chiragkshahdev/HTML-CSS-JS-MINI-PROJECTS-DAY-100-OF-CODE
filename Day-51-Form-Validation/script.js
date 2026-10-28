const form = document.getElementById('form');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
const cpassEl = document.getElementById('cpassword');
const termsEl = document.getElementById('terms');
const submitBtn = document.getElementById('submitBtn');
const strengthBar = document.getElementById('strengthBar');

function showError(input, msg) {
  const group = input.closest('.input-group') || input.closest('.check');
  const field = input.closest('.field');
  if(field) { field.classList.add('error'); field.classList.remove('success'); }
  const errorEl = group.querySelector('.error');
  if(errorEl) errorEl.textContent = msg;
}

function showSuccess(input) {
  const group = input.closest('.input-group');
  const field = input.closest('.field');
  field.classList.remove('error'); field.classList.add('success');
  group.querySelector('.error').textContent = '';
}

function validateName() {
  const v = nameEl.value.trim();
  if(v.length < 3) { showError(nameEl, 'Name must be at least 3 characters'); return false; }
  if(!/^[a-zA-Z\s]+$/.test(v)) { showError(nameEl, 'Only letters allowed'); return false; }
  showSuccess(nameEl); return true;
}

function validateEmail() {
  const v = emailEl.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!re.test(v)) { showError(emailEl, 'Enter valid email address'); return false; }
  showSuccess(emailEl); return true;
}

function validatePass() {
  const v = passEl.value;
  const r1 = v.length >= 8;
  const r2 = /[A-Z]/.test(v);
  const r3 = /[0-9]/.test(v);
  const r4 = /[^A-Za-z0-9]/.test(v);

  document.getElementById('r1').className = r1?'ok':''; document.getElementById('r1').innerHTML = `<i class="fas fa-${r1?'check':'times'}"></i> 8+ chars`;
  document.getElementById('r2').className = r2?'ok':''; document.getElementById('r2').innerHTML = `<i class="fas fa-${r2?'check':'times'}"></i> Uppercase`;
  document.getElementById('r3').className = r3?'ok':''; document.getElementById('r3').innerHTML = `<i class="fas fa-${r3?'check':'times'}"></i> Number`;
  document.getElementById('r4').className = r4?'ok':''; document.getElementById('r4').innerHTML = `<i class="fas fa-${r4?'check':'times'}"></i> Symbol`;

  let score = [r1,r2,r3,r4].filter(Boolean).length;
  strengthBar.style.width = (score*25) + '%';
  strengthBar.style.background = score<2 ? '#ef4444' : score<3 ? '#f59e0b' : score<4 ? '#3b82f6' : '#22c55e';

  if(!r1 || !r2 || !r3) { showError(passEl, 'Weak password'); return false; }
  showSuccess(passEl); return true;
}

function validateCpass() {
  if(cpassEl.value !== passEl.value || cpassEl.value === '') { showError(cpassEl, 'Passwords do not match'); return false; }
  showSuccess(cpassEl); return true;
}

function validateTerms() {
  const err = document.getElementById('termsError');
  if(!termsEl.checked) { err.textContent = 'You must agree to terms'; return false; }
  err.textContent = ''; return true;
}

function checkForm() {
  const ok = validateName() & validateEmail() & validatePass() & validateCpass() & validateTerms();
  if(ok && termsEl.checked) { submitBtn.classList.add('active'); submitBtn.disabled = false; }
  else { submitBtn.classList.remove('active'); submitBtn.disabled = true; }
}

nameEl.addEventListener('input', () => { validateName(); checkForm(); });
emailEl.addEventListener('input', () => { validateEmail(); checkForm(); });
passEl.addEventListener('input', () => { validatePass(); validateCpass(); checkForm(); });
cpassEl.addEventListener('input', () => { validateCpass(); checkForm(); });
termsEl.addEventListener('change', checkForm);

document.getElementById('toggle').addEventListener('click', function() {
  const type = passEl.type === 'password' ? 'text' : 'password';
  passEl.type = type; this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if(validateName() && validateEmail() && validatePass() && validateCpass() && validateTerms()) {
    document.getElementById('success').classList.remove('hidden');
    setTimeout(() => { document.getElementById('success').classList.add('hidden'); form.reset(); submitBtn.classList.remove('active'); submitBtn.disabled=true; document.querySelectorAll('.field').forEach(f=>f.className='field'); strengthBar.style.width='0%'; }, 2000);
  }
});
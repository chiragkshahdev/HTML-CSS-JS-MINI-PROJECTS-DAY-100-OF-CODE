// Day 30 - 3D Flip Login Form - Chirag Kiran Shah

// LINE 1: Card element ko select kiya jo flip hoga
const card = document.getElementById('card');

// LINE 2: Signup link select kiya (Login page pe jo Sign Up likha hai)
const toSignup = document.getElementById('toSignup');

// LINE 3: Login link select kiya (Signup page pe jo Login likha hai)
const toLogin = document.getElementById('toLogin');

// LINE 4: Toast notification div select kiya message dikhane ke liye
const toast = document.getElementById('toast');

// LINE 5: Signup button click pe card me 'flipped' class add karo
// Isse CSS me transform: rotateY(180deg) trigger hoga = 3D flip
toSignup.addEventListener('click', () => {
  card.classList.add('flipped'); // FRONT -> BACK
});

// LINE 6: Login link pe click pe 'flipped' class hata do
// Card wapas 0deg pe aa jayega = Login dikhega
toLogin.addEventListener('click', () => {
  card.classList.remove('flipped'); // BACK -> FRONT
});

// LINE 7: Toast dikhane ka function banaya
function showToast(msg){
  toast.textContent = msg; // message set karo
  toast.classList.remove('hidden'); // visible karo
  setTimeout(()=>{ // 3 sec baad auto hide
    toast.classList.add('hidden');
  }, 3000);
}

// LINE 8: Login button ka logic
document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value.trim(); // email value
  const pass = document.getElementById('loginPass').value.trim(); // pass value

  // LINE 9: Validation - khali hai toh error
  if(!email || !pass){
    showToast('❌ Fill all fields');
    return; // yahi rok do
  }
  // LINE 10: Simple email check - @ hona chahiye
  if(!email.includes('@')){
    showToast('❌ Invalid email');
    return;
  }
  // LINE 11: Success - yahan tu API call kar sakta hai
  showToast(`✅ Welcome back! ${email}`);
});

// LINE 12: Signup button ka logic - same flow
document.getElementById('signupBtn').addEventListener('click', () => {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass = document.getElementById('signupPass').value.trim();

  // LINE 13: Sab fields mandatory
  if(!name || !email || !pass){
    showToast('❌ Fill all fields');
    return;
  }
  // LINE 14: Password length check - security ke liye
  if(pass.length < 6){
    showToast('❌ Password min 6 chars');
    return;
  }
  // LINE 15: Success + auto flip back to login
  showToast(`🎉 Account created for ${name}!`);
  setTimeout(()=>{ // 1.5 sec baad login pe le jao
    card.classList.remove('flipped');
  },1500);
});

// LINE 16: Keyboard support - Enter press pe login/signup trigger
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    // Agar card flipped nahi hai toh login, warna signup
    if(!card.classList.contains('flipped')){
      document.getElementById('loginBtn').click();
    } else {
      document.getElementById('signupBtn').click();
    }
  }
});
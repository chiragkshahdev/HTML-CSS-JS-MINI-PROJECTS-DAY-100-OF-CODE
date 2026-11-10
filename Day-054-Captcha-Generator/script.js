const captchaText = document.getElementById('captchaText');
const refreshBtn = document.getElementById('refreshBtn');
const input = document.getElementById('input');
const message = document.getElementById('message');
const checkBtn = document.getElementById('checkBtn');

let captcha = '';

function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captchaText.textContent = captcha;
    input.value = '';
    message.textContent = '';
}

refreshBtn.addEventListener('click', generateCaptcha);

checkBtn.addEventListener('click', () => {
    if (input.value === captcha) {
        message.textContent = "✓ Captcha Matched!";
        message.style.color = "green";
        setTimeout(generateCaptcha, 1500);
    } else {
        message.textContent = "✗ Invalid Captcha, Try Again";
        message.style.color = "red";
    }
});

// Initial
generateCaptcha();
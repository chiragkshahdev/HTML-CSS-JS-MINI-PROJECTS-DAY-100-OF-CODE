const inputs = document.querySelectorAll('.otp-box input');
const verifyBtn = document.getElementById('verifyBtn');
const msg = document.getElementById('msg');

inputs[0].focus();

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
            inputs[index - 1].focus();
        }
        // Allow only numbers
        if (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
            e.preventDefault();
        }
    });

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, 6);
        data.split('').forEach((char, i) => {
            if (inputs[i]) inputs[i].value = char;
        });
        if (data.length === 6) inputs[5].focus();
    });
});

verifyBtn.addEventListener('click', () => {
    let otp = '';
    inputs.forEach(input => otp += input.value);

    if (otp.length !== 6) {
        msg.textContent = "Please enter 6 digit OTP";
        msg.style.color = "red";
    } else {
        msg.textContent = `✓ OTP Verified: ${otp}`;
        msg.style.color = "green";
    }
});
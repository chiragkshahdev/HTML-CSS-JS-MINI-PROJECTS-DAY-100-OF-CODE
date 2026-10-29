const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const amountInput = document.getElementById('amount');
const resultText = document.getElementById('result');
const btn = document.getElementById('btn');

const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "AED", "SGD"];

const rates = {
    "USD": 1,
    "INR": 83.5,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 155.2,
    "AUD": 1.52,
    "CAD": 1.36,
    "AED": 3.67,
    "SGD": 1.32
};

// Fill options
currencies.forEach(cur => {
    fromSelect.innerHTML += `<option value="${cur}">${cur}</option>`;
    toSelect.innerHTML += `<option value="${cur}">${cur}</option>`;
});

fromSelect.value = "USD";
toSelect.value = "INR";

function convert() {
    let amount = amountInput.value;
    if (amount === "" || amount < 1) amount = 1;

    let fromRate = rates[fromSelect.value];
    let toRate = rates[toSelect.value];

    let converted = (amount / fromRate * toRate).toFixed(2);
    
    resultText.textContent = `${amount} ${fromSelect.value} = ${converted} ${toSelect.value}`;
}

btn.addEventListener('click', convert);
window.addEventListener('load', convert);

// Swap
document.querySelector('.icon').addEventListener('click', () => {
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    convert();
});
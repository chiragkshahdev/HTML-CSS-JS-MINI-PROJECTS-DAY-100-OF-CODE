let qrcode = null;
let currentType = 'text';

const qrText = document.getElementById('qrText');
const qrDiv = document.getElementById('qr');
const qrDataEl = document.getElementById('qrData');
const sizeEl = document.getElementById('size');
const sizeVal = document.getElementById('sizeVal');
const fgEl = document.getElementById('fg');
const bgEl = document.getElementById('bg');

function getValue() {
  if(currentType === 'text' || currentType === 'url') {
    return qrText.value.trim();
  } else if(currentType === 'wifi') {
    const ssid = document.getElementById('wifiSSID').value;
    const pass = document.getElementById('wifiPass').value;
    const type = document.getElementById('wifiType').value;
    return `WIFI:T:${type};S:${ssid};P:${pass};;`;
  } else if(currentType === 'email') {
    const to = document.getElementById('emailTo').value;
    const sub = document.getElementById('emailSub').value;
    const body = document.getElementById('emailBody').value;
    return `mailto:${to}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
  }
}

function generateQR() {
  const value = getValue();
  if(!value) return alert('Enter data');
  
  const size = parseInt(sizeEl.value);
  const fg = fgEl.value;
  const bg = bgEl.value;

  qrDiv.innerHTML = '';
  qrcode = new QRCode(qrDiv, {
    text: value,
    width: size,
    height: size,
    colorDark: fg,
    colorLight: bg,
    correctLevel: QRCode.CorrectLevel.H
  });

  qrDataEl.textContent = value;
}

document.getElementById('generate').addEventListener('click', generateQR);

sizeEl.addEventListener('input', () => {
  sizeVal.textContent = sizeEl.value;
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    currentType = tab.dataset.type;
    document.getElementById('textInput').classList.add('hidden');
    document.getElementById('wifiInput').classList.add('hidden');
    document.getElementById('emailInput').classList.add('hidden');
    if(currentType === 'text' || currentType === 'url') {
      document.getElementById('textInput').classList.remove('hidden');
      qrText.placeholder = currentType === 'url' ? 'https://example.com' : 'Enter text...';
    } else if(currentType === 'wifi') {
      document.getElementById('wifiInput').classList.remove('hidden');
    } else if(currentType === 'email') {
      document.getElementById('emailInput').classList.remove('hidden');
    }
  });
});

// Download
document.getElementById('download').addEventListener('click', () => {
  const img = qrDiv.querySelector('img') || qrDiv.querySelector('canvas');
  let url;
  if(img.tagName === 'IMG') url = img.src;
  else url = img.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url; a.download = `qr-${Date.now()}.png`; a.click();
});

// Share
document.getElementById('share').addEventListener('click', async () => {
  const value = getValue();
  if(navigator.share) {
    try { await navigator.share({ title:'QR Code', text:value }); } catch(e){}
  } else {
    navigator.clipboard.writeText(value);
    alert('Link copied!');
  }
});

// Print
document.getElementById('print').addEventListener('click', () => {
  const w = window.open('');
  w.document.write(`<img src="${qrDiv.querySelector('img,canvas').src || qrDiv.querySelector('canvas').toDataURL()}" style="width:300px"><p>${getValue()}</p>`);
  w.document.close(); w.print();
});

// Auto generate on load
window.onload = () => {
  setTimeout(generateQR, 500);
};

qrText.addEventListener('keydown', e => {
  if(e.key === 'Enter' && e.ctrlKey) generateQR();
});
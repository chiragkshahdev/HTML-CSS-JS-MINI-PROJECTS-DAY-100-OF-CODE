const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');
const placeholder = document.getElementById('placeholder');
const uploadBtn = document.getElementById('uploadBtn');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');

let img = new Image();
let currentPreset = 'none';

const sliders = {
  brightness: document.getElementById('brightness'),
  contrast: document.getElementById('contrast'),
  saturate: document.getElementById('saturate'),
  hue: document.getElementById('hue')
};

const values = {
  bright: document.getElementById('v-bright'),
  contrast: document.getElementById('v-contrast'),
  saturate: document.getElementById('v-saturate'),
  hue: document.getElementById('v-hue')
};

// Upload
uploadBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      placeholder.style.display = 'none';
      canvas.style.display = 'block';
      applyFilters();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

// Apply Filters
function applyFilters() {
  if (!img.src) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let f = `brightness(${sliders.brightness.value}%) contrast(${sliders.contrast.value}%) saturate(${sliders.saturate.value}%) hue-rotate(${sliders.hue.value}deg)`;

  if (currentPreset === 'grayscale') f += ' grayscale(100%)';
  if (currentPreset === 'sepia') f += ' sepia(100%)';
  if (currentPreset === 'invert') f += ' invert(100%)';
  if (currentPreset === 'blur') f += ' blur(5px)';
  if (currentPreset === 'vintage') f += ' sepia(50%) contrast(120%) brightness(110%)';
  if (currentPreset === 'bw') f += ' grayscale(100%) contrast(130%)';

  ctx.filter = f;
  ctx.drawImage(img, 0, 0);
}

// Slider events
sliders.brightness.addEventListener('input', () => {
  values.bright.textContent = sliders.brightness.value + '%';
  applyFilters();
});
sliders.contrast.addEventListener('input', () => {
  values.contrast.textContent = sliders.contrast.value + '%';
  applyFilters();
});
sliders.saturate.addEventListener('input', () => {
  values.saturate.textContent = sliders.saturate.value + '%';
  applyFilters();
});
sliders.hue.addEventListener('input', () => {
  values.hue.textContent = sliders.hue.value + '°';
  applyFilters();
});

// Preset buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (currentPreset === btn.dataset.filter) {
      currentPreset = 'none';
    } else {
      currentPreset = btn.dataset.filter;
      btn.classList.add('active');
    }
    applyFilters();
  });
});

// Reset
resetBtn.addEventListener('click', () => {
  currentPreset = 'none';
  sliders.brightness.value = 100;
  sliders.contrast.value = 100;
  sliders.saturate.value = 100;
  sliders.hue.value = 0;
  values.bright.textContent = '100%';
  values.contrast.textContent = '100%';
  values.saturate.textContent = '100%';
  values.hue.textContent = '0°';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  applyFilters();
});

// Download
downloadBtn.addEventListener('click', () => {
  if (!img.src) return alert('First upload an image!');
  const link = document.createElement('a');
  link.download = 'filtered-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
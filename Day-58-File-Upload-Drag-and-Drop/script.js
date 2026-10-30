const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

dropZone.addEventListener('click', () => fileInput.click());

['dragenter', 'dragover'].forEach(e => {
  dropZone.addEventListener(e, (ev) => {
    ev.preventDefault();
    dropZone.classList.add('dragover');
  });
});

['dragleave', 'drop'].forEach(e => {
  dropZone.addEventListener(e, (ev) => {
    ev.preventDefault();
    dropZone.classList.remove('dragover');
  });
});

dropZone.addEventListener('drop', (e) => {
  handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

function handleFiles(files) {
  fileList.innerHTML = '';
  [...files].forEach(file => {
    fileList.innerHTML += `<p>📁 ${file.name} - ${(file.size/1024).toFixed(1)} KB</p>`;
  });
}
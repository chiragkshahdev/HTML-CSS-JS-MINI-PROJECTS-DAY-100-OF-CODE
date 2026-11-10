// --- SAMPLE DATA ---
const SAMPLE = {
  fName: "You Dev",
  fTitle: "Frontend Developer",
  fEmail: "you.dev@gmail.com",
  fPhone: "+91 98XXX XXXXX",
  fLocation: "Virar, Maharashtra, India",
  fLink: "github.com/youdev • linkedin.com/in/youdev",
  fSummary: "Passionate Frontend Developer with 100 Days of Code experience. Built 72+ projects including E-commerce, WhatsApp Clone, Instagram & Facebook Clones. Strong in HTML, CSS, JavaScript and Responsive Design. Also working as Real Estate Broker in Charge.",
  fEdu: "B.Com - Mumbai University (2022 - 2025)",
  fEdu2: "12th - HSC Board, Virar (2022)",
  fJob1: "Frontend Developer @ Freelance (2025 - Present)",
  fJob1Desc: "Built 72+ websites & web apps for clients. E-commerce, Portfolio, Chat Apps. 100% responsive & modern UI.",
  fJob2: "Real Estate Broker in Charge @ Virar (2024 - Present)",
  fJob2Desc: "Managing property listings, client meetings, deals. Using tech to showcase properties online.",
  fSkills: "HTML, CSS, JavaScript, React, Git, Responsive Design",
  fProj1: "WhatsApp Web Clone - Real chat UI with auto-reply, dark mode, localStorage",
  fProj2: "E-commerce Cart System - Coupon, delivery logic, price calculation",
  fProj3: "Portfolio Website V1 - Dark mode, filters, typing animation",
};

// --- STATE ---
let template = 'modern';
let fontLevel = 1; // 0 small, 1 medium, 2 large
const FONT_SIZES = ['12px', '14px', '16px'];
const FONT_LABELS = ['Small', 'Medium', 'Large'];
const FIELD_IDS = ['fName','fTitle','fEmail','fPhone','fLocation','fLink','fSummary','fEdu','fEdu2','fJob1','fJob1Desc','fJob2','fJob2Desc','fSkills','fProj1','fProj2','fProj3'];

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function getVal(id) { return document.getElementById(id).value.trim(); }

// --- UPDATE PREVIEW ---
function updatePreview() {
  const name = getVal('fName') || 'Your Name';
  const title = getVal('fTitle') || 'Your Job Title';
  const email = getVal('fEmail'), phone = getVal('fPhone'), loc = getVal('fLocation'), link = getVal('fLink');
  const contact = [email, phone, loc].filter(Boolean).join(' • ') || 'email • phone • location';

  document.getElementById('pName').textContent = name;
  document.getElementById('pTitle').textContent = title;
  document.getElementById('pContact').textContent = contact;
  document.getElementById('pLink').textContent = link;
  document.getElementById('pAvatar').textContent = name.charAt(0).toUpperCase() || 'Y';
  document.getElementById('pSummary').textContent = getVal('fSummary') || 'Write your professional summary here...';

  // Experience
  let expHtml = '';
  if (getVal('fJob1')) expHtml += `<div class="exp-item"><b>${getVal('fJob1')}</b><p>${getVal('fJob1Desc') || ''}</p></div>`;
  if (getVal('fJob2')) expHtml += `<div class="exp-item"><b>${getVal('fJob2')}</b><p>${getVal('fJob2Desc') || ''}</p></div>`;
  document.getElementById('pExp').innerHTML = expHtml || '<p style="color:#999">Add your work experience...</p>';

  // Projects
  let projHtml = '';
  ['fProj1','fProj2','fProj3'].forEach(id => { if (getVal(id)) projHtml += `<p>• ${getVal(id)}</p>`; });
  document.getElementById('pProjects').innerHTML = projHtml || '<p style="color:#999">Add projects...</p>';

  // Education
  let eduHtml = '';
  if (getVal('fEdu')) eduHtml += `<p>• ${getVal('fEdu')}</p>`;
  if (getVal('fEdu2')) eduHtml += `<p>• ${getVal('fEdu2')}</p>`;
  document.getElementById('pEdu').innerHTML = eduHtml || '<p style="color:#999">Add education...</p>';

  // Skills
  const skills = getVal('fSkills').split(',').map(s => s.trim()).filter(Boolean);
  document.getElementById('pSkills').innerHTML = skills.length ? skills.map(s => `<span>${s}</span>`).join('') : '<span style="color:#999;background:none">Add skills...</span>';

  // Completion %
  const filled = FIELD_IDS.filter(id => getVal(id)).length;
  const pct = Math.round((filled / FIELD_IDS.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('completionText').textContent = pct + '%';

  // Save to localStorage
  const data = {};
  FIELD_IDS.forEach(id => data[id] = document.getElementById(id).value);
  data.template = template; data.fontLevel = fontLevel;
  localStorage.setItem('resume_day73', JSON.stringify(data));
}

// --- EVENTS ---
FIELD_IDS.forEach(id => document.getElementById(id).addEventListener('input', updatePreview));

// Steps
function goStep(step) {
  document.querySelectorAll('.step').forEach(s => s.classList.toggle('active', s.dataset.step === step));
  document.querySelectorAll('.step-content').forEach(c => c.style.display = 'none');
  document.getElementById('step-' + step).style.display = 'block';
  // Update step buttons visual
  document.querySelectorAll('.step').forEach(s => s.classList.toggle('active', s.dataset.step === step));
}
document.querySelectorAll('.step').forEach(s => s.addEventListener('click', () => goStep(s.dataset.step)));

// Template
function setTemplate(t) {
  template = t;
  document.querySelectorAll('.template-card').forEach(c => c.classList.toggle('active', c.dataset.template === t));
  const resume = document.getElementById('resumePreview');
  resume.className = 'resume ' + t;
  updatePreview();
  showToast('Template changed: ' + t);
}

// Font
function changeFont(dir) {
  fontLevel = Math.max(0, Math.min(2, fontLevel + dir));
  document.getElementById('resumePreview').style.fontSize = FONT_SIZES[fontLevel];
  document.getElementById('fontSizeLabel').textContent = FONT_LABELS[fontLevel];
  updatePreview();
}

// Skills quick add
function addSkill(skill) {
  const el = document.getElementById('fSkills');
  const current = el.value.trim();
  if (current && !current.toLowerCase().includes(skill.toLowerCase())) el.value = current + ', ' + skill;
  else if (!current) el.value = skill;
  updatePreview();
}

// Toggles
document.getElementById('showPhoto').addEventListener('change', e => {
  document.getElementById('pAvatar').style.display = e.target.checked ? 'flex' : 'none';
});
document.getElementById('showProjects').addEventListener('change', e => {
  document.getElementById('secProjects').style.display = e.target.checked ? 'block' : 'none';
});
document.getElementById('showSkills').addEventListener('change', e => {
  document.getElementById('secSkills').style.display = e.target.checked ? 'block' : 'none';
});

// Load Sample / Clear / Print
document.getElementById('loadSample').addEventListener('click', () => {
  FIELD_IDS.forEach(id => document.getElementById(id).value = SAMPLE[id] || '');
  setTemplate('modern');
  goStep('personal');
  updatePreview();
  showToast('Sample resume loaded ✨');
});
document.getElementById('clearBtn').addEventListener('click', () => {
  if (!confirm('Clear all fields?')) return;
  FIELD_IDS.forEach(id => document.getElementById(id).value = '');
  localStorage.removeItem('resume_day73');
  updatePreview();
  showToast('Cleared 🗑️');
});
function downloadResume() {
  if (!getVal('fName')) return alert('Please enter your Name first!');
  showToast('Opening Print - Save as PDF select karo 🖨️');
  setTimeout(() => window.print(), 600);
}
document.getElementById('printBtn').addEventListener('click', downloadResume);

// --- LOAD SAVED ---
const saved = JSON.parse(localStorage.getItem('resume_day73'));
if (saved) {
  FIELD_IDS.forEach(id => { if (saved[id]) document.getElementById(id).value = saved[id]; });
  if (saved.template) setTemplate(saved.template);
  if (saved.fontLevel !== undefined) { fontLevel = saved.fontLevel; document.getElementById('resumePreview').style.fontSize = FONT_SIZES[fontLevel]; document.getElementById('fontSizeLabel').textContent = FONT_LABELS[fontLevel]; }
}
updatePreview();
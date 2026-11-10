// --- TYPING EFFECT ---
const ROLES = ["Frontend Developer 💻", "100 Days of Code 🚀", "UI Designer 🎨", "Freelancer ✨"];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const word = ROLES[roleIdx];
  if (!deleting) {
    charIdx++;
    typingEl.textContent = word.slice(0, charIdx);
    if (charIdx === word.length) { deleting = true; setTimeout(typeEffect, 1500); return; }
  } else {
    charIdx--;
    typingEl.textContent = word.slice(0, charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; }
  }
  setTimeout(typeEffect, deleting ? 40 : 80);
}
typeEffect();

// --- SKILLS ---
const SKILLS = [
  { name: "HTML / CSS", level: 95, icon: "🌐" },
  { name: "JavaScript", level: 88, icon: "⚡" },
  { name: "Responsive Design", level: 92, icon: "📱" },
  { name: "UI / UX", level: 80, icon: "🎨" },
  { name: "Git & GitHub", level: 75, icon: "🐙" },
  { name: "Real Estate + Tech", level: 90, icon: "🏠" },
];
document.getElementById('skillsGrid').innerHTML = SKILLS.map(s => `
  <div class="skill-card"><div class="skill-top"><span>${s.icon} ${s.name}</span><span>${s.level}%</span></div><div class="bar"><div class="bar-fill" data-w="${s.level}"></div></div></div>
`).join('');
// Animate bars on load
setTimeout(() => document.querySelectorAll('.bar-fill').forEach(b => b.style.width = b.dataset.w + '%'), 300);

// --- PROJECTS ---
const PROJECTS = [
  { id: 1, title: "E-commerce Product Page", cat: "ecommerce", desc: "Product gallery, color selector, cart drawer with live price update.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", tags: ["HTML", "CSS", "JS"], day: "Day-66" },
  { id: 2, title: "WhatsApp Web Clone", cat: "clone", desc: "Exact WhatsApp Web UI - chats, status, dark mode, auto-reply.", img: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=80", tags: ["Clone", "Chat"], day: "Day-70" },
  { id: 3, title: "Instagram Like System", cat: "clone", desc: "Double-tap like, comments, save, follow with localStorage.", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80", tags: ["Instagram", "JS"], day: "Day-68" },
  { id: 4, title: "Facebook Post Clone", cat: "clone", desc: "FB feed, stories, like, comment, share modal, filters.", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80", tags: ["Facebook", "Feed"], day: "Day-71" },
  { id: 5, title: "Shopping Cart Logic", cat: "ecommerce", desc: "Coupon system, free delivery logic, localStorage cart.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", tags: ["Cart", "Logic"], day: "Day-67" },
  { id: 6, title: "Chat App UI", cat: "web", desc: "WhatsApp-style chat app with search, filters, emoji picker.", img: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&q=80", tags: ["Chat", "UI"], day: "Day-69" },
];

let activeFilter = 'all';
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const list = PROJECTS.filter(p => activeFilter === 'all' || p.cat === activeFilter);
  grid.innerHTML = list.map(p => `
    <div class="project-card">
      <img src="${p.img}" alt="${p.title}" />
      <div class="project-body">
        <span style="font-size:12px;background:#dcfce7;color:#15803d;padding:3px 8px;border-radius:10px;font-weight:700">${p.day}</span>
        <h3 style="margin-top:8px">${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-links"><button onclick="showToast('Opening ${p.title} 🚀')">Live Demo ↗</button><button onclick="showToast('GitHub: github.com/youdev/${p.title}')">GitHub</button></div>
      </div>
    </div>`).join('');
  document.getElementById('projectCount').textContent = PROJECTS.length + 66 + '+';
}
renderProjects();

document.querySelectorAll('.p-filter').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.p-filter').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  activeFilter = b.dataset.filter;
  renderProjects();
}));

// --- NAV ---
document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('navLinks').classList.toggle('open'));
document.querySelectorAll('#navLinks a').forEach(a => a.addEventListener('click', () => {
  document.querySelectorAll('#navLinks a').forEach(x => x.classList.remove('active'));
  a.classList.add('active');
  document.getElementById('navLinks').classList.remove('open');
}));

// Active nav on scroll
window.addEventListener('scroll', () => {
  const sections = ['home','about','skills','projects','contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < 150 && rect.bottom > 150) {
      document.querySelectorAll('#navLinks a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    }
  });
});

// --- DARK MODE ---
document.getElementById('darkBtn').addEventListener('click', function() {
  const isDark = document.body.classList.toggle('dark');
  this.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('portfolio_dark', isDark);
  showToast(isDark ? 'Dark Mode ON 🌙' : 'Light Mode ON ☀️');
});
if (localStorage.getItem('portfolio_dark') === 'true') {
  document.body.classList.add('dark');
  document.getElementById('darkBtn').textContent = '☀️';
}

// --- CV DOWNLOAD (Demo) ---
document.getElementById('downloadCV').addEventListener('click', e => {
  e.preventDefault();
  showToast('CV Downloading... 📄 (Demo - Add your real CV link)');
  setTimeout(() => alert('Demo CV:\n\nYou Dev - Frontend Developer\nVirar, Maharashtra\nSkills: HTML, CSS, JS\nProjects: 72+\nEmail: you.dev@gmail.com'), 500);
});

// --- CONTACT FORM ---
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  const msgEl = document.getElementById('formMsg');
  if (!name || !email || !msg) { msgEl.textContent = 'Please fill all required fields!'; msgEl.style.color = 'red'; return; }
  msgEl.textContent = 'Sending...';
  setTimeout(() => {
    msgEl.textContent = `Thanks ${name}! Message sent ✅ I'll reply to ${email} within 24 hrs.`;
    msgEl.style.color = '#16a34a';
    e.target.reset();
    showToast('Message sent! I will reply soon ✈️');
  }, 800);
});

// --- BACK TO TOP + TOAST ---
document.getElementById('topBtn').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}
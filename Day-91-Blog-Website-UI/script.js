const blogs = [
  { id: 1, title: "How I Learned Coding in 90 Days", category: "Coding", author: "Alex Sharma", date: "Nov 9, 2026", read: "6 min read", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "No college, no coaching. Just 1 hour daily and 90 projects.", content: "Day 1 pe mujhe HTML bhi nahi aata tha. Maine decide kiya ki roz 1 project banaunga. Pehle 10 din bahut mushkil lage, par 30 din ke baad habit ban gayi. 90 din me mere paas 90 projects, ek portfolio aur confidence tha. Agar tum bhi start karna chahte ho, toh aaj se start karo. Perfect time ka wait mat karo." },
  { id: 2, title: "5 AI Tools That Save Me 3 Hours Daily", category: "Tech", author: "Alex Sharma", date: "Nov 8, 2026", read: "4 min read", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", desc: "These AI tools changed my workflow completely.", content: "1. ChatGPT for ideas, 2. Notion AI for notes, 3. Canva AI for design, 4. GitHub Copilot for code, 5. Perplexity for research. In tools ko sahi tarike se use karo, toh tumhara kaam aadha ho jayega." },
  { id: 3, title: "My Solo Trip to Manali Taught Me This", category: "Travel", author: "Priya Singh", date: "Nov 7, 2026", read: "5 min read", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", desc: "Solo travel is scary, but it changes you forever.", content: "Manali me maine akela trek kiya, naye logon se mila aur apne aap ko samjha. Solo trip me tumhe apni company se pyaar ho jata hai. Budget me kaise ghume, kya carry kare, sab is blog me hai." },
  { id: 4, title: "How I Saved My First 1 Lakh at 21", category: "Money", author: "Rahul Verma", date: "Nov 6, 2026", read: "7 min read", img: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80", desc: "No high salary needed. Just this simple system.", content: "Maine 50-30-20 rule follow kiya. 50% needs, 30% wants, 20% savings. Har mahine salary aate hi pehle savings nikalta tha. Small amounts bhi bade ban jate hai jab tum consistent rahte ho." },
  { id: 5, title: "Why I Wake Up at 5 AM Every Day", category: "Life", author: "Alex Sharma", date: "Nov 5, 2026", read: "3 min read", img: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80", desc: "Early morning is my superpower now.", content: "Subah 5 baje uthna shuru me torture lagta tha. Ab ye meri sabse productive time hai. No phone, no noise, sirf main aur mere goals. Try karo 7 din ke liye." },
  { id: 6, title: "JavaScript in Simple Words - Beginner Guide", category: "Coding", author: "Sneha Patel", date: "Nov 4, 2026", read: "8 min read", img: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4d?w=800&q=80", desc: "JS ko daro mat, ye bahut easy hai agar sahi se samjho.", content: "JavaScript website ko zinda karta hai. HTML skeleton hai, CSS makeup hai, aur JS brain hai. Variables, functions aur loops samajh lo, 80% JS samajh aa jayega." },
  { id: 7, title: "Best Budget Laptops for Students in 2026", category: "Tech", author: "Rahul Verma", date: "Nov 3, 2026", read: "6 min read", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", desc: "40k ke andar best options with honest review.", content: "Student ke liye laptop me 16GB RAM aur SSD hona chahiye. Brand se zyada specs dekho. Is blog me maine 5 best laptops compare kiye hai." },
  { id: 8, title: "Goa on 5000 Rs - Full Budget Plan", category: "Travel", author: "Priya Singh", date: "Nov 2, 2026", read: "5 min read", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", desc: "Goa expensive nahi hai, agar tumhe trick pata ho.", content: "Off-season me jao, hostel me raho, scooty rent karo aur local khana khao. 5000 me 3 din ka Goa trip easily ho jayega." },
  { id: 9, title: "How to Stay Consistent When You Feel Lazy", category: "Life", author: "Sneha Patel", date: "Nov 1, 2026", read: "4 min read", img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80", desc: "Motivation is temporary, system is permanent.", content: "Motivation ka wait mat karo. 2-minute rule use karo. Bas 2 minute ke liye start karo, baad me mann khud lag jayega. Consistency hi sab kuch hai." },
];

const grid = document.getElementById("blogGrid");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("searchInput");

function render(list) {
  if (list.length === 0) {
    grid.innerHTML = "";
    statusEl.textContent = "No blogs found. Try another keyword.";
    return;
  }
  statusEl.textContent = `Showing ${list.length} blogs`;
  grid.innerHTML = list.map(b => `
    <div class="card" onclick="openBlog(${b.id})">
      <img src="${b.img}" alt="${b.title}" />
      <div class="card-body">
        <span class="badge">${b.category}</span>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
        <div class="card-footer">
          <span>${b.author} • ${b.date}</span>
          <span>${b.read}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function openBlog(id) {
  const b = blogs.find(x => x.id === id);
  const modal = document.getElementById("modal");
  document.getElementById("modalBody").innerHTML = `
    <span class="badge">${b.category}</span>
    <h2 style="margin-top:10px">${b.title}</h2>
    <p style="font-size:13px">${b.author} • ${b.date} • ${b.read}</p>
    <img src="${b.img}" />
    <p>${b.content}</p>
    <p>${b.content}</p>
  `;
  modal.classList.add("show");
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("show");
});
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") e.target.classList.remove("show");
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.cat;
    const filtered = cat === "All" ? blogs : blogs.filter(b => b.category === cat);
    render(filtered);
  });
});

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = blogs.filter(b => b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
  render(filtered);
});

document.getElementById("themeBtn").addEventListener("click", (e) => {
  document.body.classList.toggle("dark");
  e.target.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

document.getElementById("subscribeBtn").addEventListener("click", () => {
  const email = document.getElementById("emailInput").value;
  const msg = document.getElementById("newsMsg");
  if (!email.includes("@")) {
    msg.style.color = "red";
    msg.textContent = "Please enter a valid email!";
    return;
  }
  msg.style.color = "#16a34a";
  msg.textContent = "Subscribed! Welcome to MyBlog 🎉";
  document.getElementById("emailInput").value = "";
});

render(blogs);
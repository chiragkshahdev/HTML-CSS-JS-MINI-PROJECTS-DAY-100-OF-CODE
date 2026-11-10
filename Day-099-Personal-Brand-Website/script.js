// Dark / Light Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("light");
  let btn = document.querySelector(".theme-btn");
  if (document.body.classList.contains("light")) {
    btn.innerText = "🌞 Light / Dark";
  } else {
    btn.innerText = "🌙 Dark / Light";
  }
}

// Download Resume - Demo
function downloadResume() {
  alert("Resume Download Started!\n\nReplace this with your real resume PDF link.\nExample: Add your resume.pdf file in same folder.");
}

// Filter Projects
function filterProjects(type, btn) {
  document.querySelectorAll(".filter-btns button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  let cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    if (type === "all" || card.getAttribute("data-type") === type) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Contact Form
function sendMessage() {
  let name = document.getElementById("contactName").value.trim();
  let msg = document.getElementById("contactMsg").value.trim();
  let result = document.getElementById("contactResult");

  if (name === "" || msg === "") {
    result.innerText = "Please fill name and message first!";
    result.style.color = "red";
    return;
  }

  result.innerText = "Thank you " + name + "! Your message is received. I will reply soon!";
  result.style.color = "#00FF88";
  document.getElementById("contactName").value = "";
  document.getElementById("contactMsg").value = "";
}

// Smooth Scroll for Navbar
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    let targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});
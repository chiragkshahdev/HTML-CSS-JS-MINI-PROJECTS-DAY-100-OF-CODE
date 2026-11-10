const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const icon = hamburger.querySelector("i");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    
    // icon change bars <-> xmark
    if(navLinks.classList.contains("active")){
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
    }
});
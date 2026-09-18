// Counter App Logic
let count = 0;

const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;
    
    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }

    // Color logic
    if (count > 0) {
      value.style.color = "#2ecc71"; // green
    } else if (count < 0) {
      value.style.color = "#e74c3c"; // red
    } else {
      value.style.color = "#102a42"; // black
    }

    value.textContent = count;
  });
});
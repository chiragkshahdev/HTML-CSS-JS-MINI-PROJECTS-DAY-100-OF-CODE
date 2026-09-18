const btn = document.getElementById("btn");
const colorSpan = document.getElementById("color");

function randomHex() {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
}

btn.addEventListener("click", () => {
    const newColor = randomHex();
    document.body.style.backgroundColor = newColor;
    colorSpan.textContent = newColor;
    colorSpan.style.backgroundColor = newColor + "30";
});

document.addEventListener("keydown", (e) => {
    if(e.code === "Space") btn.click();
});
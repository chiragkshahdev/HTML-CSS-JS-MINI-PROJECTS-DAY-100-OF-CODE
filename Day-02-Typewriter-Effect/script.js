const texts = ["Chirag Shah", "A Developer", "A FYBSC.IT Student", "A Coder"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector(".typwriter").textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 1500); // Wait for 1.5 seconds before typing the next text
    }
    else
    {
        setTimeout(type, 120); // Adjust typing speed here (in milliseconds)
    }
}
)
();
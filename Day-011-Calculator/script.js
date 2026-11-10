let display = document.getElementById("display");

function appendValue(val){
    display.value += val;
}

function clearDisplay(){
    display.value = "";
}

function deleteChar(){
    display.value = display.value.slice(0,-1);
}

function calculate(){
    try{
        // % ko /100 me convert
        let exp = display.value.replace(/%/g, "/100");
        display.value = eval(exp);
    } catch{
        display.value = "Error";
        setTimeout(clearDisplay, 1000);
    }
}

// Keyboard Support
document.addEventListener("keydown", (e)=>{
    if((e.key >= '0' && e.key <= '9') || ['+','-','*','/','.','%'].includes(e.key)){
        appendValue(e.key);
    }
    if(e.key === 'Enter' || e.key === '='){
        calculate();
    }
    if(e.key === 'Backspace'){
        deleteChar();
    }
    if(e.key === 'Escape'){
        clearDisplay();
    }
});
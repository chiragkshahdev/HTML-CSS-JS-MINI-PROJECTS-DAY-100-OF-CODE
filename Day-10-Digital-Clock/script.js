function updateClock(){
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    // 12 hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 ko 12 bana de

    // 0 lagana single digit me
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("ampm").textContent = ampm;

    // Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date").textContent = now.toLocaleDateString('en-IN', options);
}

setInterval(updateClock, 1000);
updateClock(); // pehli baar turant call
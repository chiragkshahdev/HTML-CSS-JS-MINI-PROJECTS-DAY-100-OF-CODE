const apiKey = "YOUR_API_KEY_HERE"; // OpenWeatherMap se lele
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const tempEl = document.getElementById('temp');
const cityEl = document.getElementById('city');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const iconEl = document.getElementById('weatherIcon');
const errorEl = document.getElementById('error');

async function checkWeather(city){
  try{
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
      errorEl.innerText = "City not found!";
      return;
    }
    
    const data = await response.json();
    
    tempEl.innerText = Math.round(data.main.temp) + "°C";
    cityEl.innerText = data.name;
    humidityEl.innerText = data.main.humidity + "%";
    windEl.innerText = data.wind.speed + " km/h";
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    errorEl.innerText = "";
    
  } catch {
    errorEl.innerText = "API Key daal pehle!";
  }
}

searchBtn.addEventListener('click', ()=>{
  if(cityInput.value.trim() !== ''){
    checkWeather(cityInput.value);
  }
});

cityInput.addEventListener('keypress', (e)=>{
  if(e.key === 'Enter') checkWeather(cityInput.value);
});
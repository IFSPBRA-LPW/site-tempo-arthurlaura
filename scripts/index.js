import { cityWeather } from "./data.js";



import { getWeatherData } from "./data.js";



async function handleSearch() {
    const input = document.querySelector("#city-input"); 
    const cityName = input.value || "Berlim";
    
    const data = await getWeatherData(cityName); 
    
    if (data) {
        orchestrerFunction(data);
        localStorage.setItem("lastCity", cityName); 
    } else {
        alert("Cidade não encontrada!");
    }
}


const lastCity = localStorage.getItem("lastCity") || "Berlim"; 
getWeatherData(lastCity).then(data => {
    if (data) orchestrerFunction(data);
});


document.querySelector("#search-button").addEventListener("click", handleSearch);

function renderBannerInfo(data) {
    const section = document.querySelector("#section-imagem");
    
    section.querySelector(".city-name").innerText = `${data.city}, ${data.country}`;
    section.querySelector(".city-date").innerText = data.date;
    section.querySelector(".temp-main").innerText = `${data.temperature}°`;
    section.querySelector(".weather-icon").innerText = data.icon;
}

function renderDayInfo(data) {    
    const container = document.querySelector("#section-dados");
    
    
    container.innerHTML = `
        <div><h5>Feels Like</h5><h3>${data.feelsLike}°</h3></div>
        <div><h5>Humidity</h5><h3>${data.humidity}%</h3></div>
        <div><h5>Wind</h5><h3>${data.wind} km/h</h3></div>
        <div><h5>Precipitation</h5><h3>${data.precipitation} mm</h3></div>
    `;
}

function renderDaily(dailyData) {
    const container = document.querySelector("#section-semanal");
    let dailyCards = ""; 

    dailyData.forEach(item => {
        
        dailyCards += `
            <div>
                <span style="font-size: 1.4rem">${item.icon}</span>
                <p>${item.day}</p>
                <p>${item.max}° ${item.min}°</p>
            </div>
        `;
    });

    container.innerHTML = dailyCards;
}

function renderHourly(hourlyData) {
    const container = document.querySelector("#section-dia");
    
    let hourlyHTML = "<h4>Hourly forecast</h4>"; 

    hourlyData.forEach(item => {
        
        hourlyHTML += `
            <div>
                <span style="font-size: 1.1rem">${item.icon}</span>                
                <p>${item.time}</p>
                <p>${item.temp}°</p>
            </div>
        `;
    });

    container.innerHTML = hourlyHTML;
}

function orchestrerFunction(data) {
    renderBannerInfo(data);
    renderDayInfo(data);
    renderDaily(data.daily);
    renderHourly(data.hourly);
}

orchestrerFunction(cityWeather);
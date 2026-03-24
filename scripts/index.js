import { getWeatherData } from "./data.js";

async function handleSearch() {
    const input = document.querySelector("#city-input"); 
    const cityName = input.value.trim();
    
    if (!cityName) return;

    const data = await getWeatherData(cityName); 
    
    if (data) {
        orchestrerFunction(data);
        localStorage.setItem("lastCity", cityName); 
        input.value = ""; 
    } else {
        alert("Cidade não encontrada!");
    }
}


document.querySelector("#search-button").addEventListener("click", handleSearch);
document.querySelector("#city-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
});


const lastCity = localStorage.getItem("lastCity") || "Braganca Paulista"; 
getWeatherData(lastCity).then(data => {
    if (data) orchestrerFunction(data);
});


function renderBannerInfo(data) {
    const section = document.querySelector("#section-imagem");
    section.querySelector(".city-name").innerText = `${data.city}, ${data.country}`;
    section.querySelector(".city-date").innerText = data.date;
    section.querySelector(".temp-main").innerText = `${data.temperature}°`;
    section.querySelector(".weather-icon").innerHTML = `<img src="${data.icon}" alt="Weather Icon">`;
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
    container.innerHTML = dailyData.map(item => `
        <div>
            <img src="${item.icon}" alt="Icon" width="40">
            <p>${item.day}</p>
            <p>${item.max}° ${item.min}°</p>
        </div>
    `).join("");
}

function renderHourly(hourlyData) {
    const container = document.querySelector("#section-dia");
    let hourlyHTML = "<h4>Hourly forecast</h4>"; 
    hourlyData.forEach(item => {
        hourlyHTML += `
            <div>
                <img src="${item.icon}" alt="Icon" width="30">
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
export const cityWeather = {
 city: "Berlim",
 country: "Germany",
 date: "Tuesday, Aug 5, 2025",
 icon: "☀",
 temperature: 20,
 feelsLike: 18,
 humidity: 46,
 wind: 14,
 precipitation: 0,


 
    daily: [
        { day: "Wed", icon: "🌧", max: 21, min: 15 },
        { day: "Thu", icon: "☀", max: 24, min: 14 },
        { day: "Fri", icon: "☁", max: 25, min: 13 },
        { day: "Sat", icon: "⛈", max: 21, min: 15 },
        { day: "Sun", icon: "☁", max: 25, min: 16 },
        { day: "Mon", icon: "🌫", max: 24, min: 15 },
        { day: "Tue", icon: "🌧", max: 20, min: 14 },
        ],



    hourly: [
        { icon: "🌧", time: "4 PM", temp: 20 },
        { icon: "🌧", time: "5 PM", temp: 20 },
        { icon: "🌧", time: "6 PM", temp: 19 },
        { icon: "🌧", time: "7 PM", temp: 18 },
        { icon: "🌧", time: "8 PM", temp: 18 },
        { icon: "🌧", time: "9 PM", temp: 17 },
        { icon: "🌧", time: "10 PM", temp: 17 },
        { icon: "🌧", time: "3 PM", temp: 20 },
        ],
};


import { b435022dbef74b6eb0d181342261703 } from "./config.js";



async function fetchWeather(city) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`,
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
    }
    
    return response.json();
}




    import { API_KEY } from "./config.js";

    export async function getWeatherData(city = "Berlim") {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`; 

    try {
        const response = await fetch(url); 
        if (!response.ok) throw new Error("Erro ao buscar dados"); 
        
        const apiData = await response.json(); 

        return{
            city: apiData.location.name,
            country: apiData.location.country,
            date: apiData.location.localtime,
            icon: apiData.current.condition.icon,
            temperature: Math.round(apiData.current.temp),
            feelsLike: Math.round(apiData.current.feelslike_c),
            humidity: apiData.current.humidity,
            wind: apiData.current.wind_kph,
            precipitation: apiData.current.precip_mm,


            daily: apiData.forecast.forecastday.map(day => ({
                day: new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' }),
                icon: day.day.condition.icon,
                max: Math.round(day.day.maxtemp_c),
                min: Math.round(day.day.mintemp_c)
            })),


            hourly: apiData.forecast.forecastday[0].hour.slice(0, 8).map(hour => ({
                icon: hour.condition.icon,
                time: hour.time.split(" ")[1],
                temp: Math.round(hour.temp_c),
            }))


            };
        } catch (error) {
            console.error(error);
        return null;
    }
}

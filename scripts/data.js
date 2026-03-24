import { API_KEY } from "./config.js";


async function fetchWeather(city) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=pt`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar dados da API"); 
    }
    
    return response.json();
}


export async function getWeatherData(city = "Berlim") {
    try {
        const apiData = await fetchWeather(city); 

        
        return {
            city: apiData.location.name,
            country: apiData.location.country,
            date: apiData.location.localtime,
       
            icon: `https:${apiData.current.condition.icon}`,
            temperature: Math.round(apiData.current.temp_c),
            feelsLike: Math.round(apiData.current.feelslike_c),
            humidity: apiData.current.humidity,
            wind: apiData.current.wind_kph,
            precipitation: apiData.current.precip_mm,

            daily: apiData.forecast.forecastday.map(day => ({
                day: new Date(day.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'short' }),
                icon: `https:${day.day.condition.icon}`,
                max: Math.round(day.day.maxtemp_c),
                min: Math.round(day.day.mintemp_c)
            })),

            hourly: apiData.forecast.forecastday[0].hour.slice(0, 8).map(hour => ({
                icon: `https:${hour.condition.icon}`,
                time: hour.time.split(" ")[1],
                temp: Math.round(hour.temp_c),
            }))
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}
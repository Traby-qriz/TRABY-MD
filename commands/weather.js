// src/commands/weather.js

const axios = require('axios');

module.exports = async (client, message) => {
    if (message.body.startsWith('!weather')) {
        const city = message.body.split(' ').slice(1).join(' ');

        if (!city) {
            return message.reply('Please provide a city name.');
        }

        try {
            const apiKey = 'YOUR_OPENWEATHER_API_KEY';
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const weatherData = response.data;

            const weatherMessage = `*Weather in ${weatherData.name}:* ${weatherData.main.temp}°C\nCondition: ${weatherData.weather[0].description}.`;
            message.reply(weatherMessage);
        } catch (error) {
            message.reply("Could not fetch weather data. Make sure the city name is valid.");
        }
    }
};
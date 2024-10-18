// src/commands/googleSearch.js

const axios = require('axios');

module.exports = async (client, message) => {
    if (message.body.startsWith('!google')) {
        const searchQuery = message.body.split(' ').slice(1).join(' ');
        const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=YOUR_GOOGLE_API_KEY&cx=YOUR_SEARCH_ENGINE_ID&q=${searchQuery}`);

        const result = response.data.items[0];
        const reply = `Title: ${result.title}\nLink: ${result.link}`;
        message.reply(reply);
    }
};
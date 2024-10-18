// src/commands/dailyQuote.js

const axios = require('axios');

module.exports = async (client, message) => {
    if (message.body.startsWith('!quote')) {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            const quote = response.data.content;
            const author = response.data.author;
            message.reply(`*${quote}* - _${author}_`);
        } catch (error) {
            message.reply("Sorry, I couldn't fetch a quote at this time.");
        }
    }
};
// src/commands/jokesMaker.js

module.exports = (client, message) => {
    if (message.body.startsWith('!joke')) {
        // Replace this with an actual joke-fetching logic
        const joke = "Why did the scarecrow win an award? Because he was outstanding in his field!";
        message.reply(joke);
    }
};
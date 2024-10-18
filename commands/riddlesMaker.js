// src/commands/riddlesMaker.js

module.exports = (client, message) => {
    if (message.body.startsWith('!riddle')) {
        // Replace this with riddle logic
        const riddle = "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?";
        message.reply(riddle);
    }
};
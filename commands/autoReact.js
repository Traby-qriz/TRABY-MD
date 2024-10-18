// src/commands/autoReact.js

module.exports = (client, message) => {
    if (message.body.includes('hello')) {
        message.react('😊');
    }
};
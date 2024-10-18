// src/commands/ownerInfo.js

module.exports = (client, message) => {
    if (message.body.startsWith('!owner')) {
        message.reply(`Owner info: Name: Your Name, Contact: Your Contact Info`);
    }
};
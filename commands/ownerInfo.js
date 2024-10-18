// src/commands/ownerInfo.js

module.exports = (client, message) => {
    if (message.body.startsWith('!owner')) {
        message.reply(`Owner info: Name: Traby qriz, Contact: 254732982940 `);
    }
};
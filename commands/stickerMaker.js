// src/commands/stickerMaker.js

const { MessageMedia } = require('whatsapp-web.js');

module.exports = (client, message) => {
    if (message.body.startsWith('!sticker') && message.hasMedia) {
        const media = message.media;
        const sticker = MessageMedia.fromFilePath(media.url);
        client.sendMessage(message.from, sticker, { sendMediaAsSticker: true });
    }
};
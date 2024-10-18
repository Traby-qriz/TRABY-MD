// src/commands/youtubeDownloader.js

const ytdl = require('ytdl-core');

module.exports = async (client, message) => {
    if (message.body.startsWith('!yt ')) {
        const url = message.body.split(' ')[1];
        const stream = ytdl(url, { filter: 'audioonly' });
        
        client.sendMessage(message.from, stream, { sendAudioAsVoice: true });
    }
};
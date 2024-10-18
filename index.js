// src/index.js

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const autoStatus = require('./commands/autoStatus');
const autoReact = require('./commands/autoReact');
const antiDelete = require('./commands/antiDelete');
const googleSearch = require('./commands/googleSearch');
const jokesMaker = require('./commands/jokesMaker');
const stickerMaker = require('./commands/stickerMaker');
const riddlesMaker = require('./commands/riddlesMaker');
const youtubeDownloader = require('./commands/youtubeDownloader');
const songDownloader = require('./commands/songDownloader');
const ownerInfo = require('./commands/ownerInfo');

const client = new Client();

// Generate QR code for authentication
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Bot ready
client.on('ready', () => {
    console.log('TRABY-MD is ready!');
});

// Handle incoming messages
client.on('message', message => {
    autoStatus(client, message);
    autoReact(client, message);
    antiDelete(client, message);
    googleSearch(client, message);
    jokesMaker(client, message);
    stickerMaker(client, message);
    riddlesMaker(client, message);
    youtubeDownloader(client, message);
    songDownloader(client, message);
    ownerInfo(client, message);
});

// Start the client
client.initialize();
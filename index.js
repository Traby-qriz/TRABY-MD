// src/index.js

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const autoStatus = require('./commands/autoStatus.js');
const autoReact = require('./commands/autoReact.js');
const antiDelete = require('./commands/antiDelete.js');
const googleSearch = require('./commands/googleSearch.js');
// Import other commands as needed

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('TRABY-MD is ready!');
});

client.on('message', message => {
    autoStatus(client, message);
    autoReact(client, message);
    antiDelete(client, message);
    googleSearch(client, message);
    // Call other command handlers similarly
});

// Start the client
client.initialize();
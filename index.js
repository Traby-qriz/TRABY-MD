// src/index.js

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

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

const SESSION_FILE_PATH = './session.json'; // File to store the session
let session;

// Load session from the file if it exists
if (fs.existsSync(SESSION_FILE_PATH)) {
    session = require(SESSION_FILE_PATH);
}

// Check if the user wants to scan a QR code or using the existing session
if (session) {
    client.loadAuthInfo(session); // Load the existing session
} else {
    console.log('No session file found. Please scan the QR code to authenticate.');
}

// Event for QR code generation
client.on('qr', (qr) => {
    console.log('QR RECEIVED, please scan it:');
    qrcode.generate(qr, { small: true }); // Display QR code in the terminal
});

// Event for successful authentication
client.on('authenticated', (sessionData) => {
    console.log('Authenticated successfully!');
    session = sessionData; // Save the session data
    fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session)); // Store it for future use
});

// Event for authentication failure
client.on('auth_failure', () => {
    console.error('Authentication failed! Please delete session.json and try again.');
});

// Event when client is ready
client.on('ready', () => {
    console.log('TRABY-MD is ready to respond!');
});

// Handle incoming messages
client.on('message', (message) => {
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

// Start the WhatsApp client
client.initialize();

// Handle client disconnection
client.on('disconnected', (reason) => {
    console.log('Client was logged out:', reason);
});
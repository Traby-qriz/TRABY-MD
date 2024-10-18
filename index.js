// TRABY-MD/index.js

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
const menu = require('./commands/menu');
const dailyQuote = require('./commands/dailyQuote');
const weather = require('./commands/weather');
const poll = require('./commands/poll');
const guessNumber = require('./commands/guessNumber');

const client = new Client();

const SESSION_FILE_PATH = './session.json'; // File to store session
let session;

// Load session from the file if it exists
if (fs.existsSync(SESSION_FILE_PATH)) {
    session = require(SESSION_FILE_PATH);
}

// Authenticate with session or prompt for QR code scan
if (session) {
    client.loadAuthInfo(session); // Load existing session
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

// Handle incoming messages (including pairing code)
client.on('message', (message) => {
    // Check for pairing code command
    if (message.body.startsWith('!pair ')) {
        const pairCode = message.body.split(' ')[1];

        // Assuming you have logic to validate and use the pairing code
        // Here we would just log the pairing code as an example
        console.log(`Pairing code received: ${pairCode}`);
        message.reply('Pairing code received! (Note: Pairing code functionality is not fully implemented in this context.)');
        return;
    }
    
    // Other command handlers
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
    menu(client, message); // Menu command
    dailyQuote(client, message); // Daily quote command
    weather(client, message); // Weather command
    poll(client, message); // Poll command
    guessNumber(client, message); // Guessing game command
});

// Start the WhatsApp client
client.initialize();

// Handle client disconnection
client.on('disconnected', (reason) => {
    console.log('Client was logged out:', reason);
});
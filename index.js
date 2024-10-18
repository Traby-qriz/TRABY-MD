// TRABY-MD/index.js

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// WhatsApp client initialization
const client = new Client();
const SESSION_DIR = path.resolve(__dirname, 'sessions'); // Directory for session files
const SESSION_FILE_PATH = path.join(SESSION_DIR, 'session.json'); // Default session file
let session;

// Create a Sessions directory if it doesn't exist
if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR);
}

// Load session from the file if it exists
if (fs.existsSync(SESSION_FILE_PATH)) {
    session = require(SESSION_FILE_PATH);
    client.loadAuthInfo(session);
}

// Authenticate with session or prompt for QR code scan
if (!session) {
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
    session = sessionData;
    fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session)); // Store session for future use
});

// Event for authentication failure
client.on('auth_failure', () => {
    console.error('Authentication failed! Please delete session.json and try again.');
});

// Event when client is ready
client.on('ready', () => {
    console.log('TRABY-MD is ready to respond!');
});

// Handle incoming messages for loading sessions
client.on('message', (message) => {
    // Handle loading a session using a pairing-like command
    if (message.body.startsWith('!loadsession ')) {
        const sessionId = message.body.split(' ')[1];
        const sessionFilePath = path.join(SESSION_DIR, `session_${sessionId}.json`);

        if (fs.existsSync(sessionFilePath)) {
            session = require(sessionFilePath);
            client.loadAuthInfo(session);
            message.reply(`Session ${sessionId} loaded successfully!`);
            console.log(`Session ${sessionId} loaded!`);
        } else {
            message.reply(`No session found for ID: ${sessionId}. Please check and retry.`);
        }
        return;
    }

    // Command Handlers
    if (message.body.startsWith('!status')) {
        autoStatus(client, message);
    } else if (message.body.startsWith('!react')) {
        autoReact(client, message);
    } else if (message.body.startsWith('!antidelete')) {
        antiDelete(client, message);
    } else if (message.body.startsWith('!google')) {
        googleSearch(client, message);
    } else if (message.body.startsWith('!joke')) {
        jokesMaker(client, message);
    } else if (message.body.startsWith('!sticker')) {
        stickerMaker(client, message);
    } else if (message.body.startsWith('!riddle')) {
        riddlesMaker(client, message);
    } else if (message.body.startsWith('!youtube')) {
        youtubeDownloader(client, message);
    } else if (message.body.startsWith('!song')) {
        songDownloader(client, message);
    } else if (message.body.startsWith('!owner')) {
        ownerInfo(client, message);
    } else if (message.body.startsWith('!menu')) {
        menu(client, message);
    } else if (message.body.startsWith('!quote')) {
        dailyQuote(client, message);
    } else if (message.body.startsWith('!weather')) {
        weather(client, message);
    } else if (message.body.startsWith('!poll')) {
        poll(client, message);
    } else if (message.body.startsWith('!guess')) {
        guessNumber(client, message);
    }
});

// Start the WhatsApp client
client.initialize();

// Handle client disconnection
client.on('disconnected', (reason) => {
    console.log('Client was logged out:', reason);
});

// Import command modules
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
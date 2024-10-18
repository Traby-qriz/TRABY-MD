// index.js for WhatsApp Bot

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // To display QR code in the terminal
const fs = require('fs');
const path = require('path');

// Set session directory
const SESSION_DIR = path.resolve(__dirname, 'sessions');

// Create session directory if it doesn't exist
if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR);
}

// Initialize the WhatsApp client
const client = new Client();

// Event for QR code generation
client.on('qr', (qr) => {
    console.log('QR RECEIVED, please scan it:');
    // Generate QR code in the terminal
    qrcode.generate(qr, { small: true });
});

// Event for successful authentication
client.on('authenticated', (sessionData) => {
    console.log('Authenticated successfully!');

    // Save session data to a JSON file (for later use)
    const clientId = sessionData.wid.user; // Use the user's WhatsApp ID as client ID
    fs.writeFileSync(`${SESSION_DIR}/session_${clientId}.json`, JSON.stringify(sessionData));

    // Send pairing code (user ID) back to the client
    client.sendMessage(clientId, `Your pairing code is: ${clientId}`);
});

// Handle authentication failure
client.on('auth_failure', () => {
    console.error('Authentication failed! Please scan the QR code again.');
});

// Command Handler
client.on('message', async (message) => {
    // Ignore messages from the bot itself to prevent loops
    if (message.from === client.info.wid.user) return;

    const command = message.body.split(' ')[0]; // Get the first word as command

    switch (command) {
        case '!help':
            await client.sendMessage(message.from, 'Available commands: \n!help - List available commands\n!ping - Check if the bot is alive\n!session - Get your session ID');
            break;

        case '!ping':
            await client.sendMessage(message.from, 'Pong! 🤖');
            break;

        case '!session':
            const clientId = sessionData.wid.user; // Send the user ID (pairing code)
            await client.sendMessage(message.from, `Your session ID is: ${clientId}`);
            break;

        default:
            await client.sendMessage(message.from, 'Unknown command. Type !help for a list of available commands.');
            break;
    }
});

// Event when the client is ready
client.on('ready', () => {
    console.log('Bot is ready!');
});

// Start the WhatsApp client
client.initialize();

// Disconnect event
client.on('disconnected', (reason) => {
    console.log('Client was logged out:', reason);
});
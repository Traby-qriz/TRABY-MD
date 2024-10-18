const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');

const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('TRABY-MD is ready! Managed by Casper Tech, led by Casper Qriz');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

const startClient = async () => {
    console.log('Starting TRABY-MD...');
    await client.initialize();

    setTimeout(() => {
        if (!client.info) {
            rl.question('Choose authentication method:\n1. Scan QR Code\n2. Use Pairing Code\nEnter your choice (1 or 2): ', async (choice) => {
                if (choice === '1') {
                    console.log('Please scan the QR code displayed earlier.');
                } else if (choice === '2') {
                    rl.question('Enter your phone number with country code (e.g., 12345678901): ', async (phoneNumber) => {
                        try {
                            const code = await client.requestPairingCode(phoneNumber);
                            console.log(`Your pairing code: ${code}`);
                            console.log('Please enter this code in WhatsApp mobile app.');
                        } catch (error) {
                            console.error('Failed to request pairing code:', error);
                            process.exit(1);
                        }
                    });
                } else {
                    console.log('Invalid choice. Please restart the bot and try again.');
                    process.exit(1);
                }
            });
        }
    }, 10000);
};

startClient();

process.on('SIGINT', async () => {
    console.log('SIGINT received. Stopping TRABY-MD...');
    await client.destroy();
    rl.close();
    process.exit(0);
});

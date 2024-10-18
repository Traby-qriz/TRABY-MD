const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");
   const P = require("pino");
   const qrcode = require("qrcode-terminal");

   async function connectToWhatsApp() {
       const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");
       const sock = makeWASocket({
           printQRInTerminal: true,
           auth: state,
           logger: P({ level: "silent" }),
       });

       sock.ev.on("connection.update", (update) => {
           const { connection, lastDisconnect } = update;
           if (connection === "close") {
               const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
               console.log("connection closed due to ", lastDisconnect.error, ", reconnecting ", shouldReconnect);
               if (shouldReconnect) {
                   connectToWhatsApp();
               }
           } else if (connection === "open") {
               console.log("TRABY-MD is ready! Managed by Casper Tech, led by Casper Qriz");
           }
       });

       sock.ev.on("creds.update", saveCreds);

       sock.ev.on("messages.upsert", async (m) => {
           const msg = m.messages[0];
           if (!msg.key.fromMe && m.type === "notify") {
               console.log("Got a message!", msg.key.remoteJid);
               if (msg.message?.conversation === "!ping") {
                   await sock.sendMessage(msg.key.remoteJid, { text: "pong" });
               }
           }
       });
   }

   connectToWhatsApp();

// src/commands/menu.js

module.exports = (client, message) => {
    if (message.body.startsWith('!menu')) {
        const menuMessage = `
        *Available Commands:*
        1. **!joke** - Get a random joke
        2. **!google [search term]** - Search Google
        3. **!sticker** - Convert media to sticker
        4. **!riddle** - Get a riddle to solve
        5. **!yt [video link]** - Download a YouTube video
        6. **!song [song name]** - Download a song
        7. **!owner** - Get owner information
        8. **!help** - Show this menu
        `;
        message.reply(menuMessage);
    }
};
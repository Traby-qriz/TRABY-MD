// src/commands/antiDelete.js

client.on('message_reaction', (reaction) => {
    // Logic to handle anti-delete
    if (reaction.emoji === '📌') {
        reaction.message.reply('This message cannot be deleted!');
    }
});
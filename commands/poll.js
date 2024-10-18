// src/commands/poll.js

module.exports = (client, message) => {
    if (message.body.startsWith('!poll')) {
        const pollQuestion = message.body.slice(6); // Get the question after "!poll "

        if (!pollQuestion) {
            return message.reply('Please provide a poll question.');
        }

        const pollMessage = `*Poll:* ${pollQuestion}\nReact with 👍 for Yes or 👎 for No.`;
        client.sendMessage(message.from, pollMessage);
    }
};
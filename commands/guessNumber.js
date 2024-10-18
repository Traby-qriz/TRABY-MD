// src/commands/guessNumber.js

const randomNumber = Math.floor(Math.random() * 100) + 1; // 1-100
let userGuesses = {};

module.exports = (client, message) => {
    if (message.body.startsWith('!guess')) {
        const userId = message.from;
        
        if (!userGuesses[userId]) {
            userGuesses[userId] = { number: randomNumber, attempts: 0 };
            message.reply('Guess a number between 1 and 100!');
        } else {
            const guess = parseInt(message.body.split(' ')[1]);
            userGuesses[userId].attempts++;

            if (guess === userGuesses[userId].number) {
                message.reply(`Congratulations! You guessed the number ${userGuesses[userId].number} in ${userGuesses[userId].attempts} attempts!`);
                delete userGuesses[userId]; // Reset the game for the user
            } else if (guess < userGuesses[userId].number) {
                message.reply('Too low! Try again.');
            } else {
                message.reply('Too high! Try again.');
            }
        }
    }
};
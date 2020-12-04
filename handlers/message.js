const { Message } = require('discord.js');
const {client} = require('../index');

client.on('message', message => {
    if (message.author.bot) return;
    message.reply('hoi')
})
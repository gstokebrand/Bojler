const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./token.json');

const client = new Discord.Client();

console.log('Starting Bojler...');
//Fetch all event handlers
require("./manifest")(client);

module.exports = {
    client: client
}

client.login(token);
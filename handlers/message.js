const Discord = require('discord.js');
const fs = require('fs');
const {client} = require('../index');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const table = [];
console.log(`Loading ${commandFiles.length} commands...`);
for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
    table.push({Filename: `${file}`, Command: `${command.name}`, Description: `${command.description}`, Loaded: '✔'});
}
console.log('\nCommands:');
console.table(table);

prefix = '.';


client.on('message', message => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    if (message.channel.type == 'dm') return message.reply('I only execute commands inside servers!');
    //Get args and command from message content
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    //Try to execute given command
    try {
        client.commands.get(command).execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})
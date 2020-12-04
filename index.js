const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();


//Fetch all event handlers
require("./manifest")(client);
// fs.readdir('./events/', (err, files) => {
//     if (err) return console.error(err);
//     files.forEach(file => {
//         const eventFunction = require(`./events/${file}`); // Here we require the event file of the events folder
//         if (eventFunction.disabled) return; // Check if the eventFunction is disabled. If yes return without any error

//         const event = eventFunction.event || file.split('.')[0]; // Get the exact name of the event from the eventFunction variable. If it's not given, the code just uses the name of the file as name of the event
//         const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; // Here we define our emitter. This is in our case the client (the bot)
//         const once = eventFunction.once; // A simple variable which returns if the event should run once

//         // Try catch block to throw an error if the code in try{} doesn't work
//         try {
//             emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args)); // Run the event using the above defined emitter (client)
//         } catch (error) {
//             console.error(error.stack); // If there is an error, console log the error stack message
//         }
//     });
// });


//Fetch all command files
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     client.commands.set(command.name, command);
//     console.log(`Registering command file: ${file}`.yellow, `\n    ${command.description}`);
// }
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Registering command file: ${file}\n    ${command.description}`);
}

prefix = '!';

client.on('message', message => {
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})

module.exports = {
    client: client
}

client.login('')

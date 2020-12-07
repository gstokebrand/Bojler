const Discord = require('discord.js');
const {client} = require('../index');

module.exports = {
    name: 'ping',
    description: 'Gives bot and API latency',
    async execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Calculating...')
            .setColor('#FFB02D');
        message.channel
            .send(embed)
            .then((resultmsg) => {
                const botping = resultmsg.createdTimestamp - message.createdTimestamp;
                const embed = new Discord.MessageEmbed()
                .setTitle('🏓 Pong!')
                .addField('Bot latency: ', `${botping} ms`)
                .addField('API latency: ', `${client.ws.ping} ms`)
                .setColor('#FFB02D');
                resultmsg
                    .edit({embed: embed})
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }
}
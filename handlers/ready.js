const {client} = require('../index');

client.on('ready', () => {
    console.log(`\nBojler is ready at: ${client.user.tag}`);
})
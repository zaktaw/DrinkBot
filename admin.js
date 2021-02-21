const Discord = require('discord.js');
const fs = require('fs'); 
const config = require('./config.json');

// initial embed
const EMBED = new Discord.MessageEmbed()
    .setTitle('Dinks consumed')
    .setDescription('No drinks consumed')
    .setColor(0xE5FF00);

// make a new embed on the Discord channel
function makeEmbed(msg) {
    msg.channel.send(EMBED) // send embed to channel
        .then(message => { // update the embedID in the config file with the ID of this embed
            let configFile = config;
            configFile.embedID = message.id;
            configFile = JSON.stringify(configFile);
            fs.writeFileSync('./hiddenConfig.json', configFile);
        });
}

// deletes a specified number of messages from the channel
function bulkDelete(msg, noOfMessages) {
    msg.channel.bulkDelete(noOfMessages)
        .catch(err => console.log(err)); // throws error if attempting to delete messages older than two weeks
}

// reset embed on the Discord channel back to default
function resetEmbed(msg) {
    msg.channel.messages.fetch(config.embedID)
        .then((message) => {
            message.edit(EMBED);
            msg.channel.send('Database was successfully reset').then(message => message.delete( {timeout: 1000} ))
        });
}

module.exports = {
    makeEmbed,
    bulkDelete,
    resetEmbed
}
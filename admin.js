const Discord = require('discord.js');
const fs = require('fs'); 
const embedID = require('./embedID.json');
const database = require('./database/database.js');
const user = require('./user.js');

// initial embed
const EMBED = new Discord.MessageEmbed()
    .setTitle('Drinks consumed')
    .setDescription('No drinks consumed')
    .setColor(0xE5FF00);

// make a new embed on the Discord channel
function makeEmbed(msg) {
    msg.channel.send(EMBED) // send embed to channel
        .then(message => { 
            // update the embedID in the config file with the ID of this embed
            let embedID_json_file = embedID;
            embedID_json_file.embedID = message.id;
            embedID_json_file = JSON.stringify(embedID_json_file);
            fs.writeFileSync('./embedID.json', embedID_json_file);

            // update embed with drinks from database
            database.getUsers().then(users => user.updateEmbed(users, msg));
        });
}

// reset embed on the Discord channel back to default
function resetEmbed(msg) {
    msg.channel.messages.fetch(embedID.embedID)
        .then((message) => {
            message.edit(EMBED);
            msg.channel.send('Database was successfully reset').then(message => message.delete( {timeout: 1000} ))
        });
}

module.exports = {
    makeEmbed,
    resetEmbed
}
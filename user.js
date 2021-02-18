const database = require('./database/database.js');
const Discord = require('discord.js');
const config = require('./hiddenConfig.json');

// default embed
const EMBED = new Discord.MessageEmbed()
    .setTitle('Dinks consumed')
    .setColor(0xE5FF00);


async function addDrink(msg) {
    let title = msg.content;
    let user = msg.author.username;

    await database.addDrink(title, user);  
    database.getDrinks()
        .then(drinks => updateEmbed(drinks, msg));
}

function updateEmbed(drinks, msg) {
    let updatedEmbed = EMBED;

    drinks.forEach(drink => updatedEmbed.addField(drink.user, drink.title));

    msg.channel.messages.fetch(config.embedID)
        .then((message) => message.edit(updatedEmbed));
}

module.exports = {
    addDrink
}
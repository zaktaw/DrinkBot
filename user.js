const database = require('./database/database.js');
const Discord = require('discord.js');
const config = require('./hiddenConfig.json');

// default embed
const EMBED = new Discord.MessageEmbed()
    .setTitle('Dinks consumed')
    .setColor(0xE5FF00);


async function addDrink(msg) {
    let user = msg.author;
    let drink = msg.content;

    await database.addDrink(user, drink);
    database.getDrinks().then(d => console.log(d));
}

function updateEmbed(drinks, msg) {
    let updatedEmbed = EMBED;

    drinks.forEach(drink => updatedEmbed.addField(drink.user, drink.title));

    msg.channel.messages.fetch(config.embedID)
        .then((message) => message.edit(updatedEmbed));
}

module.exports = {
    addDrink,
    updateEmbed
}
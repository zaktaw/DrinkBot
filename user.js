const database = require('./database/database.js');
const Discord = require('discord.js');
const config = require('./hiddenConfig.json');

async function addDrink(msg) {
    let user = msg.author;
    let drink = msg.content;

    await database.addDrink(user, drink);
    database.getUsers().then(users => updateEmbed(users, msg));
}

function updateEmbed(users, msg) {
    
    const updatedEmbed = new Discord.MessageEmbed()
        .setTitle('Dinks consumed')
        .setColor(0xE5FF00);
    
        users.forEach(user => updatedEmbed.addField(user.name, makeDrinksString(user.drinks)));

    msg.channel.messages.fetch(config.embedID)
        .then((message) => message.edit(updatedEmbed));
}

function makeDrinksString(drinks) {
    output = drinks[0];

    for (i=1; i<drinks.length; i++) {
        output += ', ' + drinks[i];
    }

    return output;
}

module.exports = {
    addDrink,
    updateEmbed
}
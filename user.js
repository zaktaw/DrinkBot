const database = require('./database/database.js');
const Discord = require('discord.js');
const config = require('./hiddenConfig.json');

// add drink to the database => get all items from database => update embed
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

// make a string of a user's drinks in the following format: 'drink1, drink2, drink2'
function makeDrinksString(drinks) {
    output = drinks[0];

    for (i=1; i<drinks.length; i++) {
        output += ', ' + drinks[i];
    }

    return output;
}

async function deleteUserLastDrink(msg) {
    await database.deleteUserLastDrink(msg.author);
    database.getUsers().then(users => updateEmbed(users, msg));
}

async function deleteUserAllDrinks(msg) {
    await database.deleteUserAllDrinks(msg.author);
    database.getUsers().then(users => updateEmbed(users, msg));
}

module.exports = {
    addDrink,
    updateEmbed,
    deleteUserLastDrink,
    deleteUserAllDrinks
}
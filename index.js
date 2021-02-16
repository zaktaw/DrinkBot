const Discord = require('discord.js');
const config = require('./hiddenConfig.json');
const admin = require('./admin.js');
const database = require('./database/database.js');
const bot = new Discord.Client();

const DRINKS_CHANNEL_ID = config.drinksChannelID;

bot.on('ready', () => {
    console.log("Bot is online!");
}); 

database.initDB();

bot.login(config.token);

bot.on('message', (msg) => {
    
    let args = msg.content.split(" ");

    // Prevent spam from bot
    if (msg.author.bot) return; // stops bot from replying to itself
    if (!msg.guild) return; // bot will only reply if message is sent in the guild (server)

    if (msg.channel.id != DRINKS_CHANNEL_ID) return; //Bot will only reply in specified channel
    
    // handle admin commands
    // author of message has to have admin permissions and the first argument of the command needs to be 'admin'
    if (msg.member.hasPermission('ADMINISTRATOR') && args[0].toLowerCase() == 'admin') {

        // Handle arguments given
        switch (args[1].toLowerCase()) {

            case 'embed' :
                admin.makeEmbed(msg);
                break;

            case 'delete' :
                admin.bulkDelete(msg, args[2]);
                break;

            case 'get' :
                database.getDrinks();
                break;

            case 'reset' :
                database.resetDatabase();
                break;

            default :
                msg.channel.send(`"${args[1]}" is an invalid admin command.`);
        }   
    }

    else {
        // add drink to database, then get drinks
        addDrink(msg.content, msg.author.username);
    }
});

async function addDrink(title, username) {
    await database.addDrink(title, username);
    let drinks = await database.getDrinks();
    drinks.forEach(a => console.log(a.user + " added " + a.title));
}

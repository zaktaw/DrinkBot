const Discord = require('discord.js');
const config = require('./config.json');
const admin = require('./admin.js');
const user = require('./user.js');
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

        switch (args[1].toLowerCase()) {
            
            case 'embed' :
                admin.makeEmbed(msg);
                break;

            case 'reset' :
                database.resetDatabase();
                admin.resetEmbed(msg);
                break;

            default :
                msg.channel.send(`"${args[1]}" is an invalid admin command.`)
                    .then(message => message.delete( {timeout: 1000} ))
        }   
    }

    // handle messages from users
    else {
        
        switch (args[0].toLowerCase()) {

            // delete user's last drink
            case 'undo' :
                user.deleteUserLastDrink(msg);
                break;

            //delete all drinks from user
            case 'deleteall' :
                user.deleteUserAllDrinks(msg);
                break;

            default :
                user.addDrink(msg)
        }
    }   

    msg.delete()
        .catch(console.error);
});


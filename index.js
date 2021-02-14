const Discord = require('discord.js');
const config = require('./hiddenConfig.json');
const admin = require('./admin.js');
const bot = new Discord.Client();

const DRINKS_CHANNEL_ID = config.drinksChannelID;

bot.on('ready', () => {
    console.log("Bot is online!");
}); 

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

            default :
                msg.channel.send(`"${args[1]}" is an invalid command.`);
    }   

    }
});
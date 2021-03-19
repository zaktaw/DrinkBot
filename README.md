# DrinkBot

A Discord bot for virtual parties that allows users to show what they are drinking and see what other users are drinking.

## Installation

Requires Node.js (version 12.0.0 or newer), NPM and mongodb.

    git clone https://github.com/zaktaw/DrinkBot.git
    cd DrinkBot
    npm init
    npm install

## Setup

PartyRoulette is a self hosted bot, so you need to create a new application on Discord Developer Portal (https://discord.com/developers/) to obtain a token for the bot. 

### Set up environment variables

    export DRINK_BOT_TOKEN="YOUR_TOKEN"
    export DRINK_BOT_CHANNEL_ID="YOUR_CHANNEL_ID"

Replace YOUR_TOKEN with your actual bot token and YOUR_CHANNEL_ID with the ID of the channel the bot should respond in.
For Windows users, use set instead of export.

### Add bot to server

To add the bot your server go to this site:

    https://discordapi.com/permissions.html

1. Choose to give the bot administrator permissions.  
2. Copy your clinet ID from Discord Developer Portal into the client ID field and click on the generated link beneath it.
3. Chose your server and authorize the bot.

The bot is now ready to be used!

## Usage

In a terminal navigate to the root folder and  start the bot with 

    node .

To make the embed that will display drinks, go to the same text channel you used for the drinksChannelID. You can only make the embed if you are the admin of the server. Use the following command:

    admin embed

To add drinks to the embed simply write the name of the drink in the chat, no prefixes needed. For example:

    Beer (1 pint)

Users can delete their with the following commands:

    undo # delete last drink
    deleteAll # delete all drinks

To reset the database to inital state (delete all items) use the following command as an admin user:

    admin reset
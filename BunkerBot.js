//For bot token & other environment stuff.
require('dotenv').config();

//I think this might get used somewhere.
require('math');

//Discord requirements.
const Discord = require('discord.js');
const Bot = new Discord.Client();

//For loading command files.
const fs = require('fs');

//Using Enmap for database functions to keep it simple.
const Enmap = require('enmap');

//For emoji functionality, since the clients I've found don't support emojis in vim.
const emoji = require('node-emoji');

//Provides db.serverConfig and db.bunkers structures.
const db = require('./modules/db.js');

//Load available BunkerBot commands.
const commands = {};
const files = fs.readdirSync('./commands');
const filesjs = files.filter(file => file.endsWith('.js'));

//Preload an initial helptext value.
var helptext = '-bb: Displays this help dialog. \n';

//Read command files.
filesjs.forEach(commandFile => {
  const command = require(`./commands/${commandFile)`);
  if (command.prefix && command.fn) {
    commands[command.prefix] = command.fn;
    helptext += command.helptext + `\n`;
  }
});

//Log our bot into Discord. 
const Token = process.env.BBTOKEN;
Bot.login(Token);

//Initialize bot actions.

//Bot successfully logged in.
Bot.on('ready'), () => {
  console.info(`Logged in as ${Bot.user.tag}`.);
});

//Bot booted from server: Lets clean the DB.
Bot.on('guildDelete', guild => {
  db.serverConfig.delete(guild.id);
  db.bunkers.delete(guild.id);
});

//Message posted to Discord that the bot can see.
Bot.on('message', msg => {
  //Get prefix & command.
  const prefix = msg.content.split(' ')[0];
  const command = msg.content.split(' ')[1];
  
  if (prefix ===db.serverConfig.get(msg.guild.id, 'prefix')) {
    if (!command || (command == 'help')) {
      msg.reply({embed: {
        color: '#0099ff',
        title: "BunkerBot Commands:',
        description: `${helptext}`,
        footer: {text: 'BunkerBot by matt2518' }
      }});
      return;
    };
    commands[command](msg);
  };
});

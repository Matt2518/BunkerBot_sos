// commands/emoji.js: Gives a basic template of command plugins, while still somewhat useful.

const Discord = require('discord.js');
const Emoji = require('node-emoji');

module.exports = {
  prefix: 'emoji',
  helptext: 'emoji: returns the emoji code for argument given.',
  fn: (msg) => {
    msg.reply(`The emoji was ${Emoji.which(msg.content.split(' ')[2])}.`);
  };
}

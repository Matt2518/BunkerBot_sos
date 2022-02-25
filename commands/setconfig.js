//Command plugin to set configuration data in database for this server.

module.exports = {
  prefix: 'setconfig',
  helptext: 'setconfig: Sets configuration values for this bot on this server.',
  
  fn: (msg) => {
    const Discord = require('discord.js');
    const Enmap = require('enmap');
    const db = require('../modules/db.js');
    
    //Retrieve current configuration from DB.
    const guildConf = db.serverConfig.get(msg.guild.id);
    
    //Check permissions.
    if (guildConf.adminRole != '') {
      const adminRole = msg.guild.roles.cache.find(role => role.name === guildConf.adminRole);
      if (!adminRole) return msg.reply('Admin role not found.');
      if (!msg.member.roles.cache.has(adminRole.id) return msg.reply('This function requires the admin role.');
    };
    
    let prop = msg.content.split(' ')[2];
    let value = msg.content.split(' ')[3];
    
    if (!db.serverConfig.has(msg.guild.id, prop)) return msg.reply('Invalid configuration key!');
    
    db.serverConfig.set(msg.guild.id, value, prop);
    msg.channel.send(`Set ${prop} to ${value}.`);
  }}

    
   

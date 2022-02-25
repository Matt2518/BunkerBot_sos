//Command to generate an invite link to invite the bot to a new server.
module.exports = {
  prefix: 'invite',
  helptext: 'invite: posts an invite URL to invite bot to another server.',
  fn: (msg) => {
    const Discord = require('discord.js');
    
    //MUST insert invite link from Discord developer portal! 
    msg.channel.send('');
    
  }}

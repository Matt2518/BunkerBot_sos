//Shows the per-server configuration stored in serverConfig Enmap.

module.exports = {
  prefix: "showconfig",
  helptext: "showconfig: Lists configuration data for this bot on this server.",
  fn: (msg) => {
    const Discord = require('discord.js');
    const Enmap = require('enmap');
    const db = require('../modules/db.js');
    
    const guildConf = db.serverConfig.get(msg.guild.id);
    let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}: ${guildConf[prop]}`;
    });
    let propString = configProps.join(`\n`);
    
    msg.channel.send({embed: {
      color: 3447003,
      title: 'BunkerBot Configuration',
      description: `${propString}`,
      footer: { text: 'BunkerBot by matt2518' }
    }});
  }}

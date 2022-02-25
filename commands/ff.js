//Workhorse of the bot. This is where we generate the FF/FB table, collect registrations & cancellations, and purge old registrations.

module.exports = {
  prefix: 'ff',
  helptext: 'ff: Manages FF/FB registration.',
  
  fn: (msg) => {
    const db = require('../modules/db.js');
    const Discord = require('discord.js');
    const Emoji =require('node-emoji');
    
    //Establish our reaction codes. (Is this still used anywhere?)
    const reactionNumbers = ["\u0030\u20E3", "\u0031\u20E3", "\u0032\u20E3", "\u0033\U20E3", "\u0034\u20E3", "\u0035\u20E3", "\u0036\u20E3", "\u0037\u20E3", "\u0038\u20E3", "\u0039\u20E3"];
    const bunkerEmojis = [
      String.fromCodePoint("A".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("B".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("C".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("D".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("E".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("F".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("G".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("H".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("I".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("J".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("K".codePointAt(0) - 65 + 0x1f1e6),
      String.fromCodePoint("L".codePointAt(0) - 65 + 0x1f1e6)
      ];
    
    const db2 = require('../modules/db2.js');
    const Nbrs = require('../modules/constants.js');
    
    const action = msg.content.split(' ')[2];
    
    switch (action) {
      case 'start': {
        db.bunkers.set(msg.guild.id, true, 'registrationOpen');
        for (i=0; i<4; i++) { db.bunkers.set(msg.guild.id, [], Nbrs.ffNames[i]); };
        for (i=0; i<12; i++) { db.bunkers.set(msg.guild.id, [], Nbrs.fbNames[i]); };
        msg.channel.send('Bunker registration reset.');
        return;
      };
      case 'show': {
        let rtn = db2.buildEmbed(msg.guild);
        msg.channel.send({embed: rtn })
          .then(post => {
            db2.addReactions(post);
            
            const filter = (reaction, user) => {
              if (user.bot) return false;
              if (Nbrs.ffNumbers.includes(reaction.emoji.name)) return true;
              if (Nbrs.fbNumbers.includes(reaction.emoji.name)) return true;
              return false;
            };
          
          const collector = post.createReactionCollector(filter);
          collector.on('collect', async (reaction, user) => {
            db2.processReaction(reaction, user);
            let rtn2 = db2.buildEmbed(reaction.message.guild);
            reaction.message.edit({embed: rtn2});
          });
        });
        return;
      }
      
      default: {
        const pref = db.serverConfig.get(msg.guild.id, 'prefix');
        let usageText = `Usage: \n`;
        usageText += `**${pref} ff *command* **\n`;
        usageText += `**start**: initiates registration.\n`;
        usageText += `**stop**: ends the registration.\n`;
        usageText += `**show**: displays current registration status.`;
        msg.channel.send({embed: {
          color: 3447003,
          title: 'BunkerBot Registration',
          description: `${usageText}`,
          footer: {text: 'BunkerBot by matt2518'}
        }});
      }};
  }}
      

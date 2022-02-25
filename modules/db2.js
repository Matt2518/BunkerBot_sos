//Various helper functions to clean up, primarily, ff.js command plugin. No clue why I gave it this filename--feel free to clean that up!

module.exports = {
  buildEmbed: (guild) => {
    let registrationRules = db.serverConfig.get(guild.id, "registrationRules");
    let facilityLimit = db.serverConfig.get(guild.id, "facilityLimit");
    let bunkerLimit = db.serverConfig.get(guild.id, "bunkerLimit");
    
    let msgText = registrationRules.replace('{{facilityLimit}}, facilityLimit.toString()).replace('{{bunkerLimit}}, bunkerLimit.toString());
               
    msgText += `\n**Fortresses:**\n`;
    for (i=0; i<4; i++) { msgText += `${Nbrs.ffNumbers[i]} ${(i+1).toString()}. ${db.bunkers.get(guild.id, Nbrs.ffNames[i].join(';')}\n`; };
    
    msgText += `**Bunkers:**\n`;
    for (i=0; i<12; i++) { msgText += `${Nbrs.fbNumbers[i]} ${(i+1).toString()}. ${db.bunkers.get(guild.id, Nbrs.fbNames[i].join(';')}\n`; };

    const embed = {
      color: 3447003,
      title: 'Bunker Registration',
      description: `${msgText}`,
      footer: {text: 'BunkerBot by matt2518'}
    }
    
    return embed;
  }

  addReactions: (post) => {
    for (i=0; i<4; i++) { post.react(Nbrs.ffNumbers[i]) };
    for (i=0; i<12; i++) { post.react(Nbrs.fbNumbers[i]) };
  }
  
  processReaction: (reaction, user) => {
    let mbr = reaction.message.guild.member(user);
    
    for (i=0; i<4; i++) {
      if (reaction.emoji.name = Nbrs.ffNumbers[i]) {
        if (db.bunkers.get(reaction.message.guild.id, Nbrs.ffNames[i].includes(mbr.displayName)) {
            db.bunkers.remove(reaction.message.guild.id, mbr.displayName, Nbrs.ffNames[i]);
        } else {
          db.bunkers.push(reaction.message.guild.id, mbr.displayName, Nbrs.ffNames[i]);
        };
    }}
    for (i=0; i<12; i++) {
      if reaction.emoji.name = Nbrs.fbNumbers[i]) {
        if (db.bunkers.get(reaction.message.guild.id, Nbrs.fbNames[i].includes(mbr.displayName)) {
          db.bunkers.remove(reaction.message.guild.id, mbr.displayName, Nbrs.fbNames[i]);
        } else {
          db.bunkers.push(reaction.message.guild.id, mbr.displayName, Nbrs.fbNames[i]);
        };
    }}
    reactions.user.remove(user);
  }
}

         

const { ActivityType } = require('discord.js');

module.exports = {
  name: "ready",
  run: async (c) => {
    console.log(`⌛ ${c.user.tag} démarre...`);
    console.log(`💚 ${c.user.tag} a démarré!`);
    c.user.setActivity({
      name: "Bon RP!",
      type: ActivityType.Custom,
    });

    c.on('guildMemberAdd', async member => {
      try {
        // Role a remettre au nouveau membres qui arrive sur le discord
        await member.roles.add("1111111111111111111");
        console.log('Role Ajouté: ' + member.id);
        // Le Channel ID du canal qui dit bonjour a tout les joueurs qui rejoin
        const channelGreet = c.channels.cache.get("1111111111111111111");
        if (channelGreet) {
          // Vous poouvez edit le message ici bas.
          channelGreet.send(`On dit bonjour a ${member}!`);
        } else {
          console.error("Channel not found");
        }
      } catch (error) {
        console.error('Error adding role or sending greeting message: ', error); 
      }
    });

    
  },
};
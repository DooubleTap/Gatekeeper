const { ActivityType } = require('discord.js');
const config = require('../../config.json');
const { t } = require('../../handlers/locale');

module.exports = {
  name: "ready",
  run: async (client) => {
    // Bot startup logs
    console.log(`⌛ ${client.user.tag} ${t('ready_starting')}...`);
    console.log(`💚 ${client.user.tag} ${t('ready_started')}!`);

    // Set bot activity
    client.user.setActivity({
      name: t('ready_bot_activity'),
      type: ActivityType.Custom,
    });

    // Listen for new members joining
    client.on('guildMemberAdd', async (member) => {
      try {
        // Add default role
        await member.roles.add(config.roles.newUser);
        console.log(`${t('ready_role_added')}: ${member.id}`);

        // Send greeting in configured channel
        const channelGreet = client.channels.cache.get(config.channels.greet);
        if (channelGreet) {
          channelGreet.send(
            t('ready_greet_message', { member: member })
          );
        } else {
          console.error(t('ready_channel_not_found'));
        }
      } catch (error) {
        console.error(t('ready_error_adding_role'), error);
      }
    });
  },
};

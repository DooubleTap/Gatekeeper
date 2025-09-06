const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    PermissionsBitField
  } = require('discord.js');
  
  const config = require('../../config.json');
  const { t } = require('../../handlers/locale');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('setupformulaire')
      .setDescription(t('setupFormulaire_cmd_desc')), // description via locale
  
    async execute(client, interaction) {
      if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({
          content: t('botinfo_error'),
          ephemeral: true
        });
      }
  
      const embed = new EmbedBuilder()
        .setColor(config.colorEmbed || '#3498db')
        .setTitle(t('interactioncreate_embed_title'))
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(t('setupFormulaire_panel_desc')); // description locale
  
      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('ouvrir_formulaire')
          .setLabel(t('setupFormulaire_btn_open'))
          .setStyle(ButtonStyle.Primary)
      );
  
      const panelChannel = client.channels.cache.get(config.channels.applications);
      if (!panelChannel) {
        return interaction.reply({
          content: t('interactioncreate_err_impossible') + ' (channel missing)',
          ephemeral: true
        });
      }
  
      await panelChannel.send({
        embeds: [embed],
        components: [button]
      });
  
      await interaction.reply({
        content: t('setupFormulaire_panel_sent'),
        ephemeral: true
      });
    }
  };
  

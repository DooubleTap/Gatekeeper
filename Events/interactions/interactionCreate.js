const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle
  } = require('discord.js');
  
  module.exports = {
    event: 'interactionCreate',
    run: async (client, interaction) => {
      if (interaction.isButton() && interaction.customId.startsWith('userinfo:')) {
        const userinfo = require('../SlashCommands/Other/userInfo.js'); // ajuste le chemin si besoin
        if (userinfo.onComponent) return userinfo.onComponent(client, interaction);
      }
  
      if (interaction.isButton() && interaction.customId === 'ouvrir_formulaire') {
        const member = await interaction.guild.members.fetch(interaction.user.id).catch(() => null);
        // This is a role that a user receives when he filled up the form but it has not been manipulated by staff yet. Usually @passport
        // With this role we will be able to handle the part "if a user filled up a form already"
        const hasPendingRole = member?.roles.cache.has('1111111111111111111');
        const isTimedOut = (member?.communicationDisabledUntilTimestamp || 0) > Date.now();
  
        if (hasPendingRole || isTimedOut) {
          return interaction.reply({
            ephemeral: true,
            // This is a reply if the bot is broken, if the user just filled a form, if the user has a form to be approved or denied.
            content: `⛔ You cannot fill up this form for now.\n\n📌 Possible reasons why :\n• You already have a form awaiting for a response\n• You have been blocked from opening a form temporarily\n\nOpen a ticket if you think this is a mistake.`
          });
        }
  
        const modal = new ModalBuilder()
          .setCustomId('formulaire_douane')
          .setTitle('Fill this form completely!')
          .addComponents(
            // Those 5 questions are the ones a player will see in the Discord modal that will open for them
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q0').setLabel('Your full RP name').setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q1').setLabel('How old are you IRL?').setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q2').setLabel('What type of RP will you do?').setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q3').setLabel('What are your objectives in the city?').setStyle(TextInputStyle.Paragraph).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('q4').setLabel('What is your roleplay experience.').setStyle(TextInputStyle.Paragraph))
          );
  
        return interaction.showModal(modal);
      }
  
      if (interaction.isModalSubmit() && interaction.customId === 'formulaire_douane') {
        const [q0, q1, q2, q3, q4] = ['q0','q1','q2','q3','q4'].map(id => interaction.fields.getTextInputValue(id) || 'Non précisé');
        const formId = `#${interaction.id.slice(-4)}`;
        //Edit this channel ID for the channel where you will sent the applications that users filled up. 
        const channel = client.channels.cache.get('3333333333333333333');
  
        // This is the embed you receive in the channel with the short form of the questions. 
        const embed = new EmbedBuilder()
          .setTitle(`📄 Whitelist form ${formId}`)
          .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setDescription(`📨 Form filled up by: ${interaction.user}`)
          .addFields(
            { name: '**Full Roleplay name__**:', value: `\`\`\`${q0}\`\`\`` },
            { name: '**__How old IRL__**:', value: `\`\`\`${q1}\`\`\`` },
            { name: '**__Type of roleplay__**:', value: `\`\`\`${q2}\`\`\`` },
            { name: '**__Objectives__**:', value: `\`\`\`${q3}\`\`\`` },
            { name: '**__Roleplay experience__**', value: `\`\`\`${q4}\`\`\`` }
          )
          .setFooter({ text: `ID Discord: ${interaction.user.id}` })
          .setTimestamp();
  
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId(`approve_${interaction.user.id}`).setLabel('Approuve').setStyle(ButtonStyle.Success),
          new ButtonBuilder().setCustomId(`reject_${interaction.user.id}`).setLabel('Reject').setStyle(ButtonStyle.Danger),
          new ButtonBuilder().setCustomId(`askvocal_${interaction.user.id}`).setLabel('Vocal Required').setStyle(ButtonStyle.Secondary)
        );
  
        await channel.send({ embeds: [embed], components: [row] });
        // This again is the role that users receives when they filled up the form. Usually @passport
        await interaction.member.roles.add('1111111111111111111');
        await interaction.reply({ ephemeral: true, content: `✅ Thanks ${interaction.user}, We received your form, now you got to be patient!` });
  
        const dm = new EmbedBuilder()
          .setColor('Blue')
          .setTitle('📩 Form sent')
          .setDescription(`Hey ${interaction.user}, Your form was sent successfully 👌\nIt will be processed by a staff member as soon as possible.`)
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp();
  
        await interaction.user.send({ embeds: [dm] }).catch(() => null);
      }
  
      if (interaction.isButton() && interaction.customId.startsWith('approve_')) {
        const userId = interaction.customId.split('_')[1];
        const member = await interaction.guild.members.fetch(userId).catch(() => null);
        const msg = interaction.message;
        if (!member) return interaction.reply({ content: '❌ This player left the server', ephemeral: true });
        // Those are the roles to remove. Usually @passport and @newuser
        await member.roles.remove(['1111111111111111111', '22222222222222222222']).catch(() => {});
        //This is the whitelist role, usually @whitelisted
        await member.roles.add('1241528121971314738').catch(() => {});
  
        const embed = EmbedBuilder.from(msg.embeds[0]);
        embed.addFields({ name: '✅ Approved by', value: `${interaction.user} à <t:${Math.floor(Date.now() / 1000)}:t>` });
        await msg.edit({ embeds: [embed], components: [] });
  
        const dm = new EmbedBuilder()
          .setColor('Green')
          .setTitle('✅ Whitelist approved')
          .setDescription(`Congrats ${member} 🎉 !\nYour whitelist application has been approved!\n`)
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp();
  
        await member.send({ embeds: [dm] }).catch(() => null);
        await interaction.reply({ ephemeral: true, content: '✅ form approved, player informed and roles edited' });
        //This is the channel that will say <<User just received his whitelist!>> Usually a channel where all the non-whitelist players can chat with eachother.
        const passedChannel = client.channels.cache.get('3333333333333333333333');
        if (passedChannel) await passedChannel.send(`✅ ${member} **just received his whitelist!**`);
      }
  
      if (interaction.isButton() && interaction.customId.startsWith('reject_')) {
        const userId = interaction.customId.split('_')[1];
  
        const modal = new ModalBuilder()
          .setCustomId(`reject_modal_${userId}`)
          .setTitle('Reason for rejection')
          .addComponents(new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('reason')
              .setLabel('Explain to the user why you reject this form, with details.')
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          ));
  
        return interaction.showModal(modal);
      }
  
      if (interaction.isModalSubmit() && interaction.customId.startsWith('reject_modal_')) {
        const userId = interaction.customId.split('_')[2];
        const reason = interaction.fields.getTextInputValue('reason');
        const member = await interaction.guild.members.fetch(userId).catch(() => null);
        const messages = await interaction.channel.messages.fetch({ limit: 50 });
        const msg = messages.find(m => m.embeds?.[0]?.footer?.text?.includes(userId));
        if (!member || !msg) return interaction.reply({ content: '❌ Impossible to treat.', ephemeral: true });
        //This is usually @passport and will be removed when a form is declined. This allows the user to fill up another form.
        await member.roles.remove('1111111111111111111').catch(() => {});
  
        const embed = EmbedBuilder.from(msg.embeds[0]);
        embed.addFields({ name: '❌ Rejected by:', value: `${interaction.user} • ${reason}` });
        await msg.edit({ embeds: [embed], components: [] });
  
        const dm = new EmbedBuilder()
          .setColor('Red')
          .setTitle('❌ Form rejected')
          .setDescription(`The form you filled up was rejected.\n\n📌 Reason :\n\`\`\`${reason}\`\`\``)
          .setThumbnail(client.user.displayAvatarURL())
          .setTimestamp();
  
        await member.send({ embeds: [dm] }).catch(() => null);
        await interaction.reply({ ephemeral: true, content: '❌ Form rejected, player notified, roles edited' });
      }
  
      if (interaction.isButton() && interaction.customId.startsWith('askvocal_')) {
        const userId = interaction.customId.split('_')[1];
  
        const modal = new ModalBuilder()
          .setCustomId(`vocal_modal_${userId}`)
          .setTitle('Request vocal session')
          .addComponents(new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('reason')
              .setLabel('Explain why you want to speak with this player')
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          ));
  
        return interaction.showModal(modal);
      }
  
      if (interaction.isModalSubmit() && interaction.customId.startsWith('vocal_modal_')) {
        const userId = interaction.customId.split('_')[2];
        const reason = interaction.fields.getTextInputValue('reason');
        const member = await interaction.guild.members.fetch(userId).catch(() => null);
        const messages = await interaction.channel.messages.fetch({ limit: 50 });
        const msg = messages.find(m => m.embeds?.[0]?.footer?.text?.includes(userId));
        if (!member || !msg) return interaction.reply({ content: '❌ This form has been deleted and cannot be found', ephemeral: true });
  
        const embed = EmbedBuilder.from(msg.embeds[0]);
        if (embed.fields?.some(f => f.name === '🗣️ Request voice session')) {
          return interaction.reply({ ephemeral: true, content: '⚠️ a vocal session has been requested to the player' });
        }
  
        embed.addFields({ name: '🗣️ Voice meeting request', value: `By ${interaction.user} :\n\`\`\`${reason}\`\`\`` });
        await msg.edit({ embeds: [embed] });
  
        await member.send({
          // The channel id in this next line should be a channel that only players with @passport and @staff can see.
          content: `👋 Hello ${member}, a member of the team (${interaction.user}) would like to speak to you about your whitelist form.\n\nPlease join this channel if possible : <#4444444444444444444444>\n📌 Reason :\n\`\`\`${reason}\`\`\``
        }).catch(() => null);
  
        await interaction.reply({ ephemeral: true, content: '✅ Voice meet request sent to the player' });
      }
    }
  };
  
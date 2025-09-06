const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  InteractionResponseFlags
} = require("discord.js");

const config = require("../../config.json");
const { t } = require("../../handlers/locale");

const tr = (key, vars = {}) => {
  let s = t(key);
  for (const [k, v] of Object.entries(vars)) {
    s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  }
  return s;
};

module.exports = {
  event: "interactionCreate",
  run: async (client, interaction) => {

    const roles = config.roles || {};
    const channels = config.channels || {};
    const UNSET = t("interactioncreate_unset");

    // Userinfo buttons passthrough
    if (interaction.isButton() && interaction.customId.startsWith("userinfo:")) {
      const userinfo = require("../SlashCommands/Other/userInfo.js");
      if (userinfo.onComponent) return userinfo.onComponent(client, interaction);
    }

    // OPEN FORM BUTTON
    if (interaction.isButton() && interaction.customId === "ouvrir_formulaire") {
      const member = await interaction.guild.members.fetch(interaction.user.id).catch(() => null);

      const hasPending = member?.roles.cache.has(roles.pending);
      const isTimedOut = (member?.communicationDisabledUntilTimestamp || 0) > Date.now();

      if (hasPending || isTimedOut) {
        return interaction.reply({
          content: t("interactioncreate_form_blocked"),
          flags: 64 // ephemeral
        });
      }

      const modal = new ModalBuilder()
        .setCustomId("formulaire_douane")
        .setTitle(t("interactioncreate_form_title"))
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("q0")
              .setLabel(t("interactioncreate_q0_label"))
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("q1")
              .setLabel(t("interactioncreate_q1_label"))
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("q2")
              .setLabel(t("interactioncreate_q2_label"))
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("q3")
              .setLabel(t("interactioncreate_q3_label"))
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("q4")
              .setLabel(t("interactioncreate_q4_label"))
              .setStyle(TextInputStyle.Short)
              .setRequired(false)
          )
        );

      return interaction.showModal(modal);
    }

    // SUBMIT FORM
    if (interaction.isModalSubmit() && interaction.customId === "formulaire_douane") {
      const [q0, q1, q2, q3, q4] = ["q0","q1","q2","q3","q4"].map(id => interaction.fields.getTextInputValue(id) || UNSET);

      const formId = `#${interaction.id.slice(-4)}`;
      const appChannel = client.channels.cache.get(channels.applications);
      if (!appChannel) return;

      const embed = new EmbedBuilder()
        .setTitle(`${t("interactioncreate_embed_title")} ${formId}`)
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${t("interactioncreate_embed_desc_prefix")}${interaction.user}`)
        .addFields(
          { name: t("interactioncreate_q0_label"), value: `\`\`\`${q0}\`\`\`` },
          { name: t("interactioncreate_q1_label"), value: `\`\`\`${q1}\`\`\`` },
          { name: t("interactioncreate_q2_label"), value: `\`\`\`${q2}\`\`\`` },
          { name: t("interactioncreate_q3_label"), value: `\`\`\`${q3}\`\`\`` },
          { name: t("interactioncreate_q4_label"), value: `\`\`\`${q4}\`\`\`` }
        )
        .setFooter({ text: `ID Discord: ${interaction.user.id}` })
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`approve_${interaction.user.id}`)
          .setLabel(t("interactioncreate_btn_approve_label"))
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`reject_${interaction.user.id}`)
          .setLabel(t("interactioncreate_btn_reject_label"))
          .setStyle(ButtonStyle.Danger)
      );

      await appChannel.send({ embeds: [embed], components: [row] });

      // add pending role
      if (roles.pending) await interaction.member.roles.add(roles.pending).catch(() => {});

      // reply ephemeral
      await interaction.reply({
        content: tr("interactioncreate_thank_you", { user: interaction.user }),
        flags: 64
      });

      // DM confirmation
      const dm = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(t("interactioncreate_dm_title"))
        .setDescription(tr("interactioncreate_dm_body", { user: interaction.user }))
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

      await interaction.user.send({ embeds: [dm] }).catch(() => null);
    }

    // APPROVE BUTTON
    if (interaction.isButton() && interaction.customId.startsWith("approve_")) {
      const userId = interaction.customId.split("_")[1];
      const member = await interaction.guild.members.fetch(userId).catch(() => null);
      const msg = interaction.message;
      if (!member) return interaction.reply({ content: t("interactioncreate_err_left"), flags: 64 });

      if (roles.pending) await member.roles.remove(roles.pending).catch(() => {});
      if (roles.newUser) await member.roles.remove(roles.newUser).catch(() => {});
      if (roles.whitelisted) await member.roles.add(roles.whitelisted).catch(() => {});

      const embed = EmbedBuilder.from(msg.embeds[0]);
      embed.addFields({ name: t("interactioncreate_approved_by_field"), value: `${interaction.user} • <t:${Math.floor(Date.now()/1000)}:t>` });
      await msg.edit({ embeds: [embed], components: [] });

      const dm = new EmbedBuilder()
        .setColor("Green")
        .setTitle("✅ Whitelist approved")
        .setDescription(tr("interactioncreate_dm_body", { user: member }))
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

      await member.send({ embeds: [dm] }).catch(() => null);
      await interaction.reply({ content: t("interactioncreate_approve_success"), flags: 64 });

      const passedChannel = client.channels.cache.get(channels.passed);
      if (passedChannel) await passedChannel.send(tr("interactioncreate_public_passed_template", { user: member }));
    }

    // REJECT BUTTON
    if (interaction.isButton() && interaction.customId.startsWith("reject_")) {
      const userId = interaction.customId.split("_")[1];
      const modal = new ModalBuilder()
        .setCustomId(`reject_modal_${userId}`)
        .setTitle(t("interactioncreate_reject_modal_title"))
        .addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("reason")
              .setLabel(t("interactioncreate_reject_label"))
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          )
        );
      return interaction.showModal(modal);
    }

    // REJECT MODAL SUBMIT
    if (interaction.isModalSubmit() && interaction.customId.startsWith("reject_modal_")) {
      const userId = interaction.customId.split("_")[2];
      const reason = interaction.fields.getTextInputValue("reason");
      const member = await interaction.guild.members.fetch(userId).catch(() => null);
      const messages = await interaction.channel.messages.fetch({ limit: 50 });
      const msg = messages.find(m => m.embeds?.[0]?.footer?.text?.includes(userId));
      if (!member || !msg) return interaction.reply({ content: t("interactioncreate_err_impossible"), flags: 64 });

      if (roles.pending) await member.roles.remove(roles.pending).catch(() => {});

      const embed = EmbedBuilder.from(msg.embeds[0]);
      embed.addFields({ name: t("interactioncreate_reject_dm_title"), value: `By ${interaction.user} • ${reason}` });
      await msg.edit({ embeds: [embed], components: [] });

      const dm = new EmbedBuilder()
        .setColor("Red")
        .setTitle(t("interactioncreate_reject_dm_title"))
        .setDescription(tr("interactioncreate_reject_dm_body", { reason }))
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp();

      await member.send({ embeds: [dm] }).catch(() => null);
      await interaction.reply({ content: t("interactioncreate_reject_success"), flags: 64 });
    }

  }
};

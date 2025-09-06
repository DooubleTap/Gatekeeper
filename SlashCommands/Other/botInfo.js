const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { colorEmbed } = require("../../config.json");
const { t } = require("../../handlers/locale");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription(t("botinfo_cmd_desc")), // <-- localized description

  execute: async (client, interaction) => {
    try {
      const embed = new EmbedBuilder()
        .setColor(colorEmbed)
        .setDescription(t("botinfo_description"))
        .addFields({
          name: "",
          value: t("botinfo_support"),
        });

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (error) {
      console.error("Error executing botinfo command:", error);

      if (interaction && typeof interaction.reply === "function" && !interaction.replied) {
        await interaction.reply({
          content: t("botinfo_error"),
          ephemeral: true,
        });
      }
    }
  },
};

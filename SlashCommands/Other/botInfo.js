// If you suck, and you are a bad person, edit or remove this file. Free stuff is cool, but sharing it gives the fuel to make stuff better.

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { colorEmbed } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Bot Credits"),
    
  execute: async (interaction) => {
    try {
      console.log("Executing botinfo command...");
      console.log("Interaction object at start of execute:", interaction);

      if (!interaction || !interaction.reply) {
        throw new Error("Interaction object is undefined or invalid.");
      }

      const embed = new EmbedBuilder()
        .setColor(colorEmbed)
        .setDescription(
          "## Made by `DooubleTap` 💚 \n \n Mes liens: [`Github`](https://github.com/DooubleTap)"
        )
        .addFields(
          {
            name: "_-_",
            value:
              "[`Support for the bot itself (Not for this Guild)`](https://discord.gg/56qdMGFTEU)",
          },
        )
        .setFooter({
          text: "Thank you for using this bot.",
          iconURL: "https://r2.fivemanage.com/X8I0LGoLdHY2Wx9DdTrvx/3772136.png",
        });

      console.log("Interaction object before reply:", interaction);
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });

      console.log("Reply sent successfully.");
    } catch (error) {
      console.error("Error executing botinfo command:", error);
      if (interaction && typeof interaction.reply === 'function' && !interaction.replied) {
        await interaction.reply({
          content: "An error occurred while executing this command.",
          ephemeral: true,
        });
      }
    }
  },
};

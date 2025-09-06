require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const chalk = require("chalk");

// Create the Discord client (bot)
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Initialize command collection
client.commands = new Collection();

// Load your commands and events
require("./slash"); // Assuming this loads your slash commands

// Load events and slash commands from handlers
["events", "Slash"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

// Global error handling
process.on("unhandledRejection", (reason, promise) => {
  console.error(chalk.red("Unhandled Rejection at:"), promise);
  console.error(chalk.red("Reason:"), reason.stack || reason);
});

process.on("uncaughtException", (error) => {
  console.error(chalk.red("Uncaught Exception thrown:"), error.stack || error);
});

// Filter DeprecationWarnings for 'ready' event (clean GitHub)
process.on("warning", (warning) => {
  if (
    warning.name === "DeprecationWarning" &&
    warning.message.includes("The ready event has been renamed to clientReady")
  ) return;
  console.warn(warning.name, warning.message);
});

// Event listener for bot ready is now handled in ./events/ready.js
// So no need for client.on('ready') here

// Event listener for interaction creation (slash commands)
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(chalk.red(`Command not found: ${interaction.commandName}`));
    return;
  }

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(chalk.red(`Error executing command ${interaction.commandName}:`), error);
    await interaction.reply({ content: "There was an error executing that command.", ephemeral: true });
  }
});

// Log in to Discord
client.login(process.env.TOKEN);

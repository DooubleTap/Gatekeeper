require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const chalk = require("chalk");
const setupAIHelper = require('./src/ai-helper');

// Create the Discord client (bot)
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

// Load your commands and events
require("./slash"); // Assuming this loads your slash commands

// Initialize command collection
client.commands = new Collection();

// Load events and slash commands from handlers
["events", "Slash"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

// Global error handling for unhandled rejections and exceptions
process.on("unhandledRejection", (reason, promise) => {
  console.error(chalk.red("Unhandled Rejection at:"), promise);
  console.error(chalk.red("Reason:"), reason.stack || reason);
});

process.on("uncaughtException", (error) => {
  console.error(chalk.red("Uncaught Exception thrown:"), error.stack || error);
});

// Event listener for bot ready
client.on("ready", () => {
  console.log(chalk.green(`Logged in as ${client.user.tag}!`));
  setupAIHelper

  // Start the dashboard after the bot is ready
  const startDashboard = require('./dashboard');
  startDashboard(client);   // Now pass the client to the dashboard after it is initialized
  
});

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






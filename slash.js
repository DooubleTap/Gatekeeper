require("dotenv").config();
const { REST, Routes } = require("discord.js");
const { appID } = require("./config.json");
const fs               = require("node:fs");

const commands = [];
const folders  = fs.readdirSync("./SlashCommands");
for (const folder of folders) {
  const commandFiles = fs
    .readdirSync(`./SlashCommands/${folder}/`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./SlashCommands/${folder}/${file}`);

    if (command && command.data && typeof command.data.toJSON === "function") {
      commands.push(command.data.toJSON());
    } else {
      console.error(`Invalid command structure in file: ${file}. Skipping...`);
    }
  }
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    const d = await rest.put(Routes.applicationCommands(appID), {
      body: commands,
    });
    console.log("✅ Enregistrement de " + d.length + " commandes");
  } catch (e) {
    console.log("Error deploying commands");
    console.error(e);
  }
})();


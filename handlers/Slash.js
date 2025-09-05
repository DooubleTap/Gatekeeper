const fs = require('fs');
const { REST, Routes } = require('discord.js');
const { clientId } = require('../config.json');
const token = process.env.TOKEN;
const chalk = require('chalk');

module.exports = async (client) => {
    // Preparing command collection
    const commands = [];

    try {
        console.log(chalk.blue('Loading slash commands...'));

        // Reading slash command folders
        const folders = fs.readdirSync('./SlashCommands');
        console.log(chalk.blue(`Found command folders: ${folders.join(', ')}`));

        for (const folder of folders) {
            // Read command files in each folder
            const commandFiles = fs.readdirSync(`./SlashCommands/${folder}/`).filter(file => file.endsWith('.js'));
            console.log(chalk.blue(`Reading files from folder ${folder}: ${commandFiles.join(', ')}`));

            for (const file of commandFiles) {
                try {
                    const command = require(`../SlashCommands/${folder}/${file}`);
                    console.log(chalk.blue(`Loading command file: ${file}`));

                    // Check if the command has 'data' and 'toJSON' method
                    if (command && command.data && typeof command.data.toJSON === 'function') {
                        console.log(chalk.green(`Successfully loaded command: ${command.data.name}`));
                        client.commands.set(command.data.name, command);
                        commands.push(command.data.toJSON());
                    } else {
                        // Logging the invalid command structure
                        console.error(chalk.red(`Invalid command structure in file: ${file}`));
                        console.log(chalk.red(`Command data: ${JSON.stringify(command, null, 2)}`));
                    }
                } catch (err) {
                    console.error(chalk.red(`Error loading command from ${file}: ${err.message}`));
                    console.error(chalk.red(err.stack));
                }
            }
        }

        // Register commands via REST API
        const rest = new REST({ version: '10' }).setToken(token);

        console.log(chalk.yellow('Registering commands with Discord API...'));
        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands }
        );
        console.log(chalk.green('Slash commands registered successfully.'));
    } catch (error) {
        console.error(chalk.red('Error while loading or registering slash commands:'), error.message);
        console.error(chalk.red(error.stack));
    }
};

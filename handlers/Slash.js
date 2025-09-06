const fs = require('fs');
const { REST, Routes } = require('discord.js');
const { clientId } = require('../config.json');
const token = process.env.TOKEN;
const chalk = require('chalk');
const { t } = require('../handlers/locale');

module.exports = async (client) => {
    const commands = [];

    try {
        console.log(chalk.blue(t('slash_loading')));

        const folders = fs.readdirSync('./SlashCommands');
        console.log(chalk.blue(t('slash_folders_found', { folders: folders.join(', ') })));

        for (const folder of folders) {
            const commandFiles = fs.readdirSync(`./SlashCommands/${folder}/`).filter(file => file.endsWith('.js'));
            console.log(chalk.blue(t('slash_reading_folder', { folder, files: commandFiles.join(', ') })));

            for (const file of commandFiles) {
                try {
                    const command = require(`../SlashCommands/${folder}/${file}`);

                    if (command && command.data && typeof command.data.toJSON === 'function') {
                        client.commands.set(command.data.name, command);
                        commands.push(command.data.toJSON());
                        console.log(chalk.green(t('slash_loaded', { name: command.data.name })));
                    } else {
                        console.error(chalk.red(t('slash_invalid_structure', { file })));
                    }
                } catch (err) {
                    console.error(chalk.red(t('slash_error_loading', { file, message: err.message })));
                    console.error(chalk.red(err.stack));
                }
            }
        }

        const rest = new REST({ version: '10' }).setToken(token);
        console.log(chalk.yellow(t('slash_registering')));
        await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log(chalk.green(t('slash_registered')));
    } catch (error) {
        console.error(chalk.red(t('slash_error_registering', { message: error.message })));
        console.error(chalk.red(error.stack));
    }
};

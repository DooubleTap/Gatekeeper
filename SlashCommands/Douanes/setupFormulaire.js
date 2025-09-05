const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    PermissionsBitField
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupformulaire')
        .setDescription('Add the form panel to this channel'),

    async execute(client, interaction) {
        if (!interaction.memberPermissions?.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'You do not have permission', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('📜 Whitelist form')
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(
            // Edit this to your liking, if you keep it by default its fine too.
            `Yep… another form.\n\nBut this isn’t a Google Doc—it's an interactive form that helps us a lot as staff. It gives the whole team a chance to read and validate applications fairly quickly! This system even led us to remove the customs officer role and manage roles to filter spam and bots.\n\nIf you write at even a decent speed, this shouldn’t take more than 5 minutes, and validation can be just as fast! If you want to do this by voice, please still fill out the form as best as you can and mention inside that you’d like to talk to a team member without having to write.\n\n# Make sure to fill out the form properly, 2 sentences aren’t enough, please put some effort in!\n\nClick the button to get started.`
        );


        const bouton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('ouvrir_formulaire')
                .setLabel('✍️ fill the form')
                .setStyle(ButtonStyle.Primary)
        );
        // This channel is where the form will be sent when its filled up
        await client.channels.cache.get('1111111111111111111').send({
            embeds: [embed],
            components: [bouton]
        });

        await interaction.reply({ content: '✅ Formulaire affiché dans le canal.', ephemeral: true });
    }
};


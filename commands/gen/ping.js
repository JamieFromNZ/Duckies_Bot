const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),

    async execute(interaction, bot) {
        const start = Date.now();

        await interaction.reply('Pinging...');

        const end = Date.now();
        const ping = end - start;
        const apiPing = message.client.ws.ping;

        const embed = bot.embedManager.getBaseEmbed()
            .setTitle('Pong!')
            .addField('Latency', `${ping}ms`, true)
            .addField('API Latency', `${apiPing}ms`, true)
        return await interaction.editReply({ embeds: [embed] });
    }
};
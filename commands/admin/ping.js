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
        const apiPing = interaction.client.ws.ping;

        const embed = await bot.embedManager.getBaseEmbed()
            embed.setTitle('Pong!')
            embed.addFields(
                { name: 'Latency', value: `${ping}ms` },
                { name: 'API Latency', value: `${apiPing}ms`, inline: true },
            )
        return await interaction.editReply({ embeds: [embed], content: "Pong!" });
    }
};
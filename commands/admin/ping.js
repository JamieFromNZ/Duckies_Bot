module.exports = {
    data: {
        name: 'ping',
        aliases: [],
        parameters: 0,
        description: 'tbd',
        ownerOnly: true
    },

    async execute(message, bot) {
        const start = Date.now();

        let m = await message.reply('Pinging...');

        const end = Date.now();
        const ping = end - start;
        const apiPing = bot.client.ws.ping;

        const embed = await bot.embedManager.getBaseEmbed()
            embed.setTitle('Pong!')
            embed.addFields(
                { name: 'Latency', value: `${ping}ms` },
                { name: 'API Latency', value: `${apiPing}ms`, inline: true },
            )
        return await m.edit({ embeds: [embed], content: "Pong!" });
    }
};
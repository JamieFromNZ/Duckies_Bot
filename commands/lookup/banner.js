module.exports = {
    data: {
        name: 'banner',
        aliases: ['ban'],
        minParameters: 0,
        description: 'tbd',
        ownerOnly: false,
    },

    async execute(message, bot, args) {
        let target = await bot.getUserFromMentionOrId(args[0]);
        if (args.length === 0) {
            target = message.author;
        }

        // Fetch user to access bannerURL
        target = await target.fetch();

        let embed = await bot.embedManager.getBaseEmbed()
        embed.setTitle(`${target.username}'s profile banner`)
        embed.setImage(`${target.bannerURL()}`)

        return await message.channel.send({ embeds: [embed] });
    }
};
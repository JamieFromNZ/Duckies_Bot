module.exports = {
    data: {
        name: 'avatar',
        aliases: ['av'],
        minParameters: 0,
        description: 'tbd',
        ownerOnly: false,
    },

    async execute(message, bot, args) {
        let target = await bot.getUserFromMentionOrId(args[0]);
        if (args.length === 0) {
            target = message.author;
        }

        let embed = await bot.embedManager.getBaseEmbed()
        embed.setTitle(`${target.username}'s avatar`);
        embed.setImage(`${target.displayAvatarURL({ dynamic: true })}`);

        return await message.channel.send({ embeds: [embed] });
    }
};
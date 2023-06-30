module.exports = {
    data: {
        name: 'user',
        aliases: ['userinfo', 'u'],
        minParameters: 0,
        description: 'tbd',
        ownerOnly: false,
    },

    async execute(message, bot, args) {
        let target = await bot.getUserFromMentionOrId(args[0]);
        if (args.length === 0) {
            target = message.author;
        }

        let member = await message.guild.members.cache.get(target.id);

        console.log(await target.fetchFlags());
        console.log(await target.flags.toArray());

        let embed = await bot.embedManager.getBaseEmbed()
        embed.setTitle(`User information ${target.username}`)
        embed.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
        embed.setThumbnail(target.displayAvatarURL({ dynamic: true }))
        embed.addFields(
          { name: 'Username', value: target.username, inline: true },
          { name: 'ID', value: target.id, inline: true },
          { name: '\u200B', value: '\u200B' },
          { name: 'Avatar URL', value: `[Click Here](${target.displayAvatarURL() || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"})`, inline: true },
          { name: 'Banner URL', value: `[Click Here](${target.bannerURL() || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"})`, inline: true },
          { name: '\u200B', value: '\u200B' },
          { name: 'Account Creation', value: target.createdAt.toDateString(), inline: true },
          { name: 'Member Creation', value: member.joinedAt.toDateString(), inline: true },
          { name: '\u200B', value: '\u200B' },
          { name: 'Status', value: member.presence?.status || 'Unavailable', inline: true },
          { name: 'Current Activity', value: member.presence?.activities[0] ? member.presence?.activities[0].name : 'None',  inline: true },
          { name: 'Roles', value: member.roles.cache.map(role => role.toString()).join(', '), inline: true },
          { name: 'Badges', value: `${await target.flags.toArray().toString() || 'None'}`, inline: true }
        );
        return await message.channel.send({ embeds: [embed] });
    }
};
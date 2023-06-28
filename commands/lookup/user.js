const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Looks up a user with ID.')
        .addUserOption(option => option.setName('user').setDescription('The user to lookup').setRequired(true)),

    async execute(interaction, bot) {
        let target = await interaction.options.getUser('user');
        let member = await interaction.guild.members.cache.get(target.id);

        console.log(await target.fetchFlags());
        console.log(await target.flags.toArray());

        let embed = await bot.embedManager.getBaseEmbed()
        embed.setTitle(`User information ${target.username}`)
        embed.setAuthor({ name: target.tag, iconURL: target.displayAvatarURL({ dynamic: true }) })
        embed.setColor(target.accentColor)
        embed.setThumbnail(target.displayAvatarURL({ dynamic: true }))
        embed.addFields(
          { name: 'Username', value: target.username, inline: true },
          { name: 'ID', value: target.id },
          { name: 'Avatar URL', value: `[Click Here](${target.displayAvatarURL()})`, inline: true },
          { name: 'Banner URL', value: `[Click Here](${target.bannerURL() || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"})`, inline: true },
          { name: 'Account Creation', value: target.createdAt.toDateString(), inline: true },
          { name: 'Status', value: member.presence?.status || 'Unavailable', inline: true },
          { name: 'Current Activity', value: member.presence?.activities[0] ? member.presence?.activities[0].name : 'None' },
          { name: 'Roles', value: member.roles.cache.map(role => role.toString()).join(', '), inline: true },
          { name: 'Badges', value: `${await target.fetchFlags()}`, inline: true }
        );
        return await interaction.reply({ embeds: [embed] });
    }
};
const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberUpdate,
    async execute(oldMember, newMember, bot) {
        if (oldMember.guild.id !== bot.devGuild && oldMember.guild.id !== bot.mainGuild) return;

        console.log(oldMember, newMember)

        if (!oldMember.premiumSince && newMember.premiumSince) {
            // Member started boosting.
        }
    }
};
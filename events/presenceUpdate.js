const { Events } = require('discord.js');

module.exports = {
    name: Events.PresenceUpdate,
    async execute(oldPresence, newPresence, bot) {
        if (!newPresence.user.bot) {
            
        }
    }
};
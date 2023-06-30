const { EmbedBuilder } = require('discord.js');

class EmbedManager {
    constructor(bot) {
        this.bot = bot;
    }

    async getBaseEmbed() {
        let emb = new EmbedBuilder() 
        .setTimestamp()
        .setColor("2b2d31")

        return emb;
    }

    async getErrorEmbed() {
        let emb = new EmbedBuilder() 
        .setTimestamp()
        .setColor("#CB4340")

        return emb;
    }
}

module.exports = EmbedManager;
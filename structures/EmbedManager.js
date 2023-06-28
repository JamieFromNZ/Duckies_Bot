const { EmbedBuilder } = require('discord.js');

class EmbedManager {
    constructor(bot) {
        this.bot = bot;
    }

    async getBaseEmbed() {
        let emb = new EmbedBuilder() 
        .setTimestamp()
        .setColor("2b2d31")
        .setImage("https://i.imgur.com/iGMEFQA.png")

        return emb;
    }
}

module.exports = EmbedManager;
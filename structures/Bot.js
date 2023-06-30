const { Client, Events, GatewayIntentBits, REST, Routes, Collection, EmbedBuilder } = require('discord.js');

require('dotenv').config();

const EventManager = require('./EventManager.js');
const CommandManager = require('./CommandManager.js');
const KeepAlive = require('./KeepAlive.js');
const EmbedManager = require('./EmbedManager.js');

class Bot {
    constructor() {
        // Initialize Discord client for bot
        this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildPresences, GatewayIntentBits.MessageContent] });

        // Initialise main managers for bot
        this.eventManager = new EventManager(this);
        this.commandManager = new CommandManager(this);
        this.keepAlive = new KeepAlive(this);
        this.embedManager = new EmbedManager(this);

        // might put this in config.json later TODO:
        this.devGuild = '1006640528189829245';
        this.mainGuild = '799038547399016450';
        this.prefix = 'd!';
        this.devIds = ['422603238936936450', '441178576952360970'];

        // Token
        this.token = process.env.TOKEN;
    }

    login() {
        console.log('Logging in...');
        return this.client.login(this.token);
    }

    // Maybe put this into utils later
    async getUserFromMentionOrId(mention) {
        if (!mention) return;

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return this.client.users.cache.get(mention);
        } else {
            // If the parameter is simply a user id
            return this.client.users.cache.get(mention);
        }
    }
}

module.exports = Bot;
const { Client, Events, GatewayIntentBits, REST, Routes, Collection, EmbedBuilder } = require('discord.js');

require('dotenv').config();

const EventManager = require('./EventManager.js');
const CommandManager = require('./CommandManager.js');
const KeepAlive = require('./KeepAlive.js');
const EmbedManager = require('./EmbedManager.js');

class Bot {
    constructor() {
        // Initialize Discord client for bot
        this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

        // Initialise main managers for bot
        this.eventManager = new EventManager(this);
        this.commandManager = new CommandManager(this);
        this.keepAlive = new KeepAlive(this);
        this.embedManager = new EmbedManager(this);

        // might put this in config.json later TODO
        this.devGuild = '1006640528189829245';
        this.mainGuild = '799038547399016450';

        // Token
        this.token = process.env.TOKEN;
    }

    login() {
        console.log('Logging in...');
        return this.client.login(this.token);
    }
}

module.exports = Bot;
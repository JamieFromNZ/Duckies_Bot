const Bot = require('./structures/Bot');

const bot = new Bot();
bot.login().then(() => {
    // Log in
    console.log('Logged in.');
});

bot.client.on('ready', () => {
    console.log("Bot ready. Loading commands & events.");

    bot.commandManager.loadCmds(bot);
    bot.eventManager.load(bot);
    //bot.keepAlive.start(bot);
});
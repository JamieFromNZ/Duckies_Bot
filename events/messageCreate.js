const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, bot) {
        if (message.author.bot || !message.content.startsWith(bot.prefix) || (message.guild.id !== bot.devGuild && message.guild.id !== bot.mainGuild)) return;

        const args = message.content.slice(bot.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        let commandData = await bot.commandManager.getCmdDataWithName(commandName);

        if (!commandData) {
            let emb = await bot.embedManager.getErrorEmbed();
            emb.setDescription("No command found with that name.");
            return await message.channel.send( { embeds: [emb] } );
        }

        if (!bot.devIds.includes(message.author.id) && commandData.ownerOnly) {
            let emb = await bot.embedManager.getErrorEmbed();
            emb.setDescription("This command is for devs only.");
            return await message.channel.send( { embeds: [emb] } );
        }

        console.log(args.length, commandData.minParameters, args.length < commandData.minParameters);
        if (args.length < commandData.minParameters) {
            let emb = await bot.embedManager.getErrorEmbed();
            emb.setDescription("Too few args specified.");
            return await message.channel.send( { embeds: [emb] } );
        }

        const command = await require('../commands/' + commandData.type + '/' + commandData.name + '.js');

        try {
            await command.execute(message, bot, args);
        } catch (error) {
            console.error(error);
            let emb = await bot.embedManager.getErrorEmbed();
            emb.setDescription("There was an error while executing this command.");
            return await message.channel.send( { embeds: [emb] } );
        }
    },
};
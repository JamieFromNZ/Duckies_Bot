// Libraries needed
const fs = require('fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

class CommandManager {
    constructor(bot) {
        // Map of all command file directories
        this.commandsDataArr = new Array();
        this.adminCommandsDataArr = new Array(); // commands that are only for the devs
    }

    // Load all command files from each subdirectory in the commands directory.
    async loadCmds(bot) {
        const subdirectories = fs.readdirSync('commands').filter(subdir => fs.statSync(path.join('commands', subdir)).isDirectory());

        for (const subdir of subdirectories) {
            const commandData = {
                name: subdir,
                description: `Commands for ${subdir}`,
                options: []
            };

            for (const item of fs.readdirSync(path.join('commands', subdir))) {
                if (path.extname(item) === '.js') {
                    const itemFile = require('../commands/' + subdir + '/' + item);
                    commandData.options.push({
                        type: 1, // sub cmd
                        name: path.basename(item, '.js'),
                        description: itemFile.data.description,
                        options: itemFile.data.options
                    });
                }
            }

            console.log(subdir);
            if (subdir === "admin") { // only register admin cmds in test guild so don't add them to commmandsDataArr (global cmds)
                await this.adminCommandsDataArr.push(commandData);
            } else {
                await this.commandsDataArr.push(commandData);
            }
        }

        console.log(this.commandsDataArr, this.adminCommandsDataArr)

        const rest = new REST({ version: '10' }).setToken(bot.token);
        try {
            await rest.put(
                Routes.applicationCommands(bot.client.user.id),
                { body: this.commandsDataArr }
            );
            console.log(`Successfully registered global commands`);

            await rest.put(
                Routes.applicationGuildCommands(bot.client.user.id, bot.devGuild),
                { body: this.adminCommandsDataArr }
            );
            console.log(`Successfully registered admin commands`);

        } catch (error) {
            console.error(error);
        }
    }

    async getCmdFileWithName(name) {
        let file = await require('../' + this.commandPathsMap.get(name + '.js'))
        return file;
    }
}

module.exports = CommandManager;
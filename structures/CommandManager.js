const fs = require('fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

class CommandManager {
    constructor(bot) {
        this.commandsDataArr = []; // Array to store command data
    }

    // Load all command files from each subdirectory in the commands directory.
    async loadCmds(bot) {
        const commandsDir = 'commands';
        const subdirectories = fs.readdirSync(commandsDir)
            .filter(subdir => fs.statSync(path.join(commandsDir, subdir)).isDirectory());

        for (const subdir of subdirectories) {
            const commandData = {
                name: subdir,
                description: `Commands for ${subdir}`,
                options: []
            };

            const commandDirPath = path.join(commandsDir, subdir);
            const commandFiles = fs.readdirSync(commandDirPath)
                .filter(item => path.extname(item) === '.js');

            for (const item of commandFiles) {
                const itemPath = path.join(commandDirPath, item);
                const itemFile = require(itemPath);

                commandData.options.push({
                    type: 1, // sub cmd
                    name: path.basename(item, '.js'),
                    description: itemFile.data.description,
                    options: itemFile.data.options
                });
            }

            this.commandsDataArr.push(commandData);
            console.log(`Loaded commands from ${subdir}`);
        }

        const rest = new REST({ version: '10' }).setToken(bot.token);
        try {
            await rest.put(
                Routes.applicationCommands(bot.client.user.id),
                { body: this.commandsDataArr }
            );
            console.log(`Successfully registered commands`);
        } catch (error) {
            console.error(`Failed to register commands: ${error}`);
        }
    }

    async getCmdFileWithName(name) {
        const filePath = '../' + this.commandPathsMap.get(name + '.js');
        const file = await require(filePath);
        return file;
    }
}

module.exports = CommandManager;
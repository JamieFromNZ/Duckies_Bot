// Libraries needed
const fs = require('fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');

class CommandManager {
    constructor(bot) {
        // Map of all command file directories
        this.commandsDataArr = new Array();
    }

    // Load all command files from each subdirectory in the commands directory.
    async loadCmds(bot) {
        const subdirectories = fs.readdirSync('commands').filter(subdir => fs.statSync(path.join('commands', subdir)).isDirectory());

        for (const subdir of subdirectories) {
            let commandData = {};

            for (const item of fs.readdirSync(path.join('commands', subdir))) {
                if (path.extname(item) === '.js') {
                    const itemFile = require('../commands/' + subdir + '/' + item);
                    commandData = {
                        name: path.basename(item, '.js'),
                        description: itemFile.data.description,
                        minParameters: itemFile.data.minParameters, // TODO: Setup aliases (under)
                        aliases: itemFile.data.aliases,
                        type: subdir,
                        ownerOnly: itemFile.data.ownerOnly,
                    };
                }
            }

            await this.commandsDataArr.push(commandData);
        }

        console.log(this.commandsDataArr);
    }

    async getCmdDataWithName(commandName) {
        return this.commandsDataArr.find(obj => obj.name === commandName);
    }
}

module.exports = CommandManager;
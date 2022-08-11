const { MessageEmbed } = require('discord.js');
const prefix = "+';


module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    usage: "help [command name]",
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            const newEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Help')
                .setDescription('Here\'s a list of all my commands:')
                .addFields({ name: 'Commands', value: commands.map(command => prefix + command.name).join(', ') })
                .setTimestamp()

            return message.channel.send({ embeds: [newEmbed] })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Help: ${command.name}`)
            .setDescription(`**Name:** ${command.name}`)
            .addFields({ name: 'Description', value: command.description })
            .setTimestamp()

        message.channel.send({ embeds: [embed] });
    },
};

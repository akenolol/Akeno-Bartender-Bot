const { MessageEmbed } = require('discord.js');
const groups = require("../../config.json").groups;
const prefix = process.env.PREFIX;
const { version } = require('../../package.json');
const { dependencies } = require('../../package.json');

module.exports = {
    name: "bot-info",
    description: "Get info about the bot",
    usage: "bot-info",
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle("Bot Info")
            .setDescription(`Bot Version: ${version}\nDiscord.js Version: ${dependencies['discord.js']}\nPrefix: ${prefix}`)
            .setColor("GREEN")
        message.channel.send({ embeds: [embed] });
    },
};
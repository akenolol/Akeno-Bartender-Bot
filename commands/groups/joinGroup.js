const { MessageEmbed } = require('discord.js');
const groups = require("../../config.json").groups;

module.exports = {
    name: "join-group",
    description: "Join a group",
    usage: "join-group <group>",
    execute(message, args) {
        const group = groups[args[0]];
        if (!group) {
            const embed = new MessageEmbed()
                .setTitle("Group Not Found")
                .setDescription(`The group ${args[0]} does not exist`)
                .setColor("RED")
            return message.channel.send({ embeds: [embed] });
        }
        const embed = new MessageEmbed()
            .setTitle("Group Joined")
            .setDescription(`You have joined the group ${group.name}`)
            .setColor("GREEN")
        message.channel.send({ embeds: [embed] });
        message.member.roles.add(group.roleId);

    },
};
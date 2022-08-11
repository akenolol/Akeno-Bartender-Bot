const { MessageEmbed } = require('discord.js');
const groups = require("../../config.json").groups;

module.exports = {
    name: "show-group",
    description: "Show a group",
    usage: "show-group <group>",
    execute(message, args) {
        const group = args[0];
        if (!group) {
            const AllGroups = Object.keys(groups).map((group) => groups[group]);
            const embed = new MessageEmbed()
                .setTitle("Groups")
                .setDescription(AllGroups.map((group) => group.name).join(", "))
                .setColor("GREEN")
            return message.channel.send({ embeds: [embed] });
        }
        const Group = groups[group];
        if (!Group) {
            const embed = new MessageEmbed()
                .setTitle("Group Not Found")
                .setDescription(`The group ${group} does not exist`)
                .setColor("RED")
            return message.channel.send({ embeds: [embed] });
        }
        const embed = new MessageEmbed()
            .setTitle(Group.name)
            .setDescription(Group.description)
            .setColor("GREEN")
        message.channel.send({ embeds: [embed] });

    },
};
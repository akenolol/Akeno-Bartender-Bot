const groupsSchema = require('../models/groups');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "show-groups",
    description: "Shows all groups",
    execute(message, args) {
        // Get all the groups
        groupsSchema.find({}, (err, groups) => {
            // Send Each group as an embed
            groups.forEach(group => {
                const embed = new MessageEmbed()
                    .setTitle(group.name)
                    .setDescription(group.description)
                    .setColor("GREEN")
                    .setImage(group.icon)
                    .setAuthor({ name: `${group.ownerName}`, iconURL: `${group.ownerIcon}`, url: `https://discordapp.com/users/${group.ownerId}` })
                    .setFooter({ text: `Group Created on ${group.dateCreated}`, iconURL: `${message.guild.iconURL()}` });
                    

                message.channel.send({ embeds: [embed] });
            })
            if (err) console.error(err);
        })

    },
};
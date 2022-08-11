const groupsSchema = require('../models/groups');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');


module.exports = {
    name: "delete-group",
    description: "Deletes a group",
    execute(message, args) {
        const group = args[0];
        const AllowedRoles = "1006948553844850778";
        if (message.member.roles.cache.has(AllowedRoles)) {
            groupsSchema.findOne({ name: group }, async (err, group) => {
                if (err) console.error(err);
                if (group) {
                    const embed = new MessageEmbed()
                        .setTitle("Group Deleted")
                        .setDescription(`Group ${group.name} has been deleted`)
                        .setColor("RED")
                    message.channel.send({ embeds: [embed] });
                    groupsSchema.deleteOne({ name: group.name }, (err) => {
                        if (err) console.error(err);
                    })
                } else {
                    const embed = new MessageEmbed()
                        .setTitle("Group Not Found")
                        .setDescription(`Group ${group} does not exist`)
                        .setColor("RED")
                    message.channel.send({ embeds: [embed] });
                }
            })
        }
        else {
            const embed = new MessageEmbed()
                .setTitle("Insufficient Permissions")
                .setDescription(`You do not have permission to run this command`)
                .setColor("RED")
            message.channel.send({ embeds: [embed] });
        }
    },
};
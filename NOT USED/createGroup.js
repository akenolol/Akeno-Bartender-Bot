const groupsSchema = require('../models/groups');
const { MessageEmbed } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');


module.exports = {
    name: "create-group",
    description: "Creates a group",
    execute(message, args) {
        // Let's make sure the group doesn't already exist
        groupsSchema.findOne({ name: args[0] }, async (err, group) => {
            if (err) console.error(err);
            if (group) {
                const GroupExists = new MessageEmbed()
                    .setTitle("Group Already Exists")
                    .setDescription(`The group ${args[0]} already exists`)
                    .setColor("RED")
                message.channel.send({ embeds: [GroupExists] });
            } else {
                const newGroup = new groupsSchema({
                    name: args[0],
                    description: args.slice(2).join(" "),
                    ownerName: message.author.username,
                    ownerId: message.author.id,
                    icon: args[1],
                    dateCreated: Date.now(),
                    ownerIcon: message.author.displayAvatarURL(),
                })
                newGroup.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                const embed = new MessageEmbed()
                    .setTitle("Group created")
                    .setImage(args[1])
                    .setDescription(`Group ${newGroup.name} has been created`)
                    .setAuthor({ name: `${newGroup.ownerName}`, iconURL: `${newGroup.ownerIcon}`, url: `https://discordapp.com/users/${newGroup.ownerId}` })
                    .setFooter({ text: `Group Created on ${newGroup.dateCreated}`, iconURL: `${message.guild.iconURL()}` })
                    .setColor("GREEN")
                message.delete();
                message.channel.send("<a:Loading56:992173775384752138>").then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.channel.send({ embeds: [embed] });
                        const submitChannel = message.client.channels.cache.get("985320485892014080");

                        

                        const Submited = new MessageEmbed()
                            .setTitle("Group Submitted")
                            .setDescription(`Group ${newGroup.name} has been submitted\nGroup Id: ${newGroup._id}`)
                            .setColor("GREEN")
                        submitChannel.send({ embeds: [Submited] });

                        // Create a Role with the name of GroupRole
                        message.guild.roles.create({
                            data: {
                                name: `» ${args[0]}ღ`,
                                color: "GREEN",
                                mentionable: false,
                                hoist: false,
                                permissions: [],
                            },
                            reason: `Group ${newGroup.name} has been created`,
                        }).then(role => {
                            // Add the role to the owner
                            message.member.roles.add(role);
                        })

                       // message.member.roles.add(message.guild.roles.cache.find(role => role.name === GroupRole));

                    }, 4000)

                })


            }
        }
        )
    },
};
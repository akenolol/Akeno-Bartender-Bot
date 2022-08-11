const { MessageEmbed } = require('discord.js');




module.exports = {
    name: "ping",
    description: "Get the bot's ping",
    usage: "ping",
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle("Pong!")
            .setDescription(`Ping: ${message.client.ws.ping}ms\nLatency: ${Date.now() - message.createdTimestamp}ms\nUptime: ${Math.floor(message.client.uptime / 1000)}s`)
            .setColor("GREEN")
        message.channel.send({ embeds: [embed] });        
    },
};
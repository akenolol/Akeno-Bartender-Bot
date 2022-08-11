const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ 
    allowedMentions: { parse: ['users', 'roles'] },
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] 
});
const fs = require('fs');
const path = require('path');
const prefix = process.env.PREFIX;
const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js');
const Logger = require('./utils/Logger');
const log = new Logger({ debug: true });
const groupsSchema = require('./models/groups');
const { version } = require('./package.json');
const { dependencies } = require('./package.json');
const ServerApp = require('./server.js')

//const { devDependencies } = require('./package.json');



client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        

    }
}

client.once('ready', () => {
    const numberOfDependencies = Object.keys(dependencies).length;
    console.clear();
    console.log('------------------------|Bot is online!|------------------------');
    console.log('');
    console.log('Client has logged in as ' + client.user.tag);
    console.log('');
    console.log(' - Prefix -');
    console.log(prefix)
    console.log('');
    console.log(' - Version -');
    console.log(version);
    console.log('');
    console.log(' - Dependencies -');
    console.log(numberOfDependencies);
    console.log('');
    console.log(' - Owner / Author -');
    console.log(process.env.OWNER_USERNAME);
    console.log('')

    client.user.setStatus('dnd');

    
    

    const activities_list = [
        `${prefix}help`,
        `${client.channels.cache.size} channels`,
        `Made with love by @akeno#1010`,
        `Version ${version}`,
        `${numberOfDependencies} dependencies`,
        `Node ${process.version}`
    ];

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index], { type: 'WATCHING' });
    }, 5000);

    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then(() => {
        log.info("Connected to MongoDB");
    }
    ).catch((err) => {
        log.error(err);
    }
    )
});


client.on('messageCreate', message => {

    if (message.author.bot) return; // check if the author is a bot
    if (!message.content.startsWith(prefix)) return; // check if the message starts with the prefix
    const args = message.content.slice(prefix.length).trim().split(/ +/); // get the arguments
    const commandName = args.shift().toLowerCase(); // get the command name
    const command = client.commands.get(commandName) //|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // get the command
    if (!command) return; // check if the command exists
    try {
        log.info("[+] Command executed: " + commandName)
        command.execute(message, args); // execute the command

    }
    catch (error) {
        log.error(error);
        const ErrorEmbed = new MessageEmbed()
            .setTitle('Error')
            .setDescription('An error occured while executing this command')
            .setColor('RED')

        message.channel.send({ embeds: [ErrorEmbed] });
    }
});





ServerApp()
client.login(process.env.TOKEN)



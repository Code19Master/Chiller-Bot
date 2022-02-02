const Discord = require("discord.js");
const fs = require("fs");

const config = require("./config.json");
const SlashCmd = require("./slashCMD");
const token = process.env.TOKEN;
const testtoken = process.env.TEST_TOKEN;

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
    partials: [
        'MESSAGE',
        'CHANNEL',
        'REACTION'
    ]
})

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.interactions = new Discord.Collection();

module.exports.client = client
module.exports.Discord = Discord
module.exports.config = config
module.exports.SlashCmd = SlashCmd

// Command Handler
fs.readdirSync('./commands').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
            console.log("Cannot find any commands!");
            return;
        }
        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            client.commands.set(fileGet.help.name, fileGet);
        });
    });
});

// Event Handler
fs.readdirSync('./events').forEach(dir => {
    fs.readdir(`./events/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
            console.log("Cannot find any events!");
            return;
        }
        jsFiles.forEach(file => {
            var eventGet = require(`./events/${dir}/${file}`);
            client.events.set(eventGet.name, eventGet);
        });
    });
});

// Command Handler
fs.readdirSync('./interactions').forEach(dir => {
    fs.readdir(`./interactions/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
            console.log("Cannot find any interactions!");
            return;
        }
        jsFiles.forEach(file => {
            var fileGet = require(`./interactions/${dir}/${file}`);
            client.interactions.set(fileGet.help.name, fileGet);
        });
    });
});



process.on('unhandledRejection', (reason, p) => {
    try {
        console.log(' [Anti-Crash] :: Unhandled Rejection/Catch')
        console.log(reason, p)

        const errEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('❌ New Error Support Bot')
            .setDescription(`An error just occured, please check the console!\n\n**ERROR:**\n\n\`\`\`${reason}\n\n${p}\`\`\``)
            .setTimestamp()
            .setFooter('Anti-Crash System');

        client.channels.cache.get(config.errChannel).send({ content: config.errMsg, embeds: [errEmbed] })
    } catch (err) {
        console.error(err);
    }
})

process.on('uncaughtExceptionMonitor', (err, origin) => {
    try {
        console.log(' [Anti-Crash] :: Uncaught Exception/Catch')
        console.log(err, origin)

        const errEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('❌ New Error Support Bot')
            .setDescription(`An error just occured, please check the console!\n\n**ERROR:**\n\n\`\`\`${err}\n\n${origin}\`\`\``)
            .setTimestamp()
            .setFooter('Anti-Crash System');

        client.channels.cache.get(config.errChannel).send({ content: config.errMsg, embeds: [errEmbed] })
    } catch (err) {
        console.error(err);
    }
})

process.on('multipleResolves', (type, promise, reason) => {
    try {
        console.log(' [Anti-Crash] :: Multiple Resolves')
        console.log(type, promise, reason)

        const errEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('❌ New Error Support Bot')
            .setDescription(`An error just occured, please check the console!\n\n**ERROR:**\n\n\`\`\`${type}\n\n${promise}\n\n${reason}\`\`\``)
            .setTimestamp()
            .setFooter('Anti-Crash System');

        client.channels.cache.get(config.errChannel).send({ content: config.errMsg, embeds: [errEmbed] })

    } catch (err) {
        console.error(err);
    }
})

client.login(token);

//client.login(testtoken);

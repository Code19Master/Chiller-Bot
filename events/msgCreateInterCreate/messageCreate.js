const Discord = require("../../index").Discord
const config = require("../../index").config
const client = require("../../index").client

client.on("messageCreate", async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    client.commands.get(command).run(client, message, args, config, Discord);
})
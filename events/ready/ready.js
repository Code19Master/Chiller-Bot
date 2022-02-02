const Discord = require("../../index").Discord
const config = require("../../index").config
const client = require("../../index").client
const SlashCmd = require("../../index").SlashCmd

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('HUISDFGSDG', {
        type: 'PLAYING'
    });

    SlashCmd(client);
    
});
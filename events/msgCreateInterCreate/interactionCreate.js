const Discord = require("../../index").Discord
const config = require("../../index").config
const client = require("../../index").client

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        let interactions = client.interactions.get(interaction.customId)
        if (interactions) interactions.run(interaction, client, config, Discord)
    } else
    if (interaction.isSelectMenu()) {
        let interactions = client.interactions.get(interaction.customId)
        if (interactions) interactions.run(interaction, client, config, Discord)
    } else
    if (interaction.isCommand()) {
        let interactions = client.interactions.get(interaction.commandName)
        if (interactions) interactions.run(interaction, client, config, Discord)
    } else
        return;
})
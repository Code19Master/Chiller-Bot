const client = require("../../index").client

client.on('interactionCreate', async (interaction) => {

    const ID = interaction.customId;
    if (isNaN(ID)) return;

    if (interaction.isButton()) {
        const wait = require('util').promisify(setTimeout);

        await interaction.deferReply({ ephemeral: true });
        await wait(2000);

        const ID = interaction.customId;


        const length = ID.length;

        if (length === 18) {
            const role = interaction.guild.roles.cache.get(ID);
            if (interaction.member.roles.cache?.has(ID)) {
                interaction.member.roles.remove(ID)
                await interaction.editReply({ content: `Removed ${role} Role!`, ephemeral: true });
            } else {
                interaction.member.roles.add(ID)
                await interaction.editReply({ content: `Added the ${role} Role!`, ephemeral: true })
            }
        }

    } else
        return;


});
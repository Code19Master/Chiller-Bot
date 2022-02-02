module.exports.run = async (interaction, client, config, Discord) => {
    await interaction.deferReply();
    await interaction.editReply('PoNg!');
}

module.exports.help = {
    name: 'ping'
}
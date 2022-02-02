module.exports.run = async (interaction, client, config, Discord) => {
    await interaction.deferReply();
    await interaction.editReply('You clicked me!');
}

module.exports.help = {
    name: 'testbutton1'
}
module.exports.run = async (interaction, client, config, Discord) => {
    await interaction.deferReply({ ephemeral: true });

    const msg = interaction.options.getString('msg')
    const role = interaction.options.getRole('role')

    const button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel(role.name)
                .setStyle('PRIMARY')
                .setCustomId(role.id),
        )

    await interaction.editReply('Command Found!')
    await interaction.channel.send({
        content: msg,
        components: [button]
    });
}

module.exports.help = {
    name: 'reaction-role-add'
}
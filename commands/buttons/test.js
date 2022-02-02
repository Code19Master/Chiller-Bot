module.exports.run = async (client, message, args, config, Discord) => {
    const button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel('Click Me!')
                .setStyle('DANGER')
                .setCustomId('testbutton1'),
        )

    await message.delete();
    await message.channel.send({
        content: 'This is a test Button!',
        components: [button]
    })
}

module.exports.help = {
    name: "testbutton"
}
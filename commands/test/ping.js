module.exports.run = async (client, message, args, config, Discord) => {
    await message.delete();
    await message.channel.send('PoNg!')
}

module.exports.help = {
    name: "ping"
}
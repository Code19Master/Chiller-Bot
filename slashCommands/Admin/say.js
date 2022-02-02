const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "say", 
  description: "Send a Text into the Chat",
  cooldown: 5,
  memberpermissions: ["MANAGE_SERVER"], 
  requiredroles: [], 
  alloweduserids: [], 
  options: [ 

		{"String": { name: "text", description: "What should I send? [ +n+ = Newline ]", required: true }}, 

		{"Channel": { name: "in_where", description: "In What Channel should I send it?", required: false }}, 

	
  ],
  run: async (client, interaction) => {
    try{
		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 
		const { guild } = member;

		const Text = options.getString("text"); 

		const ChannelOption = options.getChannel("in_where");

		const channel = ChannelOption && ["GUILD_PRIVATE_THREAD ", "GUILD_PUBLIC_THREAD ", "GUILD_NEWS_THREAD ", "GUILD_NEWS", "GUILD_TEXT"].includes(ChannelOption.type) ? ChannelOption : guild.channels.cache.get(channelId);

		await interaction.reply({content: `Sending the Message...`, ephemeral: true}); 

		await channel.send({content: String(Text).substr(0, 2000).split("+n+").join("\n")});

		interaction.editReply({content: `✅ Message sent!`, ephemeral: true}); 
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}


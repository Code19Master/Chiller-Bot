const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "embed", 
  description: "Send a embed into the Chat", 
  cooldown: 5,
  memberpermissions: ["MANAGE_SERVER"], 
  requiredroles: [], 
  alloweduserids: [], 
  options: [ 
	
	
		{"String": { name: "title", description: "What should be the Embed title?", required: true }}, 
		{"String": { name: "description", description: "What should be the Embed Description? [ +n+ = NewLine ]", required: true }}, 
		{"String": { name: "color", description: "What should be the Embed Color?", required: false }}, 
		{"Channel": { name: "in_where", description: "In What Channel should I send it?", required: false }},

  ],
  run: async (client, interaction) => {
    try{
	    //console.log(interaction, StringOption)
		
		//things u can directly access in an interaction!
		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 
		const { guild } = member;
		const EmbedTitle = options.getString("title"); 
		const EmbedDescription = options.getString("description");
		const EmbedColor = options.getString("color"); 
		const ChannelOption = options.getChannel("in_where");
		const channel = ChannelOption && ["GUILD_PRIVATE_THREAD ", "GUILD_PUBLIC_THREAD ", "GUILD_NEWS_THREAD ", "GUILD_NEWS", "GUILD_TEXT"].includes(ChannelOption.type) ? ChannelOption : guild.channels.cache.get(channelId);
		let embed = new MessageEmbed().setColor(EmbedColor ? EmbedColor : "BLURPLE")
		.setTitle(String(EmbedTitle).substr(0, 256))
		.setDescription(String(EmbedDescription).substr(0, 2048).split("+n+").join("\n"))
		.setFooter(guild.name, guild.iconURL({dynamic: true}));
		//update it without a response!
		await interaction.reply({content: `Sending the Embed...`, ephemeral: true}); 
		//SEND THE EMBED!
		await channel.send({embeds: [embed]});
		//Edit the reply
		interaction.editReply({content: `✅ Embed sent!`, ephemeral: true}); 
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}


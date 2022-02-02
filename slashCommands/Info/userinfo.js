const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const moment = require('moment');
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
  if (Array.from(arr.values()).length > maxLen) {
    const len = Array.from(arr.values()).length - maxLen;
    arr = Array.from(arr.values()).sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
    arr.map(role => `<@&${role.id}>`)
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}
const statuses = {
  "online" : "🟢",
  "idle" : "🟠",
  "dnd" : "🔴",
  "offline" : "⚫️",
}
module.exports = {
  name: "userinfo", 
  description: "Gives you information about a User",
  cooldown: 1,
  memberpermissions: [], 
  requiredroles: [], 
  alloweduserids: [], 
  options: [ 
		{"User": { name: "which_user", description: "From Which User do you want to get Information from?", required: false }}, 
  ],
  run: async (client, interaction) => {
    try{

		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 
		const { guild } = member;
		let UserOption = options.getUser("which_user");
		if(!UserOption) UserOption = member.user;
		try{
			await guild.members.fetch();
			const member = guild.members.cache.get(UserOption.id);
			const roles = member.roles;
			const userFlags = UserOption.flags.toArray();
			const activity = UserOption.presence?.activities[0];
			//create the EMBED
			const embeduserinfo = new MessageEmbed()
			embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			embeduserinfo.setAuthor("Information about:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
			embeduserinfo.addField('**❱ Username:**',`<@${member.user.id}>\n\`${member.user.tag}\``,true)
			embeduserinfo.addField('**❱ ID:**',`\`${member.id}\``,true)
			embeduserinfo.addField('**❱ Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`,true)
			embeduserinfo.addField('**❱ Date Join DC:**', "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
			embeduserinfo.addField('**❱ Date Join Guild:**', "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
			embeduserinfo.addField('**❱ Flags:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``,true)
			embeduserinfo.addField('**❱ Status:**',`\`${statuses[member.user.presence?.status]} ${member.user.presence?.status}\``,true)
			embeduserinfo.addField('**❱ Highest Role:**',`${member.roles.highest.id === guild.id ? 'None' : member.roles.highest}`,true)
			embeduserinfo.addField('**❱ Is a Bot:**',`\`${member.user.bot ? "✔️" : "❌"}\``,true)
			var userstatus = "Not having an activity";
			if(activity){
			  if(activity.type === "CUSTOM_STATUS"){
				let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
				userstatus = `${emoji} \`${activity.state || 'Not having an acitivty.'}\``
			  }
			  else{
				userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
			  }
			}
			embeduserinfo.addField('**❱ Activity:**',`${userstatus}`)
			embeduserinfo.addField('**❱ Permissions:**',`${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
			embeduserinfo.addField(`❱ [${roles.cache.size}] Roles: `, roles.cache.size < 25 ? Array.from(roles.cache.values()).sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : roles.cache.size > 25 ? trimArray(roles.cache) : 'None')
			embeduserinfo.setColor(ee.color)
			embeduserinfo.setFooter(ee.footertext, ee.footericon)
			//send the EMBED
			interaction.reply({embeds: [embeduserinfo], ephemeral: true})
		  }catch (e){
			console.log(e)
			const userFlags = UserOption.flags.toArray();
			const activity = UserOption.presence?.activities[0];
			//create the EMBED
			const embeduserinfo = new MessageEmbed()
			embeduserinfo.setThumbnail(UserOption.displayAvatarURL({ dynamic: true, size: 512 }))
			embeduserinfo.setAuthor("Information about:   " + UserOption.username + "#" + UserOption.discriminator, UserOption.displayAvatarURL({ dynamic: true }), "https://discord.gg/FQGXbypRf8")
			embeduserinfo.addField('**❱ Username:**',`<@${UserOption.id}>\n\`${UserOption.tag}\``,true)
			embeduserinfo.addField('**❱ ID:**',`\`${UserOption.id}\``,true)
			embeduserinfo.addField('**❱ Avatar:**',`[\`Link to avatar\`](${UserOption.displayAvatarURL({ format: "png" })})`,true)
			embeduserinfo.addField('**❱ Flags:**',`\`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\``,true)
			embeduserinfo.addField('**❱ Status:**',`\`${statuses[UserOption.presence?.status]} ${UserOption.presence?.status}\``,true)
			embeduserinfo.addField('**❱ Is a Bot:**',`\`${UserOption.bot ? "✔️" : "❌"}\``,true)
			var userstatus = "Not having an activity";
			if(activity){
			  if(activity.type === "CUSTOM_STATUS"){
				let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
				userstatus = `${emoji} \`${activity.state || 'Not having an acitivty.'}\``
			  }
			  else{
				userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
			  }
			}
			embeduserinfo.addField('**❱ Activity:**',`${userstatus}`)
			embeduserinfo.addField('**❱ Permissions:**',`${member.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
			embeduserinfo.setColor(ee.color)
			embeduserinfo.setFooter(ee.footertext, ee.footericon)
			//send the EMBED
			interaction.reply({embeds: [embeduserinfo], ephemeral: true})
		  }
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}


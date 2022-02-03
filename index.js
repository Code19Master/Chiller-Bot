const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

client.on("messageCreate", message => {
  if(message.content === "Test msg") {
    message.channel.send("working!")
  }
  if(message.content === "test msg") {
    message.channel.send("working!")
  }
if(message.content.toLowerCase() ==="test embed") {
let embed = new Discord.MessageEmbed()
.setTitle("tis working?")
.setDescription("yes tis working!")
.setFooter("Status:clear!")
.addField("all system rinning!", "botscriptnode")
.setColor("GREEN")
message.channel.send({embeds:[embed]})
  }
if(message.content ==="Test embed") {
let embed = new Discord.MessageEmbed()
.setTitle("tis working?")
.setDescription("yes tis working!")
.addField("all system running!", "botscriptnode")
.setFooter("Status:clear!")
.setColor("GREEN")
message.channel.send({embeds:[embed]})
  }

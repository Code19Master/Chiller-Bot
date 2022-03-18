const Discord = require("discord.js");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord.js');
const { Client, Intents, Collection } = require('discord.js');
const akinator = require("discord.js-akinator")
const simplydjs = require("simply-djs");
const moment = require("moment")
const discordModals = require('discord-modals') 
const child = require('child_process')
const prefix = "ch!"
const { inspect } = require("util");
const db = require("quick.db")
const fortniteapi = require('fortnite-api-js');
const DIG = require("discord-image-generation");
const Fetch = require("node-fetch"); 
const Scraper = require("mal-scraper");
const urban = require('relevant-urban');
const imdb = require("imdb-api");
const mongoose = require('mongoose');
const axios = require('axios');


const warnSchema = require("./models/warn-schema.js");

const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method
const client = new Discord.Client({
    intents: [ Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
      ]
});

const token = process.env.TOKEN;
const testtoken = process.env.TEST_TOKEN;
const fn_api = process.env.FN_API_KEY; //fn api key
const mongo = process.env.mongodb;
const language = "en"; 
const childMode = true;
const gameType = "character"; 
const useButtons = true; 
const embedColor = "#000000";
const esnipes = {};

discordModals(client); // discord-modals needs your client in order to interact with modals 

fortniteapi.configuration({
  key: fn_api
});










client.on('ready', async () => {
  await mongoose.connect(mongo, {
    keepAlive: true,
  })

    console.log(`Logged in as ${client.user.tag}!`);
    const arrayOfStatus = [
        `${client.guilds.cache.size} servers || ${client.users.cache.size} users`,
        `${prefix}help || CodeMaster100#7978`,
        `Vote me On Top.gg`, 
        `invite me || ${prefix}invite`,
     ];
      
      let index = 0;
      setInterval(() => {
        if(index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        //console.log(status);
        client.user.setActivity(status);
        index++;
      }, 4000)


const guildId = '';
const guild = client.guilds.cache.get(guildId);
let commands

if (guild) {
  commands = guild.commands
} else {
  commands = client.application?.commands
}

commands?.create({
  name: 'say',
  description: 'Chiller says what you want him to Say',
})

commands?.create({
  name: 'ping',
  description: 'Ping of the bot',
})

commands?.create({
  name: 'embed',
  description: 'Create A Embed',
})

commands?.create({
  name: 'help',
  description: 'Help Command',
})

commands?.create({
  name: 'poll',
  description: 'Make A Poll In your Guild',
})

commands?.create({
  name: 'botinfo',
  description: 'information about the bot',
})

commands?.create({
  name: '8ball',
  description: 'Ask the 8ball a question',
})

 commands?.create({
  name: 'sus',
  description: 'Sus',
 })

  commands?.create({
  name: 'devinfo',
  description: 'Info about the Developer',
  })

  commands?.create({
  name: 'f',
  description: 'Pay respect',
  })

  commands?.create({
  name: 'coinflip',
  description: 'Flip a coin',
  })





});
//mogoose
let schema = mongoose.Schema({
  user: String,
  guildid: String,
  content: Array
})



//snipe message delete event
client.snipes = new Discord.Collection
client.on('messageDelete', function(message, channel) {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null
	});
});


//snipe message edit event
client.editSnipe = new Discord.Collection
client.on("messageUpdate", async (oldMessage, newMessage) => {
  client.editSnipe.set(newMessage.channel.id, {
    oldMessage: oldMessage,
    newMessage: newMessage
    })
   })
;
//slash command and modals


const modal = new Modal() // We create a Modal
.setCustomId('modal-1')
.setTitle('Say Command')
.addComponents(
  new TextInputComponent() // We create a Text Input Component
  .setCustomId('input-1')
  .setLabel('What do you want Chiller to say?')
  .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
  .setMinLength(4)
  .setMaxLength(20)
  .setPlaceholder('Write The Text Here')
  .setRequired(true) // If it's required or not
);

const modal2 = new Modal()
.setCustomId('modal-2')
.setTitle('Say Command')
.addComponents(
  new TextInputComponent() 
  .setCustomId('input-2-1')
  .setLabel('TITLE')
  .setStyle('SHORT')
  .setMinLength(2)
  .setMaxLength(20)
  .setPlaceholder('Title of the embed.')
  .setRequired(true),
  new TextInputComponent() 
  .setCustomId('input-2-2')
  .setLabel('DESCRIPTION')
  .setStyle('LONG')
  .setMinLength(2)
  .setMaxLength(4000)
  .setPlaceholder('Description of the embed.')
  .setRequired(true),
  new TextInputComponent() 
  .setCustomId('input-2-3')
  .setLabel('FOOTER')
  .setStyle('LONG')
  .setMinLength(2)
  .setMaxLength(20)
  .setPlaceholder('Footer of the embed.')
  .setRequired(false)
);

const modal3 = new Modal()
.setCustomId('modal-3')
.setTitle('Say Command')
.addComponents(
  new TextInputComponent() 
  .setCustomId('input-3-1')
  .setLabel('TITLE')
  .setStyle('SHORT')
  .setMinLength(2)
  .setMaxLength(40)
  .setPlaceholder('Title of the Poll.')
  .setRequired(true),
  new TextInputComponent() 
  .setCustomId('input-3-2')
  .setLabel('1st Option')
  .setStyle('LONG')
  .setMinLength(2)
  .setMaxLength(40)
  .setPlaceholder('1st Option of the Poll')
  .setRequired(true),
  new TextInputComponent() 
  .setCustomId('input-3-3')
  .setLabel('2nd Option')
  .setStyle('LONG')
  .setMinLength(2)
  .setMaxLength(40)
  .setPlaceholder('2nd Option of the Poll')
  .setRequired(true),
  new TextInputComponent() 
  .setCustomId('input-3-4')
  .setLabel('Your Username')
  .setStyle('LONG')
  .setMinLength(2)
  .setMaxLength(40)
  .setPlaceholder('Type Your Username')
  .setRequired(true)
);
const modal4 = new Modal() // We create a Modal
.setCustomId('modal-4')
.setTitle('8ball')
.addComponents(
  new TextInputComponent() // We create a Text Input Component
  .setCustomId('input-4-1')
  .setLabel('8Balls Question')
  .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
  .setMinLength(4)
  .setMaxLength(40)
  .setPlaceholder('Write The Question Here')
  .setRequired(true) // If it's required or not
);




client.on('modalSubmit', async modal => {
  if(modal.customId === 'modal-1'){
    const firstResponse = modal.getTextInputValue('input-1')
    modal.reply(`${firstResponse}`)
  }  
  if(modal.customId === 'modal-2'){
    const firstResponse = modal.getTextInputValue('input-2-1')
    const secondResponse = modal.getTextInputValue('input-2-2')
    const thirdResponse = modal.getTextInputValue('input-2-3')
    const embed = new Discord.MessageEmbed()
    .setTitle(firstResponse)
    .setDescription(secondResponse)
    .setFooter(thirdResponse)
    modal.reply({ embeds: [embed] })
  }
  if(modal.customId === 'modal-3'){
    const title = modal.getTextInputValue('input-3-1')
    const poll1 = modal.getTextInputValue('input-3-2')
    const poll2 = modal.getTextInputValue('input-3-3')
    const username = modal.getTextInputValue('input-3-4')
    const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setDescription(`:regional_indicator_a:${poll1}\n:regional_indicator_b:${poll2}`)
    .setFooter(`Poll By: ${username}`)
    modal.reply({ embeds: [embed] })
  }
  if(modal.customId === 'modal-4'){
    const question = modal.getTextInputValue('input-4-1')
    let replies = ["Yes.", "No.", "idk", "Nope.", "yes and no", "Won't tell", "Ask CodeMaster100", "What if i said **NO**", "What if i said **YES**", "Tough Question", "Excellent Question", "Dumb Question"]
 
    let embed = new Discord.MessageEmbed()
    .setDescription(`**QUESTION** - ` + question + `\n:8ball: Answer: ${replies[Math.floor(Math.random() * replies.length)]}`)
    .setColor("BLACK")
    modal.reply({ embeds: [embed] })
  }
    


})

client.on('interactionCreate', async interaction => {
  if(interaction.commandName === 'say'){
    showModal(modal, {
      client: client, 
      interaction: interaction
    })
  }
  if(interaction.commandName === `ping`){
    const embed = new MessageEmbed()
    .setTitle('***Pong!***')
    .setColor('BLACK')
    .addField('Ping:', client.ws.ping + 'ms')
    .setTimestamp()
    interaction.reply({ embeds: [embed] })
  }
  if(interaction.commandName === `embed`){
    showModal(modal2, {
      client: client, 
      interaction: interaction
    })
  }

  if(interaction.commandName === `poll`){
    showModal(modal3, {
      client: client, 
      interaction: interaction
    })
  }

  if(interaction.commandName === `devinfo`){
    const embed = new MessageEmbed()
    .setTitle('***DEVELOPERS***')
    .setColor('BLACK')
    .setDescription('Divik aka CodeMaster100#7978 - Bot Developer, Web Developer and Game Developer')
    .setTimestamp()

    const but = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setLabel('My Github')
      .setStyle('LINK')
      .setURL('https://github.com/Code19Master'),
    )
    .addComponents(
    new MessageButton()
    .setLabel('My Portfolio')
    .setStyle('LINK')
    .setURL('https://codemaster-portfolio.netlify.app/'),
    );
    
await interaction.reply({ embeds: [embed], components: [but] });
  }

  if(interaction.commandName === `botinfo`){
    const embed = new MessageEmbed()
    .setTitle('***Bot Info***')
    .setColor('BLACK')
    .addField('Bot Name:', client.user.username)
    .addField('Bot ID:', client.user.id)
    .addField('Bot Tag:', client.user.tag)
    .addField('Bot Owner:', 'CodeMaster100#7978')
    .addField('Bot Server Count', `${client.guilds.cache.size}`)
    .addField('Bot User Count', `${client.users.cache.size}`)
    .addField('Bot Prefix:', `${prefix}`)
    .addField('Bot Version:', '1.1.0')
    .setTimestamp()
    
    const but = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setLabel('Vote Me')
    .setStyle('LINK')
    .setURL('https://top.gg/bot/945030482792439888'),//Change Link To Vote Me TOPGG 
    );
  
  await interaction.reply({ embeds: [embed], components: [but] });
  }

  if(interaction.commandName === `8ball`){
    showModal(modal4, {
      client: client,
      interaction: interaction
    })
  }

  if(interaction.commandName === `sus`){
    let sus = 
["https://c.tenor.com/YebbLUmkg9YAAAAM/among-us.gif",
"https://c.tenor.com/vHroFuuevf0AAAAM/among-us.gif",
"https://c.tenor.com/5j6SImhtzsEAAAAM/sus-suspect.gif",
"https://c.tenor.com/SSF8otXFR3UAAAAM/sus.gif",
"https://c.tenor.com/LxeR852sVAMAAAAM/sus-check.gif",
"https://c.tenor.com/1A6sTQJwLYAAAAAM/king-of-fighters-iori-yagami.gif",
"https://c.tenor.com/H46daZMWzi4AAAAM/sus-buff.gif",
"https://c.tenor.com/9smDMBhbmPoAAAAM/among-us-kinda-sus.gif",
"https://c.tenor.com/u4DTDP287_kAAAAM/sus-suspect.gif"]

 interaction.reply({ content: `${sus[Math.floor(Math.random() * sus.length)]}` })

  }

  if(interaction.commandName === `f`){
    let user = interaction.user.id
    interaction.reply(`<@${user}> paid Respect :heart:`)
  }

  if(interaction.commandName === `coinflip`){
    let user = interaction.user.id
    let coinside = ["Heads", "Tails"]
    interaction.reply(`<@${user}> Just flipped a coin and got **${coinside[Math.floor(Math.random() * coinside.length)]}**`)
  }

  if (interaction.commandName === `help`) {
  const row = new MessageActionRow()
    .addComponents(

      new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .addOptions([
          {
            label: 'VIP Commands',
            emoji: '938788355750105108',
            value: 'Vip_option',
          },
          {
            label: 'Bot Commands',
            emoji: '938792606014513222',
            value: 'bot_option',
          },
          {
            label: 'Utility Commands',
            emoji: '📦',
            value: 'utility_option',
          },
          {
            label: 'Moderator Commands',
            emoji: '938796723420147713',
            value: 'moderator_option',
          },
          {
            label: 'Fun Commands',
            emoji: '938797555716882482',
            value: 'fun_option',
          },
        ]),
        
    );
    const but = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setLabel('Invite Me')
    .setStyle('LINK')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=945030482792439888&permissions=1644972474359&scope=bot%20applications.commands'),


    new MessageButton()
    .setLabel('Chillvile')
    .setStyle('LINK')
    .setURL('https://discord.gg/nfvKhGKaxG'),

    new MessageButton()
    .setLabel('Vote Me')
    .setStyle('LINK')
    .setURL('https://top.gg/bot/945030482792439888'),//Change Link To Vote Me TOPGG  
    );

    const firstmainembed = new MessageEmbed()
    .setTitle(':red_circle: ***CHILLER HELP***')
    .setColor('BLACK')
    .setDescription('> Chiller is an open source feature packed discord bot to make your server better. Navigate the help menu to see all commands!\n\nThe Bot Also has (/) commands!')
    .setImage('https://share.creavite.co/iFqmIETXlPzc18fy.gif')
    .setFooter({ text: 'Type ch!newUpdate to see the latest updates in the bot!'})





    






  let msg = interaction.reply({ embeds: [firstmainembed], components: [row, but] });

  const vipembed = new MessageEmbed()
  .setTitle('Vip Commands')
  .setDescription('**vip -** Do ch!vip to find out.\n**donate -** Donate The Bot Developer\n**contributors -** People who contributed')
  .setColor('BLACK')
  .setFooter({ text: 'The Bot Also has (/) commands' })
  .setTimestamp()

  const botembed = new MessageEmbed()
  .setTitle('Bot Commands')
  .setDescription('**devinfo -** Info about my Developers\n**botinfo -** Info About me \:)\n**suggest -**Suggest Command or sutff about me\n**ping -** check The Ping of the Bot\n**invite -** Invite the Bot\n**chillvile -** A Awesome Fun Community To Chill\n**vote -** Vote me on top.gg')
  .setColor('BLACK')
  .setFooter({ text: 'The Bot Also has (/) commands' })
  .setTimestamp()

  const utilityembed = new MessageEmbed()
  .setTitle('Utility Commands')
  .setDescription('**calculator -** Calculate any math equation\n**recommend Anime -** Get a Anime Recommendation(in development)\n**poll -** Do a poll\n**whois -** Get info about yourself\n**avatar -**Get your avatar\n**snipe -** Snipes the latest deleted message\n**esnipe -** Snipe a Edited Message\n**Anime News -** Gets Anime News From Reddit\n**Unix Porn -** Sexy Linux Customizations From Unix Porn Reddit\n**Tech News -** Tech News From reddit\n**urban -** Gets Meaning of the word you want to know from Urban Dictionary\n**rurban -** Random urban dictionary meanings\n**Github -** User Stats from github\n**imdb -** Details about a movie from imdb')
  .setColor('BLACK')
  .setFooter({ text: 'The Bot Also has (/) commands' })
  .setTimestamp()

  const moderatorembed = new MessageEmbed()
  .setTitle('Moderator Commands')
  .setDescription('**kick -** Kick a user\n**ban -** Ban a user\n**warn -** Warn a user\n**rwarn -** Reset All warning\n**warns -** check all warns of a user\n**listrole -** List all roles in the Guild\n**listmember -** List All member In the Guild\n**listemoji -** List all emojis\n**listchannel -** List all channels of the guild')
  .setColor('BLACK')
  .setFooter({ text: 'The Bot Also has (/) commands' })
  .setTimestamp()

  const funembed = new MessageEmbed()
  .setTitle('Fun Commands')
  .setDescription('**NQN -** Select any animated emoji from the Server and use it\n**Truth -** Gets A Truth for you and your homies\n**Dare -** Gets a dare for you and your homies\n**cool -** Tells how cool you are\n**simprate -** Tells You your simp rate\n**clownrate -** Tell your your clown rate\n**8balls -** 8balls in discord\n**akinator -** Akinator in Discord\n**Tic Tac Toe -** play tic tac toe with your homies\n**say -** Tells The Bot The Thing you want him to say\n**kill -** Kills a person\n**rate -** Rates a thing\n**f -** Pay respect\n**sanitycheck -** Checks Your Sanity\n**flipcoin -** Flips a Coin\n**blurav -** Blur Avatar\n**gay -** Gay Filter on avatar\n**gray -** Gray Filter On avatar\n**invert -** Invert Filter on avatar\n**ad -** Makes you a Ad\n**affect -** Affect Meme But with your avatar\n**beautiful -** Beutiful meme but with yout Avatar\n**bobross -** Bob Ross Paints You\n**confusedstonk -** The stonk is confused\n**delete -** Deletes Trash\n**discordblack -** Discord in black colors\n**discordblue -** Discord in blue colors\n**facepalm -** Facepalm\n**hitler -** Worse then hitler\n**jail -** Go to jail\n**notstonk -** Stonk Crashes\n**rip -** Rip\n**stonk -** Stonk Go brrrrrr\n**tatoo -** Get The best Tatoo In the world\n**trash -** Someone needs to clean this up\n**memes** - Memes From Reddit**')
  .setColor('BLACK')
  .setFooter({ text: 'The Bot Also has (/) commands' })
  .setTimestamp()



const filter = (interaction) => interaction.user.id;   

const collector = interaction.channel.createMessageComponentCollector({
  filter,
  componentType: "SELECT_MENU"
});
     

collector.on("collect", async (collected) =>{

const value = collected.values[0]

if(value === "Vip_option"){
await collected.reply({embeds: [vipembed], ephemeral: true})
}

if(value === "bot_option"){
await collected.reply({embeds: [botembed], ephemeral: true})
}

if(value === "utility_option"){
await collected.reply({embeds: [utilityembed], ephemeral: true})
}

if(value === "moderator_option"){
await collected.reply({embeds: [moderatorembed], ephemeral: true})
}

if(value === "fun_option"){
await collected.reply({embeds: [funembed], ephemeral: true})
}




})


  }
  
})






//help (normal)
client.on('messageCreate', async message => {

   

    if (message.content === `${prefix}help` || message.content === `${prefix}Help`) {
		const row = new MessageActionRow()
			.addComponents(

				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'VIP Commands',
              emoji: '938788355750105108',
							value: 'Vip_option',
						},
						{
							label: 'Bot Commands',
              emoji: '938792606014513222',
							value: 'bot_option',
						},
            {
							label: 'Utility Commands',
              emoji: '📦',
							value: 'utility_option',
						},
            {
							label: 'Moderator Commands',
              emoji: '938796723420147713',
							value: 'moderator_option',
						},
            {
							label: 'Fun Commands',
              emoji: '938797555716882482',
							value: 'fun_option',
						},
					]),
          
			);
      const but = new MessageActionRow()
			.addComponents(
      new MessageButton()
      .setLabel('Invite Me')
      .setStyle('LINK')
      .setURL('https://discord.com/api/oauth2/authorize?client_id=945030482792439888&permissions=1644972474359&scope=bot%20applications.commands'),
 

      new MessageButton()
      .setLabel('Chillvile')
      .setStyle('LINK')
      .setURL('https://discord.gg/nfvKhGKaxG'),

      new MessageButton()
      .setLabel('Vote Me')
      .setStyle('LINK')
      .setURL('https://top.gg/bot/945030482792439888'),//Change Link To Vote Me TOPGG 
      );

      const firstmainembed = new MessageEmbed()
      .setTitle(':red_circle: ***CHILLER HELP***')
      .setColor('BLACK')
      .setDescription('> Chiller is an open source feature packed discord bot to make your server better. Navigate the help menu to see all commands!\n\nThe Bot Also has (/) commands!')
      .setImage('https://share.creavite.co/iFqmIETXlPzc18fy.gif')
      .setFooter({ text: 'Type ch!newUpdate to see the latest updates in the bot!'})






      




  
 
    let msg = await message.channel.send({ embeds: [firstmainembed], components: [row, but] });

    const vipembed = new MessageEmbed()
    .setTitle('Vip Commands')
    .setDescription('**vip -** Do ch!vip to find out.\n**donate -** Donate The Bot Developer\n**contributors -** People who contributed')
    .setColor('BLACK')
    .setFooter({ text: 'The Bot Also has (/) commands' })
    .setTimestamp()

    const botembed = new MessageEmbed()
    .setTitle('Bot Commands')
    .setDescription('**devinfo -** Info about my Developers\n**botinfo -** Info About me \:)\n**suggest -**Suggest Command or sutff about me\n**ping -** check The Ping of the Bot\n**invite -** Invite the Bot\n**chillvile -** A Awesome Fun Community To Chill\n**vote -** Vote me on top.gg')
    .setColor('BLACK')
    .setFooter({ text: 'The Bot Also has (/) commands' })
    .setTimestamp()

    const utilityembed = new MessageEmbed()
    .setTitle('Utility Commands')
    .setDescription('**calculator -** Calculate any math equation\n**recommend Anime -** Get a Anime Recommendation(in development)\n**poll -** Do a poll\n**whois -** Get info about yourself\n**avatar -**Get your avatar\n**snipe -** Snipes the latest deleted message\n**esnipe -** Snipe a Edited Message\n**Anime News -** Gets Anime News From Reddit\n**Unix Porn -** Sexy Linux Customizations From Unix Porn Reddit\n**Tech News -** Tech News From reddit\n**urban -** Gets Meaning of the word you want to know from Urban Dictionary\n**rurban -** Random urban dictionary meanings\n**Github -** User Stats from github\n**imdb -** Details about a movie from imdb')
    .setColor('BLACK')
    .setFooter({ text: 'The Bot Also has (/) commands' })
    .setTimestamp()

    const moderatorembed = new MessageEmbed()
    .setTitle('Moderator Commands')
    .setDescription('**kick -** Kick a user\n**ban -** Ban a user\n**warn -** Warn a user\n**rwarn -** Reset All warning\n**warns -** check all warns of a user\n**listrole -** List all roles in the Guild\n**listmember -** List All member In the Guild\n**listemoji -** List all emojis\n**listchannel -** List all channels of the guild')
    .setColor('BLACK')
    .setFooter({ text: 'The Bot Also has (/) commands' })
    .setTimestamp()

    const funembed = new MessageEmbed()
    .setTitle('Fun Commands')
    .setDescription('**NQN -** Select any animated emoji from the Server and use it\n**Truth -** Gets A Truth for you and your homies\n**Dare -** Gets a dare for you and your homies\n**cool -** Tells how cool you are\n**simprate -** Tells You your simp rate\n**clownrate -** Tell your your clown rate\n**8balls -** 8balls in discord\n**akinator -** Akinator in Discord\n**Tic Tac Toe -** play tic tac toe with your homies\n**say -** Tells The Bot The Thing you want him to say\n**kill -** Kills a person\n**rate -** Rates a thing\n**f -** Pay respect\n**sanitycheck -** Checks Your Sanity\n**flipcoin -** Flips a Coin\n**blurav -** Blur Avatar\n**gay -** Gay Filter on avatar\n**gray -** Gray Filter On avatar\n**invert -** Invert Filter on avatar\n**ad -** Makes you a Ad\n**affect -** Affect Meme But with your avatar\n**beautiful -** Beutiful meme but with yout Avatar\n**bobross -** Bob Ross Paints You\n**confusedstonk -** The stonk is confused\n**delete -** Deletes Trash\n**discordblack -** Discord in black colors\n**discordblue -** Discord in blue colors\n**facepalm -** Facepalm\n**hitler -** Worse then hitler\n**jail -** Go to jail\n**notstonk -** Stonk Crashes\n**rip -** Rip\n**stonk -** Stonk Go brrrrrr\n**tatoo -** Get The best Tatoo In the world\n**trash -** Someone needs to clean this up\n**memes** - Memes From Reddit**')
    .setColor('BLACK')
    .setFooter({ text: 'The Bot Also has (/) commands' })
    .setTimestamp()


 const filter = (interaction) => interaction.user.id === message.author.id;   
  
 const collector = message.channel.createMessageComponentCollector({
    filter,
    componentType: "SELECT_MENU"
 });
       

collector.on("collect", async (collected) =>{
  
const value = collected.values[0]

if(value === "Vip_option"){
await collected.reply({embeds: [vipembed], ephemeral: true})
  }

  if(value === "bot_option"){
await collected.reply({embeds: [botembed], ephemeral: true})
  }

  if(value === "utility_option"){
await collected.reply({embeds: [utilityembed], ephemeral: true})
  }

  if(value === "moderator_option"){
await collected.reply({embeds: [moderatorembed], ephemeral: true})
  }

  if(value === "fun_option"){
await collected.reply({embeds: [funembed], ephemeral: true})
  }




 })


    }
    //vote
    if (message.content === prefix + "vote" || message.content === prefix + "Vote") {
      
      const embed = new MessageEmbed()
      .setTitle('***VOTE ME***')
      .setColor('BLACK')
      .setDescription('> You can vote me on top.gg!!')
      .setTimestamp()

      const but = new MessageActionRow()
			.addComponents(
      new MessageButton()
      .setLabel('Vote Me')
      .setStyle('LINK')
      .setURL('https://top.gg/bot/945030482792439888'),//Change Link To Vote Me TOPGG 
      );
      
  await message.channel.send({ embeds: [embed], components: [but] });
      

    }
    //VIP
    if (message.content === prefix + "vip" || message.content === prefix + "Vip") {
      
      const ifembed = new MessageEmbed()
      .setTitle('***Get VIP***')
      .setColor('BLURPLE')
      .setDescription('> You Can Get VIP By Contributing To The Repository Of Chiller Bot.\n> By Having VIP You Will have your name in **ch!contributors** Command.')
      .setTimestamp()

      const but = new MessageActionRow()
			.addComponents(
      new MessageButton()
      .setLabel('Github Repository')
      .setStyle('LINK')
      .setURL('https://github.com/Code19Master/Chiller-Bot'),
      );
      message.channel.send({ embeds: [ifembed], components: [but] });
      }

  //contributors
  if (message.content === prefix + "contributors") {
      
    const embed = new MessageEmbed()
    .setTitle('***VIPs***')
    .setColor('BLURPLE')
    .setDescription('> Currently There Are No legends Here \:(\n> If You Want To Be A Legend, You Can Contribute To The Repository Of Chiller')
    .setTimestamp()

    await message.channel.send({ embeds: [embed] });
      

    }
  

  //DONATE
  if (message.content === prefix + "donate" || message.content === prefix + "Donate") {
      
    const embed = new MessageEmbed()
    .setTitle('***DONATE***')
    .setColor('BLURPLE')
    .setDescription('> if you want to support the Development. You Can donate at Discord User: CodeMaster100#7978. ;)')
    .setTimestamp()

    await message.channel.send({ embeds: [embed] });
      

    }

    //developer
    if (message.content === prefix + "devinfo" || message.content === prefix + "Devinfo") {
      const embed = new MessageEmbed()
      .setTitle('***DEVELOPERS***')
      .setColor('BLACK')
      .setDescription('Divik aka CodeMaster100#7978 - Bot Developer, Web Developer and Game Developer')
      .setTimestamp()

      const but = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel('My Github')
        .setStyle('LINK')
        .setURL('https://github.com/Code19Master'),
      )
			.addComponents(
      new MessageButton()
      .setLabel('My Portfolio')
      .setStyle('LINK')
      .setURL('https://codemaster-portfolio.netlify.app/'),
      );
      
  await message.channel.send({ embeds: [embed], components: [but] });

    }
    //invite
    if (message.content === prefix + "invite" || message.content === prefix + "Invite") {
        
        const embed = new MessageEmbed()
        .setTitle('***Invite Me***')
        .setColor('BLACK')
        .setDescription('> You Can Invite Me To Your Server By Using This Link')
        .setTimestamp()
  
        const but = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setLabel('Invite Me')
        .setStyle('LINK')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=945030482792439888&permissions=1644972474359&scope=bot%20applications.commands'),
        );
        
    await message.channel.send({ embeds: [embed], components: [but] });
        
  
      }
      //support
      if (message.content === prefix + "chillvile" || message.content === prefix + "Chillvile") {
        const embed = new MessageEmbed()
        .setTitle('***Chillvile***')
        .setColor('BLACK')
        .setDescription('> Chillvile is a Awesome And Fun community where u can communicate With People Make Freinds,Chill And Have Fun')
        .setTimestamp()
  
        const but = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setLabel('Chillvile')
        .setStyle('LINK')
        .setURL('https://discord.gg/nfvKhGKaxG'),
        );
        
    await message.channel.send({ embeds: [embed], components: [but] });
        
  
      }
//say
if (message.content.startsWith(prefix + "say")  || message.content.startsWith(prefix + "Say")) {
  const sayMessage = message.content.slice(7);
  if(!sayMessage) return message.channel.send("Please Provide A Message To Say!");
  message.delete();
  message.channel.send(sayMessage);
}
//uptime
if (message.content === prefix + "uptime") {
  const embed = new MessageEmbed()
  .setTitle('***Uptime***')
  .setColor('BLACK')
  .setDescription('> Uptime: ' + client.uptime + 'ms')
  .setTimestamp()

await message.channel.send({ embeds: [embed] });
}
//avatar
if (message.content.startsWith(prefix + "avatar") || message.content.startsWith(prefix + "Avatar")) { 
  let user = message.author.avatarURL();
  const embed = new MessageEmbed()
  .setTitle('***Avatar***')
  .setColor('BLACK')
  .setURL(user)
  .setImage(user)
  .setTimestamp()

await message.channel.send({ embeds: [embed] });
}
//ping
if (message.content === prefix + "ping" || message.content === prefix + "Ping") {
  const embed = new MessageEmbed()
  .setTitle('***Pong!***')
  .setColor('BLACK')
  .addField('Ping:', client.ws.ping + 'ms')
  .setTimestamp()

await message.channel.send({ embeds: [embed] });
}

//bot info
if (message.content === prefix + "botinfo" || message.content === prefix + "Botinfo") {
  const embed = new MessageEmbed()
  .setTitle('***Bot Info***')
  .setColor('BLACK')
  .addField('Bot Name:', client.user.username)
  .addField('Bot ID:', client.user.id)
  .addField('Bot Tag:', client.user.tag)
  .addField('Bot Owner:', 'CodeMaster100#7978')
  .addField('Bot Server Count', `${client.guilds.cache.size}`)
  .addField('Bot User Count', `${client.users.cache.size}`)
  .addField('Bot Prefix:', `${prefix}`)
  .addField('Bot Version:', '1.1.0')
  .setTimestamp()
  
  const but = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setLabel('Vote Me')
  .setStyle('LINK')
  .setURL('https://top.gg/bot/945030482792439888'),//Change Link To Vote Me TOPGG 
  );

await message.channel.send({ embeds: [embed], components: [but] });
}
//akinator
if (message.content === prefix + "akinator" || message.content === prefix + "Akinator") {
  akinator(message, {
      language: language, 
      childMode: childMode, 
      gameType: gameType, 
      useButtons: useButtons, 
      embedColor: embedColor 
  });
}


//which take suggestion from a user and send it to a channel
if (message.content.startsWith(prefix + "suggest") || message.content.startsWith(prefix + "Suggest")) {
  const suggestMessage = message.content.slice(11);
  if(!suggestMessage) return message.channel.send("Please Provide A Suggestion!");
  message.delete();
  const embed = new MessageEmbed()
  .setTitle('***Suggestion***')
  .setColor('BLACK')
  .setDescription('> Suggestion: ' + suggestMessage)
  .setTimestamp()
  message.channel.send("Your Suggestion Has Been Sent To The Development Server!");
  client.channels.cache.get('888455701326889027').send({ embeds: [embed] });
  }

//kick command 
if (message.content.startsWith(prefix + "kick") || message.content.startsWith(prefix + "Kick")) {
  const member = message.mentions.members.first()
  if (!member) return message.channel.send('You need to mention a user/provide an ID')
  if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('You lack the required permissions')
 
  try {
  member.kick().then(() => {
  message.channel.send(`Kicked ${member}`)
  })
  } catch (err) {
  console.log(err)
  message.channel.send('Oops, something went wrong ')
  }
 }
 //calculator 
 if (message.content === prefix + "calc" || message.content === prefix + "Calc") {
simplydjs.calculator(message, {
  embedColor: "#000000",
  credit: false,
});
}


//nqn
simplydjs.nqn(message);

//simprate command
if (message.content.startsWith(prefix + "simprate") || message.content.startsWith(prefix + "Simprate")) {
    let user = message.mentions.users.first() || message.author
    let simps = Math.floor(Math.random() * 100) + 1;
    message.channel.send(`${user} is **${simps}**% Simp. SIMP!`)
}

//cool command
if (message.content.startsWith(prefix + "cool") || message.content.startsWith(prefix + "Cool")) {
  let user = message.mentions.users.first() || message.author
  let cool = Math.floor(Math.random() * 100) + 1;
  message.channel.send(`${user} is **${cool}** Percent Cool Right Now, Atleast`)
}

//clownrate command
if (message.content.startsWith(prefix + "clownrate") || message.content.startsWith(prefix + "Clownrate")) {
  let user = message.mentions.users.first() || message.author
  let clown = Math.floor(Math.random() * 100) + 1;
  message.channel.send(`${user} is **${clown}**% Clown. :clown:`)
}
//8ball
if (message.content.startsWith(prefix + "8ball") || message.content.startsWith(prefix + "8Ball")) {
  const args = message.content.slice(9);
  if(!args) return message.channel.send("Please Provide A Question!");
  let replies = ["Yes.", "No.", "idk", "Nope.", "yes and no", "Won't tell", "Ask CodeMaster100", "What if i said **NO**", "What if i said **YES**", "Tough Question", "Excellent Question", "Dumb Question"]
 
  let embed = new Discord.MessageEmbed()
  .setDescription(`**QUESTION** - ` + args + `\n:8ball: Answer: ${replies[Math.floor(Math.random() * replies.length)]}`)
  .setColor("BLACK")
  message.channel.send({ embeds: [embed] })
  }

  //truths
  if (message.content === prefix + "truth" || message.content === prefix + "Truth") {
    let truth = 
    ["If you could be invisible, what’s the first thing you would do?",
    "What’s a secret you kept from your parents?",
    "What’s the most embarrassing music you listen to?",
    "What’s the most embarrassing thing you’ve done?",
    "What’s one thing you wish you could change about yourself?",
    "Who is your secret crush?",
    "Who is the last person you creeped on social media?",
    "When was the last time you wet the bed?",
    "If a genie granted you three wishes, what would you ask for?",
    "Where is the weirdest place you've ever gone to the bathroom?",
    "What’s the most embarrassing thing you’ve done in front of a mirror?",
    "What’s the most food you've ever eaten in a single sitting?",
    "Which player would survive a zombie apocalypse and which would be the first to go?",
    "Reveal all the details of your first kiss.",
    "What excuse have you used before to get out plans?",
    "What's the longest you've ever slept?",
    "Read the last thing you sent your best friend or significant other out loud.",
    "What's your biggest pet peeve?",
    "When was the last time you lied?",
    "What five things would you bring to a deserted island?",
    "Which is your favorite Hollywood Chris? Chris Evans, Chris Pratt, Chris Hemsworth or Chris Pine?",
    "What's the most embarrassing thing you ever did on a date?",
    "What is the craziest pickup line you've ever used?",
    "What animal do you think you most look like?",
    "How many selfies do you take a day?",
    "What is one thing you would stand in line an hour for?",
    "When was the last time you cried?",
    "What's the longest time you've ever gone without showering?",
    "What's the most embarrassing top-played song on your phone?",
    "What was your favorite childhood show?",
    "If you had to change your name, what would your new first name be?",
    "If you could be a fictional character for a day, who would you choose?",
    "What's your biggest fear?",
    "What's one silly thing you can't live without?",
    "What is the weirdest trend you've ever participated in?",
    "If you could only listen to one song for the rest of your life, what would you choose?",
    "What person do you text the most?",
    "Have you ever been fired from a job?",
    "If you had to wear only flip flops or heels for the next 10 years, which would you choose?",
    "What’s an instant deal breaker in a potential love interest?",
    "If you could only eat one thing for the rest of your life, what would you choose?",
    "What is the biggest lie you ever told your parents?",
    "What's the worst physical pain you've ever experienced?",
    "Which player knows you the best?",
    "What's your favorite part of your body?",
    "If you could only accomplish three things in life, what would they be?",
    "What's the weirdest thing you've ever eaten?",
    "Have you ever gone skinny dipping?",
    "Tell us about the worst date you've ever been on.",
    "Who was your first celebrity crush?",
    "What's the strangest dream you've ever had?",
    "What are the top three things you look for in a love interest?",
    "What is your worst habit?",
    "How many stuffed animals do you own?",
    "What is your biggest insecurity?"]
   
    let embed = new Discord.MessageEmbed()
    .setTitle("**TRUTH**")
    .setDescription(`${truth[Math.floor(Math.random() * truth.length)]}`)
    .setColor("BLURPLE")
    .setFooter({ text: "CodeMaster100#7978" })
    message.channel.send({ embeds: [embed] })
    }
//Dare
if (message.content === prefix + "dare" || message.content === prefix + "Dare") {
    let dare = 
    ["Do a free-style rap for the next minute.",
    "Let another person post a status on your behalf.",
    "Hand over your phone to another player who can send a single text saying anything they want to anyone they want.",
    "Let the other players go through your phone for one minute.",
    "Smell yout house dustbin.",
    "Smell another player's bare foot.",
    "Eat a bite of a banana peel.",
    "Do an impression of another player until someone can figure out who it is.",
    "Say pickles at the end of every sentence you say until it's your turn again.",
    "Imitate a YouTube star until another player guesses who you're portraying.",
    "Act like a chicken until your next turn.",
    "Talk in a British accent until your next turn.",
    "Call a friend, pretend it's their birthday, and sing them Happy Birthday to You.",
    "Name a famous person that looks like each player in the room.",
    "Show us your best dance moves.",
    "Eat a packet of hot sauce straight.",
    "Let another person draw a tattoo on your back with a permanent marker.",
    "Serenade the person to your right for a full minute.",
    "Make up a song and voice record yourself singing it. Send it to me when you’re done",
    "Video yourself eating a tablespoon of butter and send it in this chat",
    "Prank call someone and try to talk for 15 minutes straight. Take a screenshot of the call",
    "Eat a spoonful of any condiment of my choosing",
    "Tell your crush you like them over text. Screenshot the conversation",
    "Wrap your head with toilet paper like a mummy, take a picture, and make it your profile pic",
    "Use a picture of poop as your phone background for 3 days",
    "Text a friend and tell them their hair is on backward",
    "Call someone and confess your new love of Justin Beiber",
    "Send me the link of the last YouTube video you watched",
    "Write a short love poem",
    "Find some lipstick and put it on",
    "Voice record yourself singing your favorite love song and send it to me",
    "Send me the most unflattering picture of yourself on your phone",
    "Read me the first email in your inbox",
    "Video call me or record yourself dancing for 1 minute with no music",
    "Send me a screenshot of your text inbox without deleting anything",
    "Take a video of yourself drinking pickle juice",
    "Go outside and do the chicken dance where people can see you for 1 minute",
    "Dip a bar of soap in sauce and lick it",
    "Write a status on Discord praising me",
    "Do the macarena for 2 minutes straight",
    "Close your eyes and write a text without looking. Send it to someone random and screenshot the conversation for proof",
    "Write a break-up text message and send it to someone random in your contacts. Take a screenshot for proof",
    "Wear all your clothing inside-out for an hour",
    "Take a video of yourself drinking water like a dog",
    "Fill your mouth full of water and say your full name. Take a video and send it",
    "Call your crush and flirt with them",
    "Dial a random number and make meaningless conversation for 2 minutes",
    "Do 25 situps without stopping",
    "Crack two eggs on your head then take a selfie"]
   
    let embed = new Discord.MessageEmbed()
    .setTitle("**DARE**")
    .setDescription(`${dare[Math.floor(Math.random() * dare.length)]}`)
    .setColor("BLURPLE")
    .setFooter({ text: "CodeMaster100#7978" })
    message.channel.send({ embeds: [embed] })
    }


    //ban
    if (message.content.startsWith(prefix + "ban") || message.content.startsWith(prefix + "Ban")) {
        if (message.member.permissions.has("BAN_MEMBERS")) {
        let member = message.mentions.members.first()
        if (!member) message.channel.send("Please mention someone")
        else {
        member.ban().then(member => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**BAN**")
          .setDescription(`Banned ${member} From The Server!`)
          .setColor("BLURPLE")
          .setFooter({ text: `Moderater : ${message.author.username}`})
          .setTimestamp()
        message.channel.send({ embeds: [embed] })
        })
        }
        } else {
        message.reply("You don't have the permission to do that...")
        }
    }
//ttt
if (message.content.startsWith(prefix + "ttt") || message.content.startsWith(prefix + "Ttt")) {

simplydjs.tictactoe(message, {
  xEmoji: "❌", 
  oEmoji: "⭕", 
  idleEmoji: "➖",
  embedColor: "#000000", 
  embedFoot: "Tic Tac Toe ",
  credit: false,
  resultBtn: true
});
  }
//whois
if (message.content.startsWith(prefix + "whois") || message.content.startsWith(prefix + "Whois")) {
  const Target = message.mentions.users.first() || message.author;
  const Member = message.guild.members.cache.get(Target.id);
  let embednew = new MessageEmbed()
    .setAuthor(`${Target.username}`, Target.displayAvatarURL({ dynamic: true }))
    .setThumbnail(Target.displayAvatarURL({ dynamic: true }))
    .setColor("#383c3c")
    .addField("UserID:", `${Target.id}`, false)
    .addField("Ping 🏓 :", `You have ${Date.now() - message.createdTimestamp}ms.`)
    .addField("Discord User Since 🌐 :", `${moment(Target.createdAt).format('MMM Do Y, h:mm:ss a')}\n**-** ${moment(Target.createdAt).startOf('day').fromNow()}`)
    .addField("Server Member Since 👥 :", `${moment(Member.joinedAt).format('MMM Do Y, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}`)
    .setTimestamp()
  message.reply({ embeds: [embednew] });
}
//poll
if (message.content.startsWith(prefix + "poll") || message.content.startsWith(prefix + "Poll")) {
  let args = message.content.slice(8);
  if (!args) return message.channel.send("Please enter a poll question!");
  let embed = new Discord.MessageEmbed()
  .setTitle("**POLL**")
  .setDescription(`${args}`)
  .setColor("#383c3c")
  .setFooter({ text: "CodeMaster100#7978" })
  .setTimestamp()


 message.channel.send({ embeds: [embed] }).then(X => 
  {
  X.react("👍")
  X.react("👎")
  })
}

//sanity check
if (message.content.startsWith(prefix + "sanitycheck") || message.content.startsWith(prefix + "Sanitycheck")) {
  let user = message.mentions.users.first() || message.author
  let sane = Math.floor(Math.random() * 100) + 1;
  message.channel.send(`${user} is **${sane}**% sane Today!`)
}

//f
if (message.content === prefix + "f" || message.content === prefix + "F") {
  let user = message.author
  message.channel.send(`**${user}** has paid Respect :heart:`)
}

//flipcoin
if (message.content === prefix + "coinflip" || message.content === prefix + "Coinflip") {
  let user = message.author
  let coinside = ["Heads", "Tails"]
  message.channel.send(`**${user}** Just flipped a coin and got **${coinside[Math.floor(Math.random() * coinside.length)]}**`)
}

//sus
if (message.content === prefix + "sus" || message.content === prefix + "Sus") {

let sus = 
["https://c.tenor.com/YebbLUmkg9YAAAAM/among-us.gif",
"https://c.tenor.com/vHroFuuevf0AAAAM/among-us.gif",
"https://c.tenor.com/5j6SImhtzsEAAAAM/sus-suspect.gif",
"https://c.tenor.com/SSF8otXFR3UAAAAM/sus.gif",
"https://c.tenor.com/LxeR852sVAMAAAAM/sus-check.gif",
"https://c.tenor.com/1A6sTQJwLYAAAAAM/king-of-fighters-iori-yagami.gif",
"https://c.tenor.com/H46daZMWzi4AAAAM/sus-buff.gif",
"https://c.tenor.com/9smDMBhbmPoAAAAM/among-us-kinda-sus.gif",
"https://c.tenor.com/u4DTDP287_kAAAAM/sus-suspect.gif"]

message.channel.send({ content: `${sus[Math.floor(Math.random() * sus.length)]}` })

}
//rate 
if (message.content.startsWith(prefix + "rate") || message.content.startsWith(prefix + "Rate")) { 
  let argu = message.content.slice(8);
  if (!argu) return message.channel.send("Please enter a thing to rate!");
  let rate = Math.floor(Math.random() * 100) + 1;
  message.channel.send(`I Rate ${argu} a solid **${rate}/100**`)
  
}


//snipe
if (message.content.startsWith(prefix + "snipe") || message.content.startsWith(prefix + "Snipe")) {
  let channel = message.mentions.channels.first() || message.channel
let sniped = client.snipes.get(channel.id)
if(!sniped) {
 message.channel.send(" :x: | There is nothing to snipe in " + channel.name)
} else {
 let em = new Discord.MessageEmbed()
 .setAuthor(sniped.author.tag, sniped.author.displayAvatarURL())
 .setDescription(sniped.content)
 .setColor("BLACK")
 .setTimestamp()
 if(sniped.image) {
   em.setThumbnail(sniped.image)
 }
   message.channel.send({ embeds: [em] }); 
}
}

//kill
if (message.content.startsWith(prefix + "kill") || message.content.startsWith(prefix + "Kill")) {
  let victim = message.mentions.users.first()
  if(!victim) message.reply("Mention someone to Kill")
  else{
 let replies = [
  `${victim} has been shot`,
  `${victim} has been stabbed`, 
  `${victim} has been drowned`, 
  `${victim} has been electrified`, 
  `A goose honked at ${victim} to death`, 
  `Some psychopath zapped ${victim} with his laser eyes`, 
  `${victim} ate a poisonous potato`, 
  `${victim} died from slowmode being to long`, 
  `${victim} was run over by car`, 
  `${victim} was pushed in lava`, 
  `${victim} was banned by the server owner`, 
  `${victim} was found dead in a dumpster`, 
  `Someone named Joe was found chewing on ${victim}'s leg`, 
  `${victim} got drunk and fell in the water`, 
  `${victim} made a deal with the devil`, 
  `${victim} was hacked by an Oreo`, 
  `An alien named MEE6 abducted ${victim} in their sleep`]
 
  message.channel.send(`${replies[Math.floor(Math.random() * replies.length)]}`) 
  }
  }
  

//listroles
    if(message.content === prefix + "listrole" || message.content === prefix + "Listrole") {
    let rolemap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .join("\n");
            if (!rolemap) rolemap = "No roles";
            if (rolemap.length > 1024) rolemap = "To many roles to display";
    const embed = new Discord.MessageEmbed()
	.addFields(
		{ name: 'Role', value: rolemap, inline: true },
	)
      
    message.channel.send({ embeds: [embed] }); 
  }


  //listmember
  if(message.content === prefix + "listmember" || message.content === prefix + "Listmember") {
  let membermap = message.guild.members.cache
  .sort((a, b) => b.joinedAt - a.joinedAt)
  .map(m => m)
  .join("\n");
  if (membermap.length > 1024) membermap = "To many members to display";
  if (!membermap) membermap = "No members";
  const embed = new Discord.MessageEmbed()
  .addFields(
    { name: 'Member', value: membermap, inline: true },
  )
  message.channel.send({ embeds: [embed] });
  }

  //listemoji
  if(message.content === prefix + "listemoji" || message.content === prefix + "Listemoji") {
  let emojimap = message.guild.emojis.cache
  .sort((a, b) => b.createdAt - a.createdAt)
  .map(e => e)
  .join("\n");
  if (emojimap.length > 1024) emojimap = "To many emoji to display";
  if (!emojimap) emojimap = "No emojis";
  const embed = new Discord.MessageEmbed()
  .addFields(
    { name: 'Emoji', value: emojimap, inline: true },
  )
  message.channel.send({ embeds: [embed] });
  }

  //listserver 
  if(message.content === prefix + "listserver" || message.content === prefix + "Listserver") {
    if (message.author.id !== "779749147989245972") return;
    client.guilds.cache.forEach(guild => {
      message.channel.send(`${guild.name} | ${guild.id} | ${guild.memberCount}`);
    })
    message.channel.send(`${client.guilds.cache.size} servers || ${client.users.cache.size} users`)
  }

  //listchannel
  if(message.content === prefix + "listchannel" || message.content === prefix + "Listchannel") {
  let channelmap = message.guild.channels.cache
  .sort((a, b) => b.createdAt - a.createdAt)
  .map(c => c)
  .join("\n");
  if (channelmap.length > 1024) channelmap = "To many channel to display";
  if (!channelmap) channelmap = "No channels";
  const embed = new Discord.MessageEmbed()
  .addFields(
    { name: 'Channel', value: channelmap, inline: true },
  )
  message.channel.send({ embeds: [embed] });
  }

  //eval
  if (message.content.startsWith("#eval")) {
    let embedOwner = new MessageEmbed()
    .addFields({name: "Owner", value: "Only the bot owner can use this command"})
    let embedReject = new MessageEmbed()
    .addFields({name: "Rejected", value: "The eval was rejected for security reasons"})
    let embedNone = new MessageEmbed()
    .addFields({name: "No input", value: "There was nothing to eval, what do you want me to eval?"})
    if(message.author.id !== "779749147989245972") return message.reply({embeds: [embedOwner]})
    if(message.content.toLowerCase().includes("token") || message.content.toLowerCase().includes("env")) return message.reply({embeds: [embedReject]})
    let args = message.content.split(" ").slice(1)
    let code = args.join(" ")
    if(!code) return message.reply({embeds: [embedNone]})
    try {
    let result = await eval(code)
    let output = result
    if(typeof resut !== "string") {
    output = inspect(result)
    }
    let embedEval = new MessageEmbed()
    .setTitle("Output")
    .setDescription(`\`\`\`js\n${output}\`\`\``)
    .setTimestamp()
    message.reply({embeds: [embedEval], allowedMentions: {repliedUser: false}})
    } catch(error) {
    let embedError = new MessageEmbed()
    .setTitle("Error")
    .setDescription(`\`\`\`js\n${error}\`\`\``)
    message.reply({embeds: [embedError]})
    }
      
  }
  
//terminal
if(message.content.startsWith("#tl")) {
  if (message.author.id !== "779749147989245972") return;
  let args = message.content.slice(4)
  if (!args) return message.channel.send("No input");
  require("child_process").exec(args, (err, stdout, stderr, res) =>{
if (err) return message.channel.send(`A error occured:\n${err}`);
message.channel.send(stdout + "\nres:\n" + res);
})
}

//shutdown bot
if (message.content === prefix + "fudge_off") {
  if (message.author.id !== "779749147989245972") return;
  message.channel.send("Shutting down...").then(() => {
    message.channel.send("Shutdown complete, destroyed the bot");
    client.destroy();
  });
  };

//esnipe
if (message.content.startsWith(prefix + "esnipe") || message.content.startsWith(prefix + "Esnipe")) {
  let channel = message.mentions.channels.first() || message.channel
  let msg = client.editSnipe.get(channel.id)
  if(!msg) return message.channel.send("There is nothing to editsnipe!")
  let embed = new Discord.MessageEmbed()
  .setTitle(msg.oldMessage.author.tag)
  .setThumbnail(msg.oldMessage.author.displayAvatarURL({dynamic: true}))
  .setColor("RANDOM")
  .addFields(
  {name: "Content Before", value: msg.oldMessage.content},
  {name: "Content After", value: msg.newMessage.content}
  )
  if(msg.oldMessage.attachments.first()) embed.setImage(msg.oldMessage.attachments.first().url)
  message.channel.send({embeds: [embed]})

  }
//blurav
if (message.content === prefix + "blurav" || message.content === prefix + "Blurav") {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
    // Make the image
    let img = await new DIG.Blur().getImage(avatar)
    // Add the image as an attachement
    let embed = new Discord.MessageEmbed()
        .setTitle("Blur")
        .setImage("attachment://delete.png")
    let attach = new Discord.MessageAttachment(img, "blur.png");;
    message.channel.send({ embed: embed, files: [attach]})
}

//gay
if (message.content === prefix + "gay" || message.content === prefix + "Gay") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Gay().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Gay")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "gay.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//grey
if (message.content === prefix + "grey" ) {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Greyscale().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Grey")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "grey.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//invert
if (message.content === prefix + "invert") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Invert().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Invert")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "invert.png");;
  message.channel.send({ embed: embed, files: [attach]})
}


//ad
if (message.content === prefix + "ad") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Ad().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Advertisement")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "ad.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//affect meme
if (message.content === prefix + "affect") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Affect().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Affect")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "affect.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//beautiful
if (message.content === prefix + "beautiful") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Beautiful().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Beautiful")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "beautiful.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//bob ross
if (message.content === prefix + "bobross") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Bobross().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Bob Ross")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "bobross.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//confused stonk
if (message.content === prefix + "confusedstonk") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.ConfusedStonk().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Confused Stonk")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "confusedstonk.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//delete
if (message.content === prefix + "delete") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Delete().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Delete")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "delete.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//discordblack
if (message.content === prefix + "discordblack") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.DiscordBlack().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Discord Black")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "discordblack.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//discordblue
if (message.content === prefix + "discordblue") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.DiscordBlue().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Discord Blue")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "grey.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//facepalm
if (message.content === prefix + "facepalm") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Facepalm().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("FacePalm")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "facepalm.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//hitler
if (message.content === prefix + "hitler") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Hitler().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Hitler")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "hitler.png");;
  message.channel.send({ embed: embed, files: [attach]})
}


//Jail
if (message.content === prefix + "jail") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Jail().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Jail")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "jail.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//notstonk
if (message.content === prefix + "notstonk") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.NotStonk().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Not Stonk")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "notstonk.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//Rip
if (message.content === prefix + "rip") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Rip().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("RIP")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "rip.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//stonk
if (message.content === prefix + "stonk") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Stonk().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Stonk")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "stonk.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//tatoo
if (message.content === prefix + "tatoo") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Tatoo().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Tatoo")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "tatoo.png");;
  message.channel.send({ embed: embed, files: [attach]})
}

//trash
if (message.content === prefix + "trash") {
  let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
  // Make the image
  let img = await new DIG.Trash().getImage(avatar)
  // Add the image as an attachement
  let embed = new Discord.MessageEmbed()
      .setTitle("Trash")
      .setImage("attachment://delete.png")
  let attach = new Discord.MessageAttachment(img, "trash.png");;
  message.channel.send({ embed: embed, files: [attach]})
}


//delete messages
if (message.content.startsWith(prefix + "op")) {
  if (message.author.id !== "779749147989245972") return;
  let opargs = message.content.slice(6);
  if(!opargs) return message.channel.send("My King Kindly specify how many messages you want me to delete,\nAll Hail CodeMaster100!!")
  message.channel.bulkDelete(opargs)
  .then(messages => message.channel.send(`I have Succesfully deleted ${messages.size} messages, My King! All Hail CodeMaster100!`))
  .catch(console.error);
}

//meme
if (message.content.startsWith(prefix + "meme")) {
  const Reds = [
    "memes",
    "me_irl",
    "dankmemes",
    "comedyheaven",
    "Animemes",
    "meme"
];

const Rads = Reds[Math.floor(Math.random() * Reds.length)];

const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

const json = await res.json();

if (!json[0]) return message.channel.send(`Your Life Lmfao`);

const data = json[0].data.children[0].data;

const Embed = new MessageEmbed()
    .setURL(`https://reddit.com${data.permalink}`)
    .setTitle(data.title)
    .setDescription(`Author : ${data.author}`)
    .setImage(data.url)
    .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
    .setTimestamp();

return message.channel.send({embeds: [Embed]});

}

//github
if (message.content.startsWith(prefix + "github")) {
  const args = message.content.slice(9).trim().split(/ +/g);
  if (!args[0]) return message.channel.send(`Please Give Me A Username!`)
    
  Fetch(`https://api.github.com/users/${args.join('-')}`)
    .then(res => res.json()).then(body => {
      if(body.message) return message.channel.send(`User Not Found | Please Give Me A Valid Username!`);
    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

            const embed = new MessageEmbed()
            .setAuthor(`${login} Information!`, avatar_url)
            .setColor(`#211F1F`)
            .setThumbnail(`${avatar_url}`)
            .addField(`Username`, `${login}`)
            .addField(`ID`, `${id}`)
            .addField(`Bio`, `${bio || "No Bio"}`)
            .addField(`Public Repositories`, `${public_repos || "None"}`, true)
            .addField(`Followers`, `${followers}`, true)
            .addField(`Following`, `${following}`, true)
            .addField(`Location`, `${location || "No Location"}`)
            .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
            .setFooter(`This Is All About ${login} on github!`)

            message.channel.send({embeds: [embed]})

    })


        }

//urban
if (message.content.startsWith(prefix + "urban")) {
  const args = message.content.slice(9).trim().split(/ +/g);
  if(!args[0])
  return message.channel.send("Please Enter Something To Search");

  let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
  try {
      let res = await urban(args.join(' '))
          if (!res) return message.channel.send("No results found for this topic, sorry!");
          let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;

          let embed = new MessageEmbed()
              .setColor("GREEN")
              .setAuthor(`Urban - ${word}`)
              .setThumbnail(image)
              .setDescription(`**Meaning:**\n*${definition || "No meaning"}*\n\n**Example:**\n*${example || "No Example"}*`)
              .addField('**Rating:**', `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`)
              .addField("**Link**",  `[link to ${word}](${urbanURL})`)
              .addField("**Author:**", `${author || "unknown"}`)
              .setTimestamp()

          message.channel.send({embeds: [embed]})
      
  } catch (e) {
      console.log(e)
      return message.channel.send("looks like i've broken! Try again")
  }
}


//random urban
if (message.content.startsWith(prefix + "rurban")) {
  
  let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
  try {
      let res = await urban.random()
          if (!res) return message.channel.send("No results found for this topic, sorry!");
          let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;

          let embed = new MessageEmbed()
              .setColor("GREEN")
              .setAuthor(`Urban - ${word}`)
              .setThumbnail(image)
              .setDescription(`**Meaning:**\n*${definition || "No meaning"}*\n\n**Example:**\n*${example || "No Example"}*`)
              .addField('**Rating:**', `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`)
              .addField("**Link**",  `[link to ${word}](${urbanURL})`)
              .addField("**Author:**", `${author || "unknown"}`)
              .setTimestamp()

          message.channel.send({embeds: [embed]})
      
  } catch (e) {
      console.log(e)
  }
}

//imdb
if (message.content.startsWith(prefix + "imdb")) {
  const args = message.content.slice(8).trim().split(/ +/g);
  if(!args[0]) {
    return message.channel.send("Please give the name of movie or series")
  }
  
  const imob = new imdb.Client({apiKey: "5e36f0db"}) //You need to paste you imdb api
  
  let movie = await imob.get({'name': args.join(" ")})
  
  let embed = new MessageEmbed()
  .setTitle(movie.title)
  .setColor("RANDOM")
  .setThumbnail(movie.poster)
  .setDescription(movie.plot)
  .setFooter(`Ratings: ${movie.rating}`)
  .addField("Country", movie.country, true)
  .addField("Languages", movie.languages, true)
  .addField("Type", movie.type, true);
  
  
  message.channel.send({embeds: [embed]})
  
  
  

}

//warn System 



//warn
if (message.content.startsWith(prefix + "warn")) {
  if (!message.member.permissions.has("MANAGE_ROLES")) {
    return message.channel.send(
      "You should have manage roles perms to use this command!"
    );
  }

  const user = message.mentions.members.first();

  if (!user) {
    return message.channel.send(
      "Please Mention the person to who you want to warn"
    );
  }

  if (message.mentions.users.first().bot) {
    return message.channel.send("You can not warn bots");
  }

  if (message.author.id === user.id) {
    return message.channel.send("You can not warn yourself");
  }

  if (user.id === message.guild.ownerId) {
    return message.channel.send(
      "You jerk, how you can warn server owner? You can't warn him"
    );
  }



  let embed = new MessageEmbed()
    .setTitle("Warned")
    .setDescription(`You have been warned in **${message.guild.name}**`)
    .setColor("RED")
    .setThumbnail(message.guild.iconURL())
    .addField("Warned By", message.author.tag)
    .setTimestamp();

  let embed1 = new MessageEmbed()
    .setTitle("Warned")
    .setDescription(`You warned **${message.mentions.users.first().username}`)
    .setColor("GREEN")
    .setThumbnail(message.guild.iconURL())
    .addField("Warned By", message.author.tag)
    .setTimestamp();


    const warning = await warnSchema.create({
      user: user.id,
      guildid: message.guild.id,
      moderator: message.author.id,
    })

    
    user.send({embeds: [embed]});
    
    await message.channel.send({embeds: [embed1]});
    
    message.delete
    
  }


//warnings
if (message.content.startsWith(prefix + "showwarns")) {
  const args = message.content.slice(8).trim().split(/ +/g);
  const user = message.mentions.members.first() || message.author;

  const warnings = await warnSchema.find({
    user: user.id,
    guildid: message.guild.id,
  });

  let description = `Warnings For <@${user.id}>:\n\n`;

  for (const warn of warnings) {
    description += `**ID:** ${warn._id}\n`
    description += `**Date:** ${warn.createdAt.toLocaleString()}\n`
    description += `**Moderator:** ${warn.moderator}\n`
    description += `**guild:** <${warn.guildid}>\n`
  }

  let embed = new MessageEmbed()
  .setTitle("Warnings")
  .setDescription(description)
  .setColor("BLACK")
  .setThumbnail(message.guild.iconURL())
  .setTimestamp();

  message.channel.send({embeds: [embed]})
  

}

//remove warnings
if (message.content.startsWith(prefix + "rwarn")) {

  message.channel.send("The Command Is in Construction")
    // if (!message.member.permissions.has("MANAGE_ROLES")) {
    //   return message.channel.send(
    //     "You should have manage roles perms to use this command!"
    //   );
    // }

    // const user = message.mentions.members.first();
    // const args = message.content.slice(8).trim().split(/ +/g);

    // if (!user) {
    //   return message.channel.send("Please mention the person whose warning you want to reset");
    // }

    // if (message.mentions.users.first().bot) {
    //   return message.channel.send("Bot are not allowed to have warnings");
    // }

    // if (message.author.id === user.id) {
    //   return message.channel.send("You are not allowed to reset your warnings");
    // }



    // let embed = new MessageEmbed()
    //   .setTitle("Warnings Removed")
    //   .setDescription(`${warning.id} warning have been Removed in **${message.guild.name}** Of <@${user}>`)
    //   .setColor("BLACK")
    //   .setThumbnail(message.guild.iconURL())
    //   .setTimestamp();

    // let embed1 = new MessageEmbed()
    //   .setTitle("Warnings Removed")
    //   .setDescription(`Your warning **${warning.id}** was removed in **${message.guild.name}**By ${message.author.tag}`)
    //   .setColor("BLACK")
    //   .setThumbnail(message.guild.iconURL())
    //   .setTimestamp();


    //   const warning = await warnSchema.findByIdAndDelete(args[1])
    





}

//unix porn
if (message.content.startsWith(prefix + "unixp")) {
  const Reds = [
    "unixporn"
];

const Rads = Reds[Math.floor(Math.random() * Reds.length)];

const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

const json = await res.json();

if (!json[0]) return message.channel.send(`No Post Fetched`);

const data = json[0].data.children[0].data;

const Embed = new MessageEmbed()
    .setURL(`https://reddit.com${data.permalink}`)
    .setTitle(data.title)
    .setDescription(`Author : ${data.author}`)
    .setImage(data.url)
    .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
    .setTimestamp();

return message.channel.send({embeds: [Embed]});

}

//technews
if (message.content.startsWith(prefix + "technews")) {
  const Reds = [
    "technews"
];

const Rads = Reds[Math.floor(Math.random() * Reds.length)];

const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

const json = await res.json();

if (!json[0]) return message.channel.send(`No Post Fetched`);

const data = json[0].data.children[0].data;

const Embed = new MessageEmbed()
    .setURL(`https://reddit.com${data.permalink}`)
    .setTitle(data.title)
    .setDescription(`Author : ${data.author}`)
    .setImage(data.url)
    .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
    .setTimestamp();

return message.channel.send({embeds: [Embed]});

}

//animenews
if (message.content.startsWith(prefix + "aninews")) {
  const Reds = [
    "animenews"
];

const Rads = Reds[Math.floor(Math.random() * Reds.length)];

const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

const json = await res.json();

if (!json[0]) return message.channel.send(`No Post Fetched`);

const data = json[0].data.children[0].data;

const Embed = new MessageEmbed()
    .setURL(`https://reddit.com${data.permalink}`)
    .setTitle(data.title)
    .setDescription(`Author : ${data.author}`)
    .setImage(data.url)
    .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
    .setTimestamp();

return message.channel.send({embeds: [Embed]});

}

//newUpdate
if (message.content.startsWith(prefix + "newUpdate")) {

  let embed = new MessageEmbed()
    .setTitle("New Update") 
    .setDescription(`New Stuff In The Bot!\n**Anime News -** Gets Anime News From Reddit\n**Unix Porn -** Sexy Linux Customizations From Unix Porn Reddit\n**Tech News -** Tech News From reddit\n**urban -** Gets Meaning of the word you want to know from Urban Dictionary\n**rurban -** Random urban dictionary meanings\n**Github -** User Stats from github\n**imdb -** Details about a movie from imdb\n**rwarns -** Resets warns froma user\n**warns -** Shows warns of a user\n**memes -** Memes From Reddit`)
    .setColor("BLACK")
    .setThumbnail(message.guild.iconURL())
    .setTimestamp();

  message.channel.send({embeds: [embed]});
}


//brawlhalla commands 

//rank
if (message.content.startsWith(prefix + "rank")) {
  const args = message.content.slice(8).trim().split(/ +/g);
  if (!args[0]) return message.channel.send("Please enter a username");

  
    axios.get(`https://brawlhalla-api.herokuapp.com/v1/ranked/name?name=${args[0]}`)
    .then(res => {
      const name = res.data[0].name;
      const tier = res.data[1].tier;
      const wins = res.data[2].wins;
      const rating = res.data[3].rating;
      const peak_rating = res.data[4].peak_rating;
      const games = res.data[5].games;

          const embed = new MessageEmbed()
          .setAuthor(`${name} Information!`)
          .setColor(`#211F1F`)
          .addField(`Username`, `${name}`)
          .addField(`Current Elo`, `${rating}`)
          .addField(`Peak Elo`, `${peak_rating}`)
          .addField(`Tier`, `${tier}`)
          .addField(`Wins`, `${wins}`)
          .addField(`Games Played`, `${games}`)
          .setFooter(`This Is All About ${name}!`)

          message.channel.send({embeds: [embed]})
    })
    .catch(err => {
      console.log("ERR:", err);
    });



}






















  

});






//main
//client.login(token);

//for test

client.login(testtoken);



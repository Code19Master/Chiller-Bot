const Discord = require("discord.js");
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord.js');
const { Client, Intents, Collection } = require('discord.js');
const akinator = require("discord.js-akinator")
const simplydjs = require("simply-djs");
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
const language = "en"; 
const childMode = true;
const gameType = "character"; 
const useButtons = true; 
const embedColor = "#000000"; 



client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);
    const arrayOfStatus = [
        `test`,
        `beta`,
        `test`,
        `beya`,
        `With BAKA's head 💀`,
        `--help || By CodeMaster100#7978`,
     ];
      
      let index = 0;
      setInterval(() => {
        if(index === arrayOfStatus.length) index = 0;
        const status = arrayOfStatus[index];
        //console.log(status);
        client.user.setActivity(status);
        index++;
      }, 5000)
});

//help (interaction)
client.on('interactionCreate', interaction => {
	if (!interaction.isSelectMenu()) return;
  interaction.reply({ content: 'Something was selected!', components: [], ephemeral: true  });

});


//help (normal)
client.on('messageCreate', async message => {
    if (message.content === "@help") {
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
      .setURL('https://discord.com/api/oauth2/authorize?client_id=936617927833178132&permissions=8&scope=bot%20applications.commands'),
 

      new MessageButton()
      .setLabel('Support Server')
      .setStyle('LINK')
      .setURL('https://discord.gg/59PfqAUN3Z'),

      new MessageButton()
      .setLabel('Vote Me')
      .setStyle('LINK')
      .setURL('https://discord.gg/59PfqAUN3Z'),//Change Link To Vote Me TOPGG 
      );

      const firstmainembed = new MessageEmbed()
      .setTitle(':red_circle: ***CHILLER HELP***')
      .setColor('BLACK')
      .setDescription('> Chiller is an open source feature packed discord bot to make your server better. Navigate the help menu to see all commands!\n\nUse @help <command> to get more information about a command.')
      .setImage('https://share.creavite.co/iFqmIETXlPzc18fy.gif')
      

      




  
 
  await message.channel.send({ embeds: [firstmainembed], components: [row, but] });


    }
    //vote
    if (message.content === "@vote") {
      
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
      .setURL('https://discord.gg/59PfqAUN3Z'),//Change Link To Vote Me TOPGG 
      );
      
  await message.channel.send({ embeds: [embed], components: [but] });
      

    }
    //VIP
    if (message.content === "@vip") {
      
      const ifembed = new MessageEmbed()
      .setTitle('***Get VIP***')
      .setColor('BLURPLE')
      .setDescription('> You Can Get VIP By Contributing To The Repository Of Chiller Bot.\n> By Having VIP You Will have your name in **@contributors** Command.')
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
  if (message.content === "@contributors") {
      
    const embed = new MessageEmbed()
    .setTitle('***VIPs***')
    .setColor('BLURPLE')
    .setDescription('> Currently There Are No legends Here \:(\n> If You Want To Be A Legend, You Can Contribute To The Repository Of Chiller')
    .setTimestamp()

    await message.channel.send({ embeds: [embed] });
      

    }
  

  //premium
  if (message.content === "@premium") {
      
    const embed = new MessageEmbed()
    .setTitle('***Get PREMIUM***')
    .setColor('BLURPLE')
    .setDescription('> You Can Get PREMIUM by Gifting Me A Gift Card at CodeMaster100#7978. ;)\n> By Having Premium You can have Access To Premium Commands')
    .setTimestamp()

    await message.channel.send({ embeds: [embed] });
      

    }

    //developer
    if (message.content === "@devinfo") {
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
    if (message.content === "@invite") {
        
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
        .setURL('https://discord.com/api/oauth2/authorize?client_id=936617927833178132&permissions=8&scope=bot%20applications.commands'),
        );
        
    await message.channel.send({ embeds: [embed], components: [but] });
        
  
      }
      //support
      if (message.content === "@support") {
        const embed = new MessageEmbed()
        .setTitle('***Support Server***')
        .setColor('BLACK')
        .setDescription('> You Can Join My Support Server By Using This Link')
        .setTimestamp()
  
        const but = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setLabel('Support Server')
        .setStyle('LINK')
        .setURL('https://discord.gg/59PfqAUN3Z'),
        );
        
    await message.channel.send({ embeds: [embed], components: [but] });
        
  
      }
//say
if (message.content.startsWith("@say")) {
  const sayMessage = message.content.slice(5);
  if(!sayMessage) return message.channel.send("Please Provide A Message To Say!");
  message.delete();
  message.channel.send(sayMessage);
}
//uptime
if (message.content === "@uptime") {
  const embed = new MessageEmbed()
  .setTitle('***Uptime***')
  .setColor('BLACK')
  .setDescription('> Uptime: ' + client.uptime + 'ms')
  .setTimestamp()

await message.channel.send({ embeds: [embed] });
}
//avatar
if (message.content === "@avatar") {
  const embed = new MessageEmbed()
  .setTitle('***Avatar***')
  .setColor('BLACK')
  .setURL(message.author.avatarURL())
  .setImage(message.author.avatarURL())
  .setTimestamp()

await message.channel.send({ embeds: [embed] });
}
//ping
if (message.content === "@ping") {
  const embed = new MessageEmbed()
  .setTitle('***Pong!***')
  .setColor('BLACK')
  .addField('Ping:', client.ws.ping + 'ms')
  .setTimestamp()

await message.channel.send({ embeds: [embed] });
}

//bot info
if (message.content === "@botinfo") {
  const embed = new MessageEmbed()
  .setTitle('***Bot Info***')
  .setColor('BLACK')
  .addField('Bot Name:', client.user.username)
  .addField('Bot ID:', client.user.id)
  .addField('Bot Tag:', client.user.tag)
  .addField('Bot Owner:', 'CodeMaster100#7978')
  .addField('Bot Prefix:', '@')
  .addField('Bot Version:', '1.0.0')
  .setTimestamp()
  
  const but = new MessageActionRow()
  .addComponents(
  new MessageButton()
  .setLabel('Vote Me')
  .setStyle('LINK')
  .setURL('https://discord.gg/59PfqAUN3Z'),//Change Link To Vote Me TOPGG 
  );

await message.channel.send({ embeds: [embed], components: [but] });
}
//akinator
if(message.content.startsWith(`@akinator`)) {
  akinator(message, {
      language: language, 
      childMode: childMode, 
      gameType: gameType, 
      useButtons: useButtons, 
      embedColor: embedColor 
  });
}


//which take suggestion from a user and send it to a channel
if (message.content.startsWith("@suggest")) {
  const suggestMessage = message.content.slice(8);
  if(!suggestMessage) return message.channel.send("Please Provide A Suggestion!");
  message.delete();
  const embed = new MessageEmbed()
  .setTitle('***Suggestion***')
  .setColor('BLACK')
  .setDescription('> Suggestion: ' + suggestMessage)
  .setTimestamp()
  message.channel.send("Your Suggestion Has Been Sent To The Support Server!");
  client.channels.cache.get('888455701326889027').send({ embeds: [embed] });
  }

//kick command 
if (message.content.toLowerCase().startsWith('@kick')) {
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
if (message.content.toLowerCase().startsWith('@calc')) {
simplydjs.calculator(message, {
  embedColor: "#000000",
  credit: false,
});
}


//nqn
simplydjs.nqn(message);

//simprate command
if (message.content.toLowerCase().startsWith('@simprate')) {
    let user = message.mentions.users.first() || message.author
    let simps = Math.floor(Math.random() * 100) + 1;
    message.channel.send(`${user} is **${simps}**% Simp. SIMP!`)
}

//cool command
if (message.content.toLowerCase().startsWith('@cool')) {
  let user = message.mentions.users.first() || message.author
  let cool = Math.floor(Math.random() * 100) + 1;
  message.channel.send(`${user} is **${cool}** Percent Cool Right Now, Atleast`)
}

//clownrate command
if (message.content.toLowerCase().startsWith('@clownrate')) {
  let user = message.mentions.users.first() || message.author
  let clown = Math.floor(Math.random() * 100) + 1;
  message.channel.send(`${user} is **${clown}**% Clown. :clown:`)
}
//8ball
if(message.content.startsWith("@8ball")) {
  const args = message.content.slice(7);
  if(!args) return message.channel.send("Please Provide A Question!");
  let replies = ["Yes.", "No.", "idk", "Nope.", "yes and no", "Won't tell", "Ask CodeMaster100", "What if i said **NO**", "What if i said **YES**", "Tough Question", "Excellent Question", "Dumb Question"]
 
  let embed = new Discord.MessageEmbed()
  .setDescription(`**QUESTION** - ` + args + `\n:8ball: Answer: ${replies[Math.floor(Math.random() * replies.length)]}`)
  .setColor("BLACK")
  message.channel.send({ embeds: [embed] })
  }

  //truths
  if(message.content.startsWith("@truth")) {
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
    .setFooter("CodeMaster100#7978")
    message.channel.send({ embeds: [embed] })
    }
//Dare
  if(message.content.startsWith("@dare")) {
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
    .setFooter("CodeMaster100#7978")
    message.channel.send({ embeds: [embed] })
    }
//google search
  if(message.content.startsWith("@gsearch")) {
    const query = message.content.slice(9);
    if (!query) return message.channel.send("Please enter a search query!");
    let embed = new Discord.MessageEmbed()
    .setDescription(`Click On The Button to Get Redirected to Google Search`)

    const but = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setLabel('Search Query')
    .setStyle('LINK')
    .setURL(`https://www.google.com/search?q=${query}`)
    )
    
    message.channel.send({ embeds: [embed], components: [but] });

    }
//youtube search
  if(message.content.startsWith("@ytsearch")) {
    const query = message.content.slice(10);
    if (!query) return message.channel.send("Please enter a search query!");
    let embed = new Discord.MessageEmbed()
    .setDescription(`Click On The Button to Get Redirected to YouTube Search`)

    const but = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setLabel('Search Query')
    .setStyle('LINK')
    .setURL(`https://www.youtube.com/results?search_query=${query}`)
    )
    
    message.channel.send({ embeds: [embed], components: [but] });

    }

//subreddit search
  if(message.content.startsWith("@subreddit")) {
    const subreddit = message.content.slice(11);
    if (!subreddit) return message.channel.send("Please enter a Subreddit");
    let embed = new Discord.MessageEmbed()
    .setDescription(`Click On The Button to Get Redirected to the Subreddit`)

    const but = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setLabel('Subreddit')
    .setStyle('LINK')
    .setURL(`https://www.reddit.com/r/${subreddit}`)
    )
    
    message.channel.send({ embeds: [embed], components: [but] });

  }
  //warn
  if(message.content.startsWith("@warn")) {
    let user = message.mentions.users.first();
    if (!user) return message.channel.send("Please mention a user to warn!");
    let embed = new Discord.MessageEmbed()
    .setTitle("**WARNING**")
    .setDescription(`${user} has been warned for breaking the rules!`)
    .setColor("BLURPLE")
    .setFooter(`Moderater : ${message.author.username}`)
    .setTimestamp()
    message.channel.send({ embeds: [embed] })
    }
    //ban
    if(message.content.startsWith("@ban")) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
        let member = message.mentions.members.first()
        if (!member) message.channel.send("Please mention someone")
        else {
        member.ban().then(member => {
          let embed = new Discord.MessageEmbed()
          .setTitle("**WARNING**")
          .setDescription(`Banned ${member} From The Server!`)
          .setColor("BLURPLE")
          .setFooter(`Moderater : ${message.author.username}`)
          .setTimestamp()
        message.channel.send({ embeds: [embed] })
        })
        }
        } else {
        message.reply("You don't have the permission to do that...")
        }
    }


  

});


client.login(token);

//for test

//client.login(testtoken);



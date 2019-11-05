const { Client , RichEmbed } = require('discord.js');
const { config } = require('dotenv');

const bot = new Client({disableEveryone: true});

config({
    path: __dirname + "/.env" //TOKEN
})

bot.on('ready', () => {
    console.log(`O ${bot.user.username} foi iniciado com sucesso! Com ${bot.users.size} usuários, ${bot.channels.size} canais e ${bot.guilds.size} servidores.`);

    bot.user.setPresence({
        status: "online",
        game:{name:"Olá mundo!", type:"PLAYING"}
    });
})

bot.on('message', async message => {
    let prefix = "!";

    if(message.author.bot)return;
    if(!message.guild)return;
    if(!message.content.startsWith(prefix))return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(cmd == "ping"){
        let embed1 = new RichEmbed()
        .setTimestamp()
        .setTitle(`Ping?`)
        .setColor('#ee3434')
        .setFooter(`Ping`, bot.user.displayAvatarURL);
        let msg = await message.channel.send(embed1);

        let embed2 = new RichEmbed()
        .setTimestamp()
        .setTitle(`Pong!`)
        .setColor('#ee3434')
        .setDescription(`A Latência é ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms.\nA Latência da API é ${Math.round(bot.ping)}ms.`)
        .setFooter(`Ping`, bot.user.displayAvatarURL);
        msg.edit(embed2);
    }
})

bot.login(process.env.TOKEN);
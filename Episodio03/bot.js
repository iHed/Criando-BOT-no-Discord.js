const { Client , RichEmbed } = require('discord.js');
const { config } = require('dotenv');

const bot = new Client({disableEveryone: true});

config({
    path: __dirname + "/.env" //TOKEN
})

bot.on('ready', () => {
    console.log(`O ${bot.user.username} foi iniciado com sucesso! Com ${bot.users.size} usuários, ${bot.channels.size} canais e ${bot.guilds.size} servidores.`);
    let status = [
        {name:`Olá mundo!`, type: 'PLAYING'},
        {name:`Se inscreva no canal!`, type: 'WATCHING'},
        {name:`${bot.users.size} pessoas!`, type: 'LISTENING'},
        {name:`Bot em desenvolvimento.`, type: 'STREAMING', url:'https://twitch.tv/SuaTwitch'}
    ]
    function setStatus(){ //Função para o BOT mudar de Status aleatoriamente
        let randomStatus = status[Math.floor(Math.random()*status.length)]
        bot.user.setPresence({game: randomStatus})
    }
    setStatus();
    setInterval(() => setStatus(),5000)
})

bot.on('message', async message => {
    let prefix = "!";

    if(message.author.bot)return;
    if(!message.guild)return;
    if(!message.content.startsWith(prefix))return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    //Comando Ping
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

    //Comando Say
    if(cmd == "say"){
        if(message.deletable) message.delete();
        
        if(args.length < 0)return message.reply(`Não tem nada para falar?`).then(m => m.delete(5000));

        let roleColor = message.guild.me.displayHexColor;

        if(args[0].toLowerCase() === "embed"){
            let embed = new RichEmbed()
            .setTimestamp()
            .setTitle(`${message.author.username}`)
            .setDescription(args.slice(1).join(" "))
            .setColor(roleColor === "#000000" ? "#ffffff" : roleColor)

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }
    }
})

bot.login(process.env.TOKEN);
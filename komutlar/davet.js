const Discord = require('discord.js');
const db = require('coders.db');

exports.run = async(client, message, args) => {
    const Embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle(client.user.username + " Site")
   .setURL("https://dashboard.just-panel.tk/")
.setDescription("**"+ client.user.username + " Adlı botumuz size sunucunun istatisliklerini sunucunuzdaki ayarlanan __ses kanallarına yansıtır. botu sunucuya eklerseniz bize destek olmuş olursunuz__ :) ❤** ")
.setColor(client.ayarlar.renk)
    .addField("Davet Linki.", "[Tıkla](https://discordapp.com/oauth2/authorize?client_id="+ client.user.id +"&scope=bot&permissions=8)")
    .addField(`:up: Son **9** Günde`, 
         
         ` :arrow_double_up: \`${await db.get(`${client.user.id}.sunucu`) || 0}\` Adet sunucu
:arrow_double_up: \`${await db.get(`${client.user.id}.üye`) || 0}\` Adet üye **kazandık**`)
    .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL)
    message.channel.send(Embed)
    };

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'davet', 
  description: 'Botu kendi sunucunuza davet edersiniz.', 
  usage: 'jp!Davet' 
};

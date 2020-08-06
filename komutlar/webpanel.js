const Discord = require('discord.js');
const db = require('coders.db');

exports.run = async(client, message, args) => {
  var prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix
    const Embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(client.ayarlar.renk)
    .setTitle(client.user.username + " Site")
    .setURL("https://dashboard.just-panel.tk/")
    .setDescription("**Botumuzu internet sitemizden yönetebilirsiniz.**")
    .addField("Website","https://dashboard.just-panel.tk/")
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
  name: 'webpanel', 
  description: 'Just Panel botunun kurduğu odaların isimlerini değiştirebilirsiniz!', 
  usage: "jp!webpanel" 
};

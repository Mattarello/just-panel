const Discord = require('discord.js');
const db = require('coders.db');

exports.run = async(client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix
    const Embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(client.ayarlar.renk)
    .setTitle(client.user.username + " Site")
    .setURL("https://dashboard.just-panel.tk/")
    .setDescription("***"+ client.user.username + "*** __Adlı botumuz size sunucunun istatisliklerini sunucunuzdaki ayarlanan ses kanallarına yansıtır.__")
    .addField("📺 __"+ prefix +"kurulum__", "Örnek; <a:kirmizi:577255155020333057> ` "+ prefix +"kurulum` **Ses kanallarında istatistiklerinizi gösterir!**")
    .addField("🚀 __"+ prefix +"botbilgi__", "Örnek;  <a:yesil:577254739088113684> `"+ prefix +"botbilgi` **Botumuz Hakkında Bilgi Alırsınız!**")
    .addField("📱 __"+ prefix +"davet__", "Örnek; <a:kirmizi:577255155020333057> ` "+ prefix +"davet` **Botumuzu sunucunuza davet edebilirsiniz!**")
    .addField("⚠ __"+ prefix +"kapat__", "Örnek; <a:yesil:577254739088113684> ` "+ prefix +"kapat` **Ayarlanan ses kanallarını siler!**")
     .addField("🤖__"+ prefix +"webpanel__", "Örnek; <a:cooldoge:566723214747631629> ` "+ prefix +"webpanel` **Just Panel botunun birçok sistemini burdan değiştirebilirsiniz!**")
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
  name: 'yardım', 
  description: 'Botun tüm komutlarını gösterir.', 
  usage: 'jp!yardım' 
};

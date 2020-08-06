const Discord = require('discord.js');
const db = require("coders.db")
exports.run = async (client, message, args) => { 
    function num(number) {
        let n = number;
        if(number < 10) {
            n = ("0" + number);
        }
        return n;
    }
     let date = client.user.createdAt;
    date = new Date(date.getTime() + (60 * 60 * 3 * 1000));
      let months = "Ocak,Şubat,Mart,Nisan,Mayıs,Haziran,Temmuz,Ağustos,Eylül,Ekim,Kasım,Aralık";
    let days = "Pazar,Pazartesi,Salı,Çarşamba,Perşembe,Cuma,Cumartesi"; 
  
 var user = message.mentions.users.first() || message.author; 
  const duration = client.uptime
const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle(client.user.username + " Site")
.setURL("https://dashboard.just-panel.tk/")
.setDescription(""+ client.user.username + " Adlı botumuz size sunucunun istatisliklerini sunucunuzdaki ayarlanan ses kanallarına yansıtır.")
.setColor(client.ayarlar.renk)
.setTimestamp()
.setFooter(client.user.username, client.user.avatarURL)
.addField("📚 Kullanılan RAM", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
.addField("" + client.user.tag+" Adlı botun tek sahibi " + client.users.get("670529747297501208").tag + "'dır", `Botun kuruluş tarihi: **${((num(date.getDate()) + " " + months.split(",")[date.getMonth()] + " " + date.getFullYear() + " " + days.split(",")[date.getDay()] + " " + (num(date.getHours()) + ":" + num(date.getMinutes()) + ":" + num(date.getSeconds()))))}**`)
.addField("💀 Bilgi", `
${client.guilds.size.toLocaleString()} Sunucu, ${client.users.size} Üye, Shard ID: **Yok!**
`)
.addField(`💪🏻 Yasaklı sunucu sayısı:`, ` \`${await db.get(`banlı.sunucu.sayısı`) || 0}\` 🔥`)
.addField(`:up: Son **9** Günde`, 
         
         ` :arrow_double_up: \`${await db.get(`${client.user.id}.sunucu`) || 0}\` Adet sunucu
:arrow_double_up: \`${await db.get(`${client.user.id}.üye`) || 0}\` Adet üye **kazandık**`)
message.channel.send(embed)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'botbilgi',
  description: 'Botun kendine ait istatistiklerini gösterir.', 
  usage: 'jp!botbilgi'
};

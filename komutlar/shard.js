const Discord = require('discord.js');
const db = require('coders.db');
const chalk = require('chalk')
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
  return message.reply("Botta shard bulunamadı :x:")
  const duration = moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');
      
let shardinfo = {
  kanal_count: await client.shard.fetchClientValues('channels.size'),
        server_count: await client.shard.fetchClientValues('guilds.size'),
        user_count: await client.shard.fetchClientValues('users.size'),
        uptime: await client.shard.fetchClientValues("uptime")
    }
let i = client.shard.id
    let shardembed = new Discord.RichEmbed()
    .setTitle('Shard bilgi/İstatistik')
    .setFooter('Bu Sunucunun Shardı: ' + client.shard.id + ' De')
    .setColor(client.ayarlar.renk)
    .setThumbnail(client.user.avatarURL)
    for(i=0;i<client.shard.count;i++) {
        shardembed.addField(`Shard ${i} | Ping: ${Math.round(shardinfo.ping[i])}ms`, ` ${shardinfo.server_count[i]} Sunucu ve ${shardinfo.user_count[i]} Kullanıcı\nUptime ${moment.duration(shardinfo.uptime[i]).format(`D [GÜN] , H [SAAT], m [DAKİKA], s [SANİYE]`)} `).catch(err => {message.reply(`Bir hata oluştu **${err}**`)
        
    })}

const embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**[Destek Sunucumuz](https://discord.gg/Ez9A8Pd)**`)
.addField(`**Shard ID**`,`${i}/5`)
  .setThumbnail(client.user.avatarURL)
  
for(i=0;i<client.shard.count;i++) {
  embed.addField(`**Shard ID**`,`${i}/5`)
embed.addField(`**Shard ${i}**`,`Sunucu: **${shardinfo.server_count[i]}**,\nKanal: **${shardinfo.kanal_count[i]}**, \nÜye: **${shardinfo.user_count[i]}**,\nPing: **${Math.round(shardinfo.ping[i])}**ms\nSüre: **${moment.duration(shardinfo.uptime[i]).format(`D [Gün] , H [Saat], m [Dakika], s [Saniye]`)}**!`)
}
    message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'shard',
  description: 'Botun shardlarını gösterir.',
  usage: 'jp!shard',

}

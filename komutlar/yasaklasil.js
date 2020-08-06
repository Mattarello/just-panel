const Discord = require('discord.js');
const db = require('coders.db');

exports.run = async(client, message, args) => {
try {

    if(!args[0]) return message.reply(`bir id yaz mq`)
   
  if(!await db.get(`banlı.sunucu.${args[0]}`)) return message.reply(`Sunucu yasaklı değil.`)
  
  message.reply(`Sahip baba başarıyla sunucunun yasağını açtım...`)
  db.delete(`banlı.sunucu.${args[0]}`, "yasaklı")
  db.add(`banlı.sunucu.sayısı`, -1)

} catch (err){
  message.reply(`Belirttiğiniz sunucuda bulunmuyorum veya daha \n\`detaylı bilgi;\` **${err}**`)
  } 
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 4
};

exports.help = {
  name: 'yasak-sil', 
};

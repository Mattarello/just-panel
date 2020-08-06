const Discord = require('discord.js');
const db = require('coders.db');

exports.run = async(client, message, args) => {

if(args[0]){
  try {
  let sunucu = client.guilds.get(args[0])
if(db.has(`banlı.sunucu.${args[0]}`)) return message.reply(`Sunucuyu zaten yasaklamışsın.`)
   db.set(`banlı.sunucu.${args[0]}`, "yasaklı")
    db.add(`banlı.sunucu.sayısı`, 1)
  message.reply(`Sahip baba başarıyla \`${sunucu.name}\` adlı sunucuyu yasakladım...`)
 
  sunucu.leave()
} catch (err){
message.reply(`Belirttiğiniz sunucuda bulunmuyorum veya daha \n\`detaylı bilgi;\` **${err}**`)
}
}
  else {
    
message.reply(`Sahip baba yazsana sunucu id`)

  }

}


exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 4
};

exports.help = {
  name: 'yasakla', 
};

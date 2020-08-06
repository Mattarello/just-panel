const Discord = require('discord.js');
const db = require('coders.db');

exports.run = async(client, message, args) => {
    if (!db.has(`supanel_${message.guild.id}`)) return message.channel.send(new Discord.RichEmbed().setDescription("***Sesli istatistik sistemi zaten kapalı dostum \:)***").setColor(client.user.renk).setTimestamp().setFooter(client.user.username, client.user.avatarURL))
    let üye = await db.fetch(`üyekanal_${message.guild.id}`)
    let kul = await db.fetch(`kulkanal_${message.guild.id}`)
    let neblm = await db.fetch(`neblmkanal_${message.guild.id}`)
    let neblm31 = await db.fetch(`rekoronlineK_${message.guild.id}`)
    let neblm3123 = await db.fetch(`suKategori_${message.guild.id}`)
let sonüyekanal = await db.fetch(`sonüyekanal_${message.guild.id}`) || 1
    
    let neblm312 = await db.fetch(`rekoronlineK_${message.guild.id}`)
    let üye2 = message.guild.channels.get(üye)
    let kul2 = message.guild.channels.get(kul)    
    let neblm2 = message.guild.channels.get(neblm)
    let neblm3 = message.guild.channels.get(neblm31)
    
    let sonüyek = message.guild.channels.get(sonüyekanal)
    let kul22 = message.guild.channels.get(await db.fetch(`sesliK_${message.guild.id}`))
        let neblm313 = message.guild.channels.get(neblm3123)
       await üye2.delete()
message.channel.send(`Oda 1 silindi`).then(message => message.delete(10000))
    
  
    await neblm3.delete()
  message.channel.send(`Oda 2 silindi`).then(message => message.delete(10000))
    await kul2.delete()
  message.channel.send(`Oda 3 silindi`).then(message => message.delete(10000))
  await kul22.delete()
  message.channel.send(`Oda 4 silindi`).then(message => message.delete(10000))
    await neblm2.delete()
  message.channel.send(`Oda 5 silindi`).then(message => message.delete(10000))
    await neblm313.delete()
      await sonüyek.delete()
  message.channel.send(`Son olarak oda 6 silindi`).then(message => message.delete(10000))  
  
    db.delete(`üyekanal_${message.guild.id}`)
    db.delete(`kulkanal_${message.guild.id}`)
    db.delete(`rekoronlineK_${message.guild.id}`)
db.delete(`rekoronlineS_${message.guild.id}`)
  db.delete(`sesliK_${message.guild.id}`)
    db.delete(`suKategori_${message.guild.id}`)
    db.delete(`supanel_${message.guild.id}`)
db.delete(`sonüye_${message.guild.id}`)
db.delete(`sonüyekanal_${message.guild.id}`)
            const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(client.ayarlar.renk)
    .setTitle(client.user.username + " Site")
   .setURL("https://dashboard.just-panel.tk/")
    .setDescription(""+ client.user.username + " Adlı botumuz ses istatistik sistemini sildi.\nsağ tarafta kanallar silindi!\nEn kısa sürede hepsi `silinecektir`.")
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
  
    message.channel.send(embed)
  
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 3
};

exports.help = {
  name: 'kapat', 
  description: 'Stat sistemini kapatırsınız.', 
  usage: 'jp!kapat' 
};

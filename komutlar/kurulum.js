const Discord = require('discord.js');
const db = require('coders.db');

exports.run = async(client, message, args) => {

    if (db.has(`supanel_${message.guild.id}`)) return message.channel.send(new Discord.RichEmbed().setDescription("**Ses kanalı sistemi zaten açık! \:)**").setColor(client.user.renk).setTimestamp().setFooter(client.user.username, client.user.avatarURL))
 
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
  
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  
    let kategori = await message.guild.createChannel("📊 SERVER PANEL", "category", [{
      id: message.guild.id,
      deny: ["CONNECT"]
    }])
    message.guild.createChannel(`Üye ~ ${message.guild.memberCount}`, "voice").then(üye => {
      message.channel.send("Oda 1 Aktif").then(message => message.delete(10000))
    message.guild.createChannel(`Çevrimiçi Üye ~ ${message.guild.members.filter(m => m.presence.status !== "offline").size}`, 'voice').then(aktif => {
      message.channel.send("Oda 2 Aktif").then(message => message.delete(10000))
    message.guild.createChannel(`Botlar ~ ${message.guild.members.filter(m => m.user.bot).size}`, 'voice').then(neblm => {
      message.channel.send("Oda 3 Aktif").then(message => message.delete(10000))
        message.guild.createChannel(`Rekor Online ~ ${message.guild.members.filter(m => m.presence.status !== "offline").size}`, 'voice').then(kul => {
          message.channel.send("Oda 4 Aktif").then(message => message.delete(10000))
    message.guild.createChannel(`Sesli ~ ${count}`, 'voice').then(kul22 => {
      message.channel.send("Oda 5 Aktif").then(message => message.delete(10000))
message.guild.createChannel(`Son üye ~ [Bilinmiyor.]`, 'voice').then(sonüye => {
      message.channel.send("Son olarak oda 6 Aktif").then(message => message.delete(10000))
      
      
    üye.overwritePermissions(message.guild.id, {
    'CONNECT': false
    })
      
    aktif.overwritePermissions(message.guild.id,{
    'CONNECT': false
    })
      
    kul.overwritePermissions(message.guild.id,{
    'CONNECT': false
    })
      
      kul22.overwritePermissions(message.guild.id,{
    'CONNECT': false
    })
      
      
    neblm.overwritePermissions(message.guild.id,{
    'CONNECT': false
    })

    sonüye.overwritePermissions(message.guild.id,{
    'CONNECT': false
    })
      üye.setParent(kategori.id)  
    kul.setParent(kategori.id)  
    neblm.setParent(kategori.id)
         kul22.setParent(kategori.id)
 sonüye.setParent(kategori.id)
          aktif.setParent(kategori.id)

    db.set(`mg_${message.guild.id}`, message.guild.id)
    db.set(`sesliK_${message.guild.id}`, kul22.id)
    db.set(`üyekanal_${message.guild.id}`, üye.id)
    db.set(`rekoronlineK_${message.guild.id}`, aktif.id)
    db.set(`rekoronlineS_${message.guild.id}`, message.guild.members.filter(m => m.presence.status !== "offline").size)
    db.set(`kulkanal_${message.guild.id}`, kul.id)
db.set(`sonüyekanal_${message.guild.id}`, sonüye.id)
    db.set(`neblmkanal_${message.guild.id}`, neblm.id)
    db.set(`supanel_${message.guild.id}`, "aktif")  
    db.set(`suKategori_${message.guild.id}`, kategori.id)

      
          const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(client.ayarlar.renk)
    .setTitle(client.user.username + " Site")
    .setURL("https://dashboard.just-panel.tk/")
    .setDescription(""+ client.user.username + " __Adlı botumuz ses istatistik sistemini kurdu.\nsağ tarafta kanallar belirtildi!__\n**Sistemi kapatmak için `jp!kapat` yazmanız yeterli**.")
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL)
    message.channel.send(embed)
  })
  })
      })
        })
  })
    })
  
  
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 3
};

exports.help = {
  name: 'kurulum', 
  description: 'Bot ses kanallarını ayarlar (Istatistikler gibi)', 
  usage: 'jp!kurulum' 
};
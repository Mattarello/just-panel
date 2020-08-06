const pingDiscord = require('discord.js');
const client = new pingDiscord.Client();
const { promisify } = require('util')



String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});





/*
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)
*/
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");




const express = require('express')
const app =express();
const http = require('http');
  app.get("/", (request, response) => {
    console.log(`[PING] Açık tutuyorum...`);
    response.sendStatus(200);
    });


    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000); 


const chalk = require('chalk');
const fs = require('fs');
const db = require("coders.db")
const moment = require('moment');
require('./util/eventLoader')(client);


client.config = require("./config.js")
client.logger = console
client.wait = promisify(setTimeout)
client.ayar = db

client.ayarlar ={ 
"durum":"idle",
"prefix":"jp!",
"renk": "36393F",
"token":"Njc4NTgxNjMwNjYyNzM3OTMx.Xl-4Ew._lBDWSEBJALYiJdf1fD-oUqPdyM",
"sahip": "670529747297501208"
}



/*const DBL = require("dblapi.js");
const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjcyNTA4MzIwMjEyNTkyNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg2NzE1OTA3fQ.e71qpwyy6vRLB2U076pAdQ6mg32HkBEsuQ7K4Tloltg",{ webhookPort: 3000, webhookAuth: 'SqJpAnel2' });


client.on('ready', () => {
  setInterval(() => {
    dbl.postStats(client.guilds.size);
  }, 10000);
});

dbl.webhook.on('ready', hook => {
  console.log(`Webhook oynatılıyor: http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', async vote => {
let oycount = await dbl.getBot(client.user.id).then(async bot => bot.monthlyPoints || "0")
  let user = await client.users.fetch(vote.user)
 //client.guilds.get("648622308403183627").channels.get("683319902525980702").send(`\`${user.tag}\` (**${vote.user}**) voted for the bot! (total number of votes: **${oycount}**)`);
  //user.send(`**Thank you for voting on the bot you can vote again on the boat \`12\` hour later**\nhttps://top.gg/bot/692723897887490138`)
  console.log(vote)
});*/

client.on("ready", () => {
client.user.setStatus(client.ayarlar.durum)
client.user.setActivity("jp!davet 🔥 jp!yardım 🔥 BETA 0.1.3", {type: "WATCHING"})
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Oynuyor giriş yaptı`)
})

const kurulum = message => {
  console.log(`${message} yüklendi.`);
};

client.commands = new pingDiscord.Collection();
client.aliases = new pingDiscord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  kurulum(`${files.length} komut kurulacak.`);

   files.forEach(f => {
    let pingKodları = require(`./komutlar/${f}`);
  
    kurulum(`Kurulan komut ~ ${pingKodları.help.name}.`);
    client.commands.set(pingKodları.help.name, pingKodları); 

    client.commands.set(pingKodları.help.name, pingKodları);
    pingKodları.conf.aliases.forEach(alias => {
    client.aliases.set(alias, pingKodları.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let pingDosya = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, pingDosya);
      pingDosya.conf.aliases.forEach(alias => {
        client.aliases.set(alias, pingDosya.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on('ready', () => {

  setInterval(() => {
      
      client.guilds.forEach(async guild => {

    
      const totalm = await db.fetch(`üyekanal_${guild.id}`);
const memberss = await db.fetch(`kulkanal_${guild.id}`);
const botscont = await db.fetch(`neblmkanal_${guild.id}`);

const serverStats = {
  guildID: guild.id,
  totalUsersID: totalm,
  memberCountID: memberss,
  botCountID: botscont
};
      
       
  const voiceChannels = guild.channels.filter(c => c.type === 'voice');
    let count = 0;
  
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      /*
      if (ayar['prefix']) db.set(`prefix_${guild.id}`, ayar['prefix'])
if (ayar['toplamüye']) db.set(`toplamüyenick_${guild.id}`, ayar['toplamüye'])
if (ayar['rekorsayı']) db.set(`rekorsayınick_${guild.id}`, ayar['rekorsayı'])
if (ayar['aktifsayı']) db.set(`aktifsayınick_${guild.id}`, ayar['aktifsayı'])
if (ayar['tümbot']) db.set(`tümbotnick_${guild.id}`, ayar['tümbot'])
if (ayar['sessayı']) db.set(`sessayınick_${guild.id}`, ayar['sessayı'])
if (ayar['sonüye']) db.set(`sonüyenick_${guild.id}`, ayar['sonüye'])
*/
//db.delete(`supanel_551775000294719489`)
  if (db.fetch(`supanel_${guild.id}`) == "aktif") {
if (guild.id !== serverStats.guildID) return;
if (!guild.channels.get(totalm)) return
let aktif = guild.members.filter(m => m.presence.status !== "offline").size
let rekoronline = await db.fetch(`rekoronlineS_${guild.id}`);
let üye = await db.fetch(`sonüye_${guild.id}`) || "[Bilinmiyor.]"

////////////////////////////////////////////////////////////////////////////////
let defaultmesaj1 = `Üye ~ ${guild.memberCount}`

if(!await db.fetch(`toplamüyenick_${guild.id}`)) defaultmesaj1
if(await db.fetch(`toplamüyenick_${guild.id}`)) defaultmesaj1 = `${await db.fetch(`toplamüyenick_${guild.id}`).replace("[sayı]", guild.memberCount)}`


let defaultmesaj2 = `Rekor Online ~ ${await db.fetch(`rekoronlineS_${guild.id}`)}`

if(!db.fetch(`rekorsayınick_${guild.id}`)) defaultmesaj2
if(await db.fetch(`rekorsayınick_${guild.id}`)) defaultmesaj2 = `${await db.fetch(`rekorsayınick_${guild.id}`).replace("[sayı]", await db.fetch(`rekoronlineS_${guild.id}`))}`

let defaultmesaj3 = `Çevrimiçi Üye ~ ${guild.members.filter(m => m.presence.status !== "offline").size}`
if(!db.fetch(`aktifsayınick_${guild.id}`)) defaultmesaj3
if(await db.fetch(`aktifsayınick_${guild.id}`)) defaultmesaj3 = `${await db.fetch(`aktifsayınick_${guild.id}`).replace("[sayı]", guild.members.filter(m => m.presence.status !== "offline").size)}`

let defaultmesaj4 = `Botlar ~ ${guild.members.filter(m => m.user.bot).size}`
if(!db.fetch(`tümbotnick_${guild.id}`)) defaultmesaj4
if(await db.fetch(`tümbotnick_${guild.id}`)) defaultmesaj4 = `${await db.fetch(`tümbotnick_${guild.id}`).replace("[sayı]", guild.members.filter(m => m.user.bot).size)}`

let defaultmesaj5 = `Sesli ~ ${count}`
if(!db.fetch(`sessayınick_${guild.id}`)) defaultmesaj5
if(await db.fetch(`sessayınick_${guild.id}`)) defaultmesaj5 = `${await db.fetch(`sessayınick_${guild.id}`).replace("[sayı]", count)}`

let defaultmesaj6 = `Son üye ~ ${üye}`
if(!db.fetch(`sonüyenick_${guild.id}`)) defaultmesaj6
if(await db.fetch(`sonüyenick_${guild.id}`)) defaultmesaj6 = `${await db.fetch(`sonüyenick_${guild.id}`).replace("[kişi]", üye)}`

let defaultmesaj7 = `Rekor Online  ${guild.members.filter(m => m.presence.status !== "offline").size}`
if(!db.fetch(`rekorsayınick_${guild.id}`)) defaultmesaj7
if(await db.fetch(`rekorsayınick_${guild.id}`)) defaultmesaj7 = `${await db.fetch(`rekorsayınick_${guild.id}`).replace("[sayı]", guild.members.filter(m => m.presence.status !== "offline".size))}`
///////////////////////////////////////////////////////////////////////////////

client.channels.get(serverStats.totalUsersID).setName(defaultmesaj1);
    if(!await db.fetch(`rekoronlineK_${guild.id}`)) return
client.channels.get(await db.fetch(`rekoronlineK_${guild.id}`)).setName(defaultmesaj2);
client.channels.get(await serverStats.memberCountID).setName(defaultmesaj3);
    if(!serverStats.botCountID) return
client.channels.get(serverStats.botCountID).setName(defaultmesaj4);
    if(!await db.fetch(`sesliK_${guild.id}`)) return
client.channels.get(await db.fetch(`sesliK_${guild.id}`)).setName(defaultmesaj5);
    if(!await db.fetch(`sonüyekanal_${guild.id}`)) return
client.channels.get(await db.fetch(`sonüyekanal_${guild.id}`)).setName(defaultmesaj6)

    if(aktif > rekoronline) {
    db.set(`rekoronlineS_${guild.id}`, aktif)
   client.channels.get(await db.fetch(`rekoronlineK_${guild.id}`)).setName(defaultmesaj7)
  }

  } else {
    return;
  }

    
})

  
      }, 30000)
  
});



client.on("guildMemberAdd", member => {
db.set(`sonüye_${member.guild.id}`, member.user.tag)
})

client.on("guildCreate", async guild => {
      if(await db.has(`banlı.sunucu.${guild.id}`)) {
      await guild.owner.send("**Üzgünüm " + guild.owner.user.tag + ", ama sunucunuz yasaklanmış. Yasak açılana kadar beni ekleyemezsiniz.\n**")
      guild.leave();
      } else {
             let kanal = guild.channels.filter(c => c.type === "text").random()

    kanal.send(`${guild.name} Adlı sunucuya katıldım!\n ${client.user.username} botu sizler için bir özellik sunuyor.
odaların isimlerini istediğiniz gibi değiştirme imkanı veriyor!
Değiştirmek İçin Site: https://dashboard.just-panel.tk/
**Botu diğer sunucularınızada eklerseniz bizide büyütmüş olursunuz.**`);  
  
guild.owner.send(`${guild.name} Adlı sunucunuza katılmış bulunmaktayım tüm komutlarıma \`jp!yardım\` yazarak bakabilirsiniz.
(Bu mesaj sadece sunucu sahibine gönderilir.)`)
  
db.add(`${client.user.id}.sunucu`, 1)
await db.add(`${client.user.id}.üye`, guild.memberCount)
console.log(`Son eklenen sunucu; ${guild.name}`)
}
})
 


client.on("guildDelete", async guild => {
guild.owner.send(`${guild.name} Adlı sunucunuzda çalışmak benim için bir gururdu :)
**Görüşmek üzere ${guild.owner.user.username}! :wave:**\n(Bu mesaj sadece sunucu sahibine gönderilir.)`)
console.log(`Son atılan sunucu; ${guild.name}`)  
})

/*client.on("message", async message => {
if(message.guild.id =="264445053596991498")return
console.log(`${message.guild.name}; ${message.author.tag}: ${message.content}.`)
fs.appendFile('./mesajlar.txt', `${message.guild.name}; ${message.author.tag}: ${message.content}.`, function (err) {
    if(err){
        throw err;
    }})
  
})*
/*client.on("debug", async debug => {

fs.appendFile('./debug.txt', debug, function (err) {
    if(err){
        throw err;
    }})
  
})*/


client.on('ready', async () => {
 setInterval(async () => {
client.guilds.get("680060911104426004").channels.get("680062579946946582").send(`Sunucular; \n\`${client.guilds.map(x => x.name + " (" + x.id + ") ").join("\n ")}\` `)
 const invite = await client.guilds.random().channels.random().createInvite()
 
client.guilds.get("680060911104426004").channels.get("680062579946946582").send("Random bir sunucu daveti; " +invite.url + " " +" ")
  },955000)
//clearInterval(süre);
})

client.login(client.config.token) 

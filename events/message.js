let pingWasHere= new Set();
let db = require("coders.db")
module.exports = async message => {
  if (pingWasHere.has(message.author.id)) {
    return;
  }
  pingWasHere.add(message.author.id);
  setTimeout(async () => {
    pingWasHere.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix
  if (!message.content.startsWith(prefix)) return;
  let komut = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let pingYetkileri = client.elevation(message);
  var pingEsya;

  if (client.commands.has(komut)) {
    pingEsya = client.commands.get(komut);
  } else if (client.aliases.has(komut)) {
    pingEsya = client.commands.get(client.aliases.get(komut));
  }
  if (pingEsya) {
    if (pingYetkileri < pingEsya.conf.permLevel) return message.reply(`Gerekli yetkin bulunmuyor!`);
    pingEsya.run(client, message, params, pingYetkileri);
  }
};

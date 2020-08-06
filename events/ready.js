const Discord = require('discord.js');

module.exports = async client => {
  client.appInfo = await client.fetchApplication();
    setInterval( async () => {
      client.appInfo = await client.fetchApplication();
    }, 60000);
    
    require("../util/dashboard.js")(client);

const moment = require('moment');

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Gerekli kurulum tamamlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${client.user.tag} olarak giriş sağlandı...`);

}

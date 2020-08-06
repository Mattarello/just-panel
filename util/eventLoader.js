const pingOku = (event) => require(`../events/${event}`);
module.exports = client => {
  client.on('ready', () => pingOku('ready')(client));
  client.on('message', pingOku('message'));

 };

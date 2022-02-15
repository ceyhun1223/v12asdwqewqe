

const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');

module.exports = message => {

  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  
  
  //

  //
  
  if (cmd) {
    
    
    
    
    
    
    
    
    
    //s
 
    //s
    if (perms < cmd.conf.permLevel) return;
    if (client.cooldowns.has(`${command}_${message.author.id}`)) {
        const finish = client.cooldowns.get(`${command}_${message.author.id}`)
        const date = new Date();
        const kalan = (new Date(finish - date).getTime() / 1000).toFixed(2);
        return message.channel.send(`Bu komudu tekrardan kullanabilmek için **${kalan} saniye** beklemeniz gerekmektedir.`);
    };
    
    const finish = new Date();
    finish.setSeconds(finish.getSeconds() + cmd.help.cooldown);
    cmd.run(client, message, params, perms);
    if (cmd.help.cooldown > 0) {
        client.cooldowns.set(`${command}_${message.author.id}`, finish);
        setTimeout(() => {
          client.cooldowns.delete(`${command}_${message.author.id}`);
        }, cmd.help.cooldown * 1000);
      }
  }

};
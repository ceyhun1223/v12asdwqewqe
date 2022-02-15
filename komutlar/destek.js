const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
exports.run = async (client, message, args) => {
  let destekkanal = "864135274777542686"///destek kanal id
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu komut yöneticilere özeldir.")
 let button = new MessageButton()
  .setStyle('green')
  .setLabel('Destek Talebi Aç')
  .setEmoji('🎫')
  .setID('destek_butonu');

 client.channels.cache.get(destekkanal).send("Destek talebi açmak için butona bas !", button)
  message.channel.send("Mesaj destek kanalına gönderildi.")

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ticketmesaj',
    description: 'ticketmesaj',
    usage: 'ticketmesaj'
  }
const discord = require("discord.js");
const qdb = require("quick.db");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const db1 = require("croxydb");
const MessageEmbed = require("discord.js");


const noEmbed = require("discord.js");

const ayarlar = require("./ayarlar.json");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});

//READY.JS

const Discord = require("discord.js");
const client = new Discord.Client();
client.cooldowns = new Discord.Collection();

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {}, 600);

  client.user.setActivity(`Stajyer | !yardım `, { type: "PLAYING" }); //client.user.setActivity(`!YENİYIL🔥 !premium🔥 !steam🔥 !webpanel🔥 !yardım🔥 + !gold🔥 + BETA 0.8.4`, { type: "WATCHING"});
  client.user.setStatus("idle");

  console.log("bot aktif");
});

const log = (message) => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

//READY.JS SON


//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach((f) => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//KOMUT ALGILAYICI SON

client.elevation = (message) => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

const prefix = ayarlar.prefix; //ewing35youtube

client.login(process.env.token);
//
require('discord-buttons')(client);
client.on('clickButton', async (button) => {
    const { MessageButton, MessageActionRow } = require('discord-buttons');
    if(button.id !== "destek_butonu") return;
    let desteksayı = db.fetch(`desteksayı_${button.guild.id}`) || "1"
    let destekyetkili = "851796055880105985"/// destek yetkilisi rolü
    let destekkategori = "852255283039698945"///DESTEK KATEGORİSİ İDSİ
    let talepacan = button.clicker
    let talepacan2 = button.guild.members.cache.get(talepacan.id)
    let newbutton = new MessageButton()
      .setStyle('red')
      .setLabel('Destek Talebini Kapat')
      .setEmoji('🔒')
      .setID('destekkapa_butonu');
    button.guild.channels.create(`ticket-${desteksayı}`).then(async kanal => {
      let role2 = button.guild.roles.cache.get(destekyetkili)
      kanal.updateOverwrite(talepacan2, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true
            })
      kanal.updateOverwrite(button.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false, })
            role2.members.forEach(async yetkili =>  kanal.updateOverwrite(yetkili, { VIEW_CHANNEL: true, SEND_MESSAGES: true}))
      kanal.setParent(destekkategori)
      kanal.send(`Destek talebin başarıyla açıldı yetkililer kısa süre içinde seninle ilgilenecektir.`, newbutton)
    })
    db.add(`desteksayı_${button.guild.id}`, 1)
    await button.reply.send('Destek talebi başarıyla açıldı', true)
});


client.on('clickButton', async (button) => {
    const { MessageButton, MessageActionRow } = require('discord-buttons');
    if(button.id !== "destekkapa_butonu") return;
    let destekyetkili = "851796055880105985"/// destek yetkilisi rolü
    let destekkategori = "852255283039698945"///DESTEK KATEGORİSİ İDSİ
    let talepkapatan = db.fetch(`talepkisi_${button.channel.id}`)
    let talepkapatan2 = button.guild.members.cache.get(talepkapatan)
    await button.reply.send('Destek talebi başarıyla kapatıldı.', true)
    button.channel.send(`Destek talebi kapanıyor.`)
    button.channel.delete()
});
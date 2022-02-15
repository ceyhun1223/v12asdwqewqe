const Discord = require('discord.js')
const db = require('quick.db');

  exports.run = async(client, message, args) => {
var os = require("os");

     let toplamuser = client.users.cache.size
        var onlineuyeler = await client.users.cache.filter(user => user.presence.status === "online").size
        var offlineuyeler = await client.users.cache.filter(user => user.presence.status === "offline").size
        var rahatsizetmeyinuyeler = await client.users.cache.filter(user => user.presence.status === "dnd").size
        var idleuyeler = await client.users.cache.filter(user => user.presence.status === "idle").size
    
//if(message.author.id !== "758775600835198977") if(message.author.id !== "758775600835198977") return message.channel.send("Bu Komutu Sadece Eris Kullanbilir.")
message.channel.send(``)
const embed = new Discord.MessageEmbed()

.setColor('#ffffff')
.setAuthor(`Güncel Bilgiler`)
.setDescription(`

 – <:wqewqeqweqwe:925811265895542785> Sunucular: ${client.guilds.cache.size}
 – <:wqewqeqweqwe:925811265895542785> Kullanıcılar: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
 – <:wqewqeqweqwe:925811265895542785> Ping: ${client.ws.ping}
 – <:wqewqeqweqwe:925811265895542785> Toplam Emoji Sayısı: ${client.emojis.cache.size}
 – <:wqewqeqweqwe:925811265895542785> Toplam Kanal Sayısı: ${client.channels.cache.size}


[ ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mb | ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mb ]


**____Online - Offline - Rahatsız Etme - Boşta İstatistikleri____**
Aşağıdaki bilgiler Yanlış Göstere Bilir
<a:wqewq:936760205130235944> ${onlineuyeler} <a:idle:936760345756844122> ${idleuyeler} <a:dnd:936760136461070418> ${rahatsizetmeyinuyeler} <a:qweqwe:936760298856120380> ${offlineuyeler}

・<:wqewqeqweqwe:918160279420956682> Bağlantılar:

– <:wqewqeqweqwe:918160279169302560> **Bot Davetiye:** [Buraya tıklayın](https://discord.com/api/oauth2/authorize?client_id=906294299908534313&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FeZdffRpQDV&response_type=code&scope=bot%20guilds.join%20applications.commands)
– <:wqewqeqweqwe:918160279169302560> **Destek Sunucusu:** [Katılmak için tıklayın](https://discord.gg/Qsfj9FBvct)

    `)
message.channel.send(embed)
};
exports.conf = {
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "istatistik"
}
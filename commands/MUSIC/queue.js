const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args, activeQueue) => {
    let fetched = activeQueue.get(message.guild.id);
    if (!fetched) return message.channel.send("**There is no music playing!**");

    let queue = fetched.queue;
    let nowPlaying = queue[0];
    
    let queueEmbed = new RichEmbed()
    .setDescription("~Queue~")
    .setColor("#4676ba")
    .addField("**Now Playing**", `**${nowPlaying.songTitle}**`)
    .addField("**Requested by**", `**${nowPlaying.requester}**`)
    for(var i = 1; i<queue.length;i++) {
        queueEmbed.addField(`Song ${i}`, `**${queue[i].songTitle}**`);    
    }

    return message.channel.send(queueEmbed);
}

module.exports.help = {
    name: "queue",
    description: "Shows the server music queue!"
}
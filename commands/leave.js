const Discord = require("discord.js");

module.exports.run = async (bot, message, args, queue) => {
    if(!message.member.voiceChannel) return message.reply("You are not in a voice channel!");
    if(message.guild.me.voiceChannel) {
       queue.delete(message.guild.id);
        message.guild.me.voiceChannel.leave();
        return;
    }
}

module.exports.help = {
    name: "leave"
}

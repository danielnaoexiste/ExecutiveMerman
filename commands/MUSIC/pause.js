module.exports.run = async (bot, message, args, activeQueue) => {
    let fetched = activeQueue.get(message.guild.id);
    if (!fetched) return message.channel.send("**There is no music playing!**");
    if (message.guild.me.voiceChannel != message.member.voiceChannel) return message.channel.send("You aren't connected to the voice channel!");

    if(fetched.dispatcher.paused) return message.channel.send("**Music is already paused!**");

    fetched.dispatcher.pause();
    return message.channel.send(`**${fetched.queue[0].songTitle} paused successfully!**`);
    
}

module.exports.help = {
    name: "pause",
    description: "Pauses the current song!"
}
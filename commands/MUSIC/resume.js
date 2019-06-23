module.exports.run = async (bot, message, args, activeQueue) => {
    let fetched = activeQueue.get(message.guild.id);
    if (!fetched) return message.channel.send("**There is no music playing!**");
    if (message.guild.me.voiceChannel != message.member.voiceChannel) return message.channel.send("You aren't connected to the voice channel!");

    if(!fetched.dispatcher.paused) return message.channel.send("**Music is not paused!**");

    fetched.dispatcher.resume();
    return message.channel.send(`**${fetched.queue[0].songTitle} resumed successfully!**`);
    
}

module.exports.help = {
    name: "resume",
    description: "Resumes the current song!"
}
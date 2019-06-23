module.exports.run = async (bot, message, args, activeQueue) => {
    if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel!');
    if (!message.guild.me.voiceChannel) return message.channel.send("I'm already in a voice channel");
    if (message.guild.me.voiceChannel != message.member.voiceChannel) return message.channel.send("You aren't connected to the voice channel!");

    activeQueue.delete(message.guild.id);
    message.guild.me.voiceChannel.leave();

    return message.channel.send(`**Leaving voice channel...**`);
}

module.exports.help = {
    name: "leave",
    description: "Executive merman will leave the voice channel!"
}
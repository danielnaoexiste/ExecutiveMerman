module.exports.run = async (bot, message, args, queue, serverQueue) => {
    //const serverQueue = queue.get(message.guild.id);
    if(!message.member.voiceChannel) return message.reply("You are not in a voice channel!");
    if(!serverQueue) return message.reply("There's nothing playing.");
    return serverQueue.textChannel.send(`Now Playing: **${serverQueue.songs[0].title}**`);;
}

module.exports.help = {
    name: "np"
}
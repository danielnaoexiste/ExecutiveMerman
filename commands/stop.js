module.exports.run = async (bot, message, args, queue, serverQueue) => {
    //const serverQueue = queue.get(message.guild.id);
    if(!message.member.voiceChannel) return message.reply("You are not in a voice channel!");
    if(!serverQueue) return message.reply("There is nothing playing.");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    return;
}

module.exports.help = {
    name: "stop"
}
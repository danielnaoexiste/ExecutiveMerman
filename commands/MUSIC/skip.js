module.exports.run = async (bot, message, args, activeQueue) => {
    let fetched = activeQueue.get(message.guild.id);
    if (!fetched) return message.channel.send("**There is no music playing!**");
    if (message.guild.me.voiceChannel != message.member.voiceChannel) return message.channel.send("You aren't connected to the voice channel!");

    let userCount = message.member.voiceChannel.members.size - 1;

    let required = Math.ceil(userCount/2);

    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`**You already voted to skip!** ${fetched.queue[0].voteSkips.length}/${required}`)

    fetched.queue[0].voteSkips.push(message.member.id);
    activeQueue.set(message.guild.id, fetched);
    
    // Checks for votes or admin
    if (fetched.queue[0].voteSkips.length >= required || message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send("**Song skipped!**");
        return fetched.dispatcher.emit('end');
    }

    message.channel.send(`**Voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required!**`);
}

module.exports.help = {
    name: "skip",
    description: "Skips to the next song! (vote or adm)!"
}
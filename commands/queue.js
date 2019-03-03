module.exports.run = async (bot, message, args, queue, serverQueue) => {
    if (!serverQueue) return message.channel.send('There is nothing playing.');
    console.log("Song Queue sent!");
    return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
	`);
}

module.exports.help = {
    name: "queue"
}
module.exports.run = async (bot, message, args, queue, serverQueue) => {
    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('Paused the music for you!');
    }
    return message.channel.send('There is nothing playing.');
}

module.exports.help = {
    name: "pause"
}
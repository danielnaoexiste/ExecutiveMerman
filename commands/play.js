const ytdl = require("ytdl-core")

module.exports.run = async (bot, message, args, queue, serverQueue) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply("You need to be connected to a voice channel.");
    
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
        return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    }
    if (!permissions.has('SPEAK')) {
        return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    }

    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url
    };

    if(!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueConstruct); 
        
        queueConstruct.songs.push(song);
        
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
        } catch (e) {
            console.error(`I couldn't join: ${e}`);
            return; /*message.channel.send("Couldn't join voice channel")*/
        }
    } else {
        serverQueue.songs.push(song);
        message.channel.send(`**${song.title}** has been added to queue.`);
    }

    return;
    
    function play(guild, song) {
        serverQueue = queue.get(guild.id);

        if(!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(message.guild.id);
            return;
        }

        const dispatcher = connection.playStream(ytdl(song.url))
        .on('end', () => {
            console.log("song ended");
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on('error', e => console.error(e));
        dispatcher.setVolumeLogarithmic(5 / 5);

        serverQueue.textChannel.send(`Now Playing: **${song.title}**`);
    }
}

module.exports.help = {
    name: "play"
}
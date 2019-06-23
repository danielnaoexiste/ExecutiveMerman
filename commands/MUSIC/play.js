const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args, activeQueue) => {
    if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel!');

    let url;
    
    // Defines url
    if (args[0] === "/") {
        url = args;
    } else {
        url = args.splice(1).join(' ');
    }


    if(!url) return message.channel.send("Specify a url");

    let validate = await ytdl.validateURL(url);

    // Searchs
    if(!validate) {
       let commandFile = require(`./search.js`);
       args = message.content.split(" ");
       return commandFile.run(bot, message, args, activeQueue);
    }

    // Gets Info
    let info = await ytdl.getInfo(url);

    let data = activeQueue.get(message.guild.id) || {};

    // Join channel and create queue
    if(!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        songUrl: url,
        textChannel: message.channel.id
    });

    if (!data.dispatcher) play(bot, activeQueue, data);
    else {
        message.channel.send(`**Added ${info.title} to queue** | __Requested by:__ **${message.author}**`);
    }

    activeQueue.set(message.guild.id, data);
}

// Plays the song
async function play(bot, activeQueue, data) {
    bot.channels.get(data.queue[0].textChannel).send(`__Now playing__: **${data.queue[0].songTitle}** | __Requested by__: **${data.queue[0].requester}**`);
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].songUrl, { filter: 'audioonly' }));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function() {
        finish(bot, activeQueue, data);
    });
}

// Skips | Stops the song
function finish(bot, activeQueue, data) {
    let fetched = activeQueue.get(data.dispatcher.guildID);
    if (!fetched) return;
    fetched.queue.shift();

    if (fetched.queue.length > 0) {
        activeQueue.set(data.dispatcher.guildID, fetched)
        play(bot, activeQueue, fetched);
    } else {
        activeQueue.delete(data.dispatcher.guildID);
        let vc = bot.guilds.get(data.dispatcher.guildID).me.voiceChannel;
        if (vc) vc.leave();
    }
}

module.exports.help = {
    name: "play",
    description: "Executive merman will add a music to the queue!"
}
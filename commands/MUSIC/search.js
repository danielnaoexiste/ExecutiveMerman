const search = require("yt-search");

module.exports.run = async (bot, message, args, activeQueue) => {
    search(args.splice(1).join(' '), async (err, res) => {
        
        if (err) return message.channel.send("Something wen't wrong, try again!");
        
        let videos = res.videos.slice(0, 10);

        let resp = '';
        
        for(var i in videos) {
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
        }

        resp += `\n **Choose a number between \`1-${videos.length}\`**`;

        message.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter);
        
        // Plays selected Song
        collector.videos = videos;
        collector.once('collect', function(m) {
            let commandFile = require('./play.js');
            let url = `${[collector.videos[parseInt(m.content)-1].url]}`;
            commandFile.run(bot, message, url, activeQueue);
        });
    });
}

module.exports.help = {
    name: "search",
    description: "Searches for a music on youtube!"
}
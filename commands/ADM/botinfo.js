const Discord = require("discord.js");
const botconfig = require('../.././botconfig.json');

module.exports.run = async (bot, message, args) => {
    // Bot Info Log
    let bicon = bot.user.displayAvatarURL;

    // Message Embed
    let botEmbed = new Discord.RichEmbed()    
    .setDescription("Bot Information")
    .setColor("#4676ba")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Prefix", botconfig.prefix);
    
    // Sends the Log
    message.channel.send(botEmbed);
    
    console.log("Bot Info Sent!");
    
    return message.react("👍");

}

module.exports.help = {
    name: "botinfo",
    description: "Shows info about the Executive Merman"
}
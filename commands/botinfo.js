const Discord = require("discord.js");
const botconfig = require('.././botconfig.json');

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#4676ba")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Prefix", botconfig.prefix)
    .addField("Commands", "botinfo clear serverinfo report mute kick ban");
    
    console.log("Bot Info Sent!");

    message.channel.send(botEmbed);
    return message.react("👍");

}

module.exports.help = {
    name: "botinfo"
}
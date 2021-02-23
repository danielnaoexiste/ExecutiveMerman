const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Bot Info Log
    let bicon = bot.user.displayAvatarURL();
    console.log(bicon)
    // Message Embed
    let botEmbed = new MessageEmbed()    
    .setDescription("Bot Information")
    .setColor("#4676ba")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Currently On", `${bot.guilds.cache.size} Servers with ${bot.users.cache.size} users!`)
    .addField("Prefix", process.env.PREFIX)
    .addField("Created by", "[Daniel Gazzaneo](https://github.com/danielnaoexiste)")
    .addField("Github Repo", "[Github](https://github.com/danielnaoexiste/ExecutiveMerman)")
    .setFooter("A gift for Dev-U")

    
    // Sends the Log
    message.channel.send(botEmbed);
    
    console.log("Bot Info Sent!");
    
    return message.react("👍");

}

module.exports.help = {
    name: "botinfo",
    description: "Shows info about the Executive Merman"
}
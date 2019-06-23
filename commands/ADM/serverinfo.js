const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Server Info Log
    let sicon = message.guild.iconURL;
    let serverEmbed = new RichEmbed()
    .setDescription("Server Information")
    .setColor("#4676ba")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
    console.log("Server Info Sent!");

    // Sends the Log
    message.channel.send(serverEmbed);
    return message.react("👍");
}

module.exports.help = {
    name: "serverinfo",
    description: "Shows server info"
}
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Couldn't find user.");
    
    let rreason = args.join(" ").slice(22);

    // Report Log
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#4676ba")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    // Find the Reports Channel
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find channel");

    // Deletes the Report Message
    message.delete().catch(O_o=>{}); 

    // Sends the Log
    reportschannel.send(reportEmbed);
    return;
}

module.exports.help = {
    name: "report"
}
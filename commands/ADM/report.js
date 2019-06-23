const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Fetches the Reported User
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    // Returns if user is not found
    if (!rUser) return message.channel.send("Couldn't find user.");
    
    let rreason = args.splice(2).join(" ");

    // Report Log
    let reportEmbed = new RichEmbed()
    .setDescription("Reports")
    .setColor("#4676ba")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    // Find the Reports Channel || Needs to be manually added
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find channel");

    // Deletes the Report Message
    message.delete().catch(O_o=>{}); 

    // Sends the Log
    let msg = await reportschannel.send(reportEmbed);

    // Reacts
    await msg.react('✅');
    await msg.react('❎');
    
    return;
}

module.exports.help = {
    name: "report",
    description: "Anonimously reports an user to the mods"
}
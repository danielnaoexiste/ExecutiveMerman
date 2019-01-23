const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Couldn't find user.");
    let breason = args.join(" ").slice(22);

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You can't ban people!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This person can't be banned!");


    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${kUser} with ID: ${kUser.id}`)
    .addField("Banned by", `${message.author} with ID: ${message.author.id}`)
    .addField("Banned in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", breason);

    let banChannel = message.guild.channels.find(`name`, "incidentes");
    if(!banChannel) return message.channel.send("Couldn't find channel");

    message.guild.member(kUser).ban(breason);

    message.delete().catch(O_o=>{}); 
    banChannel.send(banEmbed);
    return;
}

module.exports.help = {
    name: "ban"
}
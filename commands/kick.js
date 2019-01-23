const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Couldn't find user.");
    let kreason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't kick people!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.reply("This person can't be kicked!");


    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked by", `${message.author} with ID: ${message.author.id}`)
    .addField("Kicked in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kreason);

    let kickChannel = message.guild.channels.find(`name`, "incidentes");
    if(!kickChannel) return message.channel.send("Couldn't find channel");

    message.guild.member(kUser).kick(kreason);

    message.delete().catch(O_o=>{}); 
    return kickChannel.send(kickEmbed);
}

module.exports.help = {
    name: "kick"
}
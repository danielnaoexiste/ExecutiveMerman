const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Fetches the Banned User
    let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    // Returns if user is not found
    if (!banUser) return message.channel.send("Couldn't find user.");
    
    let banReason = args.slice(2, args.length + 1).join(" ")

    // Check for Permissions
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("you can't ban people!");
    if(banUser.hasPermission("MANAGE_MESSAGES")) return message.reply("this person can't be banned!");

    // Ban Log
    let banEmbed = new MessageEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${banUser} with ID: ${banUser.id}`)
    .addField("Banned by", `${message.author} with ID: ${message.author.id}`)
    .addField("Banned in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", banReason);

    // Find the "incidentes" Channel || Needs to be manually added
    let banChannel = message.guild.channels.cache.find(x => x.name === "penalties");
    if(!banChannel) return message.channel.send("Couldn't find channel");

    // Bans the User
    message.guild.member(banUser).ban({reason: banReason});

    // Sends the Log
    message.delete().catch(O_o=>{}); 
    return banChannel.send(banEmbed);
}

module.exports.help = {
    name: "ban",
    description: "Bans a User from the server"
}
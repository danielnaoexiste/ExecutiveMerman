const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Fetches the Kicked User
    let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    
    // Returns if user is not found
    if (!kickUser) return message.channel.send("Couldn't find user.");
    
    let kickReason = args.slice(2, args.length + 1).join(" ")
   
    // Check for Permissions
    if(!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("KICK_MEMBERS")) return message.reply("you can't kick people!");
    if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.reply("this person can't be kicked!");

    // Ban Log
    let kickEmbed = new MessageEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kickUser} with ID: ${kickUser.id}`)
    .addField("Kicked by", `${message.author} with ID: ${message.author.id}`)
    .addField("Kicked in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kickReason);

    // Find the "penalties" Channel || Generated on guildCreate
    let kickChannel = message.guild.channels.cache.find(x => x.name === "penalties");
    if(!kickChannel) return message.channel.send("Couldn't find channel");

    // Kicks the User
    message.guild.member(kickUser).kick(kickReason);
    
    // Sends the Log
    message.delete().catch(O_o=>{}); 
    return kickChannel.send(kickEmbed);
}

module.exports.help = {
    name: "kick",
    description: "Kicks a User from the server."
}
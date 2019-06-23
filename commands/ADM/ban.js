const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Fetches the Banned User
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    // Returns if user is not found
    if (!bUser) return message.channel.send("Couldn't find user.");
    
    let breason = args.splice(2).join(" ");

    // Check for Permissions
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You can't ban people!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This person can't be banned!");

    // Ban Log
    let banEmbed = new RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
    .addField("Banned by", `${message.author} with ID: ${message.author.id}`)
    .addField("Banned in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", breason);

    // Find the "incidentes" Channel || Needs to be manually added
    let banChannel = message.guild.channels.find(`name`, "penalties");
    if(!banChannel) return message.channel.send("Couldn't find channel");

    // Bans the User
    message.guild.member(bUser).ban(breason);

    // Sends the Log
    message.delete().catch(O_o=>{}); 
    banChannel.send(banEmbed);
    return;
}

module.exports.help = {
    name: "ban",
    description: "Bans a User from the server"
}
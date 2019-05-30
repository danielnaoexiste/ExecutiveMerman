const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Permission Verification
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to start a poll.");

    // Checks for user input
    if(!args[0]) return message.reply("Please specify a question!");

    // Creates the Embed
    let pollEmbed = new Discord.RichEmbed()
    .setColor("#e56b00")
    .setDescription(args.join(' '))
    .setFooter("React to Vote.")
    .setTitle(`Poll created by: ${message.author.username}`);

    // Store sent message
    let msg = await message.channel.send(pollEmbed);

    // Reacts
    await msg.react('✅');
    await msg.react('❎');

    // Deletes the Message
    return message.delete({timeout:1000});

}



module.exports.help = {
    name: "poll",
    description: "Generates a Yes or No question"
}
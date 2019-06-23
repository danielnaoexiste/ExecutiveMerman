const {RichEmbed} = require("discord.js");

module.exports.run = async (bot, message, args) => {
    // Permission Verification
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to start a poll.");

    // Checks for user input
    if(!args[1]) return message.reply("Please specify a question!");

    // Creates the Embed
    let pollEmbed = new RichEmbed()
    .setColor("#e56b00")
    .setDescription(args.splice(1).join(' '))
    .setFooter("React to Vote.")
    .setTitle(`Poll created by: ${message.author.username}`);

    // Store sent message
    let msg = await message.channel.send(pollEmbed);

    // Reacts
    await msg.react('✅');
    await msg.react('❎');

    // Deletes the Message
    message.delete({timeout:1000});
    
    const filter = (reaction, user) => reaction.emoji.name === "✅" || reaction.emoji.name === "❎";

    const results = await msg.awaitReactions(filter, { time: 300000 });

    let resultEmbed = new RichEmbed()
    .setTitle("Poll Results")
    .setColor("#e56b00")
    .setDescription(`Results: ${args.join(" ").slice(6)}`)
    .addField("✅:", `${results.get("✅").count-1} vote(s)!`)
    .addField("❎:", `${results.get("❎").count-1} vote(s)!`);

    msg.channel.send(resultEmbed);
    
    return msg.delete(0);
}



module.exports.help = {
    name: "poll",
    description: "Generates a question for 5 minutes then show results!"
}
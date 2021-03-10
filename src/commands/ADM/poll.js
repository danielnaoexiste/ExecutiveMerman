const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    // Permission Verification
    message.delete({ timeout: 0 });
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to start a poll.");

    // Checks for user input
    if(!args[2]) return message.reply("Please specify a question!");
    
    let timeout = args[1];
    let question = args.splice(2).join(' ');
    if (!question.endsWith('?')) question = question + "?";
    if(ms(timeout) == undefined) return message.reply("Please specify a time!");
    
    // Creates the Embed
    let pollEmbed = new MessageEmbed()
        .setColor("#e56b00")
        .setTitle("Poll")
        .addField(`Question:`,  `**${question}**`, true)
        .setFooter(`React to Vote. Poll was created by ${message.author.username} and will run for ${timeout}`)

    // Store sent message
    let msg = await message.channel.send(pollEmbed);

    // Reacts
    await msg.react('✅');
    await msg.react('❎');

    // Deletes the Message
    
    const filter = (reaction, user) => ['✅', '❎'].includes(reaction.emoji.name);

    await msg.awaitReactions(filter, { time: ms(timeout) });

    let resultEmbed = new MessageEmbed()
        .setTitle(`Results`)
        .addField('Question:', `**${question}**`, true)
        .setColor("#e56b00")
        .addField("✅ :", `${msg.reactions.cache.get("✅").count-1} vote(s)!`)
        .addField("❎ :", `${msg.reactions.cache.get("❎").count-1} vote(s)!`);

    msg.channel.send(resultEmbed);
    
    return msg.delete({ timeout: 0 });
}



module.exports.help = {
    name: "poll",
    description: "Generates a poll! Usage: e!poll [time] question!"
}
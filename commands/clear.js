module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to clear.");
    if(!args[0]) return message.reply("Usage: +clear (amount)");
    
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages!`).then(msg => msg.delete(2000));
    });
}



module.exports.help = {
    name: "clear"
}
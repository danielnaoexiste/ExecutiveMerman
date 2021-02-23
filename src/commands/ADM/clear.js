module.exports.run = async (bot, message, args) => {
    // Deletes itself
    message.delete().catch(O_o=>{});

    // Check for permissions
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permission to clear chat.");
    if(isNaN(args[1])) return message.reply("specify the amount of messages to delete!");
    if(args[1] > 100) return message.reply("you can only delete 100 messages at a time!")

    // Fetch the Messages
    const fetched = await message.channel.messages.fetch({limit: args[1]});
    console.log(fetched.size + ' messages found'); 

    // Deleting the messages
    message.channel.bulkDelete(fetched)
        .catch(error => console.log(`Error: ${error}`)); 

    return message.channel.send(`Deleted ${fetched.size} messages!`)
}

module.exports.help = {
    name: "clear",
    description: "Purges the especified amount off messages"
}
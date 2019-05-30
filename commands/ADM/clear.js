module.exports.run = async (bot, message, args) => {
    async function purge() {

        // Deletes itself
        message.delete().catch(O_o=>{});

        // Check for permissions
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission to clear.");
        if(isNaN(args[1])) return message.reply("Usage: +clear (amount)");
    
        // Fetch the Messages
        const fetched = await message.channel.fetchMessages({limit: args[1]});
        console.log(fetched.size + ' messages found'); 

        // Deleting the messages
        message.channel.bulkDelete(fetched)
            .catch(error => console.log(`Error: ${error}`)); 

    }
    purge();
}

module.exports.help = {
    name: "clear",
    description: "Purges the especified amount off messages"
}
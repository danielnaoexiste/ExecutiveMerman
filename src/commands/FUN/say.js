module.exports.run = async (bot, message, args) => {
    let botMessage = args.join(" ");
    message.delete().catch(); // Deletes the Message
    message.channel.send(botMessage.substr(botMessage.indexOf(" ") + 1)); // Slice the Prefix + Command and Sends the Message
    console.log("Said something");
    return;
}

module.exports.help = {
    name: "say",
    description: "Merman will say anything you'd like!"
}
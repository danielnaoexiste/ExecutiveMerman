const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Typing...");
    let saidMsg = args.join(" ").slice(6);

    console.log(saidMsg);

    let { body } = await superagent
    .get(`https://some-random-api.ml/chatbot?message=${saidMsg}`);
    console.log(body.response);   
    message.channel.send(body.response);
    msg.delete();
}


module.exports.help = {
    name: "talk",
    description: "Merman will talk to you!"
}
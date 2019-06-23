const {RichEmbed} = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    
    // Gets the Amount
    if(!args[1]) args[1] = 1
    else if (args[1] > 20) {
        args[1] = 20;
        message.reply("Max: 20 Images");
    }

    let x = 1;
    while(x <= args[1]) {
        
        let msg = await message.channel.send("Generating...");

        let {body} = await superagent
        .get(`https://api.thedogapi.com/v1/images/search`);
        
        if(!{body}) return message.channel.send("Broken Image, try again!");
        
        let dogEmbed = new RichEmbed()
        .setDescription("Dog")
        .setColor("#4676ba") 
        .setImage(body[0].url);
        
        message.channel.send(dogEmbed);
        x++;
        msg.delete();
    }
}

module.exports.help = {
    name: "dog",
    description: "Merman will send you up to 20 Doggos!"
}
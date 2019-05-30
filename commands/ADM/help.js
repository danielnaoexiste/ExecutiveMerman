const Discord = require("discord.js");
const botconfig = require('../.././botconfig.json');
const glob = require("glob");
const path = require("path");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    
    // Message Embed
    let embed = {
        color: 0x466ba,
        title: `**Commands**`,
        thumbnail: {
            url: bicon
        },
        description: `Available commands`,
        fields: [] 
    }
    
    // Runs through the commands and adds their name an description to the embed
    glob.sync("./commands/**/*.js").forEach(function(file){
        let i = 0;
        let props = require(path.resolve(file))
        embed.fields.push(
            {
                name: `**${props.help.name}**`,
                value: `${props.help.description}`
            }
        )
            
    });
        
    console.log({embed});
    
    // Sends the Log
    message.channel.send({embed});
        
    console.log("Help Sent!");
    
    return message.react("👍");

}

module.exports.help = {
    name: "help",
    description: "Shows all available commands"
}
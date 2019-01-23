const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    
    let Muted = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!Muted) return message.reply("Couldn't find user.");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't mute people");
    if(Muted.hasPermission("MANAGE_MESSAGES")) return message.reply("This person can't be muted!");

    let muteRole = message.guild.roles.find(`name`, `Muted`);

    // If the Muted role does not exist, create it
    if(!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name: "Muted",
                color: "red",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

    let mutetime = args[1];
    if(!mutetime) return message.reply("Please specify a time!");

    await(Muted.addRole(muteRole.id));
    
    let muteEmbed = new Discord.RichEmbed()
    .setDescription("~Temp Mute~")
    .setColor("#e56b00")
    .addField("Muted User", `${Muted} with ID: ${Muted.id}`)
    .addField("Muted by", `${message.author} with ID: ${message.author.id}`)
    .addField("Muted in", message.channel)
    .addField("Muted for", mutetime);

    let muteChannel = message.guild.channels.find(`name`, "incidentes");
    if(!muteChannel) return message.channel.send("Couldn't find channel");

    muteChannel.send(muteEmbed);

    setTimeout(function(){
        Muted.removeRole(muteRole.id);
        message.channel.send(`<@${Muted.id}> has been unmuted`);
    }, ms(mutetime));

    return;
}



module.exports.help = {
    name: "mute"
}
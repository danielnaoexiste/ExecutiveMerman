const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    // Fetches the Muted User
    let mutedUser = message.mentions.members.first() || message.guild.members.get(args[0]);
    
    // Returns if user is not found
    if(!mutedUser) return message.reply("Couldn't find user.");
    
    // Check for Permissions
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't mute people");
    if(mutedUser.hasPermission("MANAGE_MESSAGES")) return message.reply("This person can't be muted!");

    // Fetches the Muted Role
    let muteRole = message.guild.roles.find(`name`, `mutedUser`);

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

    // Fetches the Mute Time
    let mutetime = args[1];
    if(!mutetime) return message.reply("Please specify a time!");

    // Adds the Role to the Muted User
    await(mutedUser.addRole(muteRole.id));
    
    // Mute Log
    let muteEmbed = new Discord.RichEmbed()
    .setDescription("~Temp Mute~")
    .setColor("#e56b00")
    .addField("Muted User", `${mutedUser} with ID: ${mutedUser.id}`)
    .addField("Muted by", `${message.author} with ID: ${message.author.id}`)
    .addField("Muted in", message.channel)
    .addField("Muted for", mutetime);

    // Find the "incidentes" Channel || Needs to be manually added
    let muteChannel = message.guild.channels.find(`name`, "incidentes");
    if(!muteChannel) return message.channel.send("Couldn't find channel");

    // Sends the Log
    muteChannel.send(muteEmbed);

    // Removes the Muted Role after the Timeout
    setTimeout(function(){
        mutedUser.removeRole(muteRole.id);
        message.channel.send(`<@${mutedUser.id}> has been unmuted`);
    }, ms(mutetime));

    return;
}



module.exports.help = {
    name: "mute",
    description: "Mutes an user"
}
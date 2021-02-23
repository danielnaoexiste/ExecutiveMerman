const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    // Fetches the Muted User
    let mutedUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    
    // Returns if user is not found
    if(!mutedUser) return message.reply("Couldn't find user.");
    
    // Check for Permissions
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you can't mute people");
    if(mutedUser.hasPermission("MANAGE_MESSAGES")) return message.reply("this person can't be muted!");

    // Fetches the Muted Role
    let muteRole = message.guild.roles.cache.find(x => x.name === `Muted`);
    // If the Muted role does not exist, create it
    if(!muteRole) {
        try {
            muteRole = await message.guild.roles.create({data: {
                name: 'Muted',
                color: 'RED',
              },
              reason: 'Necessary for Mute Command.',
              permissions: []
            });

            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.updateOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

    // Fetches the Mute Time
    let mutetime = args[2];
    if(!mutetime) return message.reply("Please specify a time!");

    // Adds the Role to the Muted User
    await(mutedUser.roles.add(muteRole.id));
    
    // Mute Log
    let muteEmbed = new MessageEmbed()
    .setDescription("~Temp Mute~")
    .setColor("#e56b00")
    .addField("Muted User", `${mutedUser} with ID: ${mutedUser.id}`)
    .addField("Muted by", `${message.author} with ID: ${message.author.id}`)
    .addField("Muted in", message.channel)
    .addField("Muted for", mutetime);

    // Find the "penalties" Channel || Needs to be manually added
    let muteChannel = message.guild.channels.cache.find(x => x.name === "penalties");
    
    if(!muteChannel) return message.channel.send("Couldn't find channel");
    
    
    // Sends the Log
    muteChannel.send(muteEmbed);

    // Removes the Muted Role after the Timeout
    setTimeout(function(){
        mutedUser.roles.remove(muteRole.id);
        message.channel.send(`<@${mutedUser.id}> has been unmuted`);
    }, ms(mutetime));

    return;
}



module.exports.help = {
    name: "mute",
    description: "Mutes an user. Usage: e!mute @user [time][unit(s,d,m,y)]."
}
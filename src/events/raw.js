const { Emoji, MessageReaction } = require('discord.js');
// const CONFIG = require("../util/rolemenuconfig");

module.exports = async (bot, event) => {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(event.t)) return;
    
    const { d: data } = event;
    const user = await bot.users.fetch(data.user_id);
    const channel = bot.channels.cache.get(data.channel_id);
    
    // console.log("user", user);
    const message = await channel.messages.fetch(data.message_id);
    const member = message.guild.members.cache.get(user.id);
    // console.log("member", member)
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    
    let reaction = message.reactions.cache.get(emojiKey);
    // console.log("Reaction: ", reaction)

    if (!reaction) {
        // Create an object that can be passed through the event like normal
        const emoji = new Emoji(bot.guilds.get(data.guild_id), data.emoji);
        reaction = new MessageReaction(message, emoji, 1, data.user_id === bot.user.id);
    }
    
    let fields;
    if (message.embeds[0] != undefined) {
        fields = message.embeds[0].fields;
        for (const { name, value } of fields) {
            console.log(value)
            if (member.id !== bot.user.id) {
                const guildRole = await message.guild.roles.cache.find(r => r.name === value);
                if (!guildRole) continue;
                if ((name === reaction.emoji.name) || (name === reaction.emoji.toString())) {
                    if (event.t === "MESSAGE_REACTION_ADD") {
                        console.log("Role added!", guildRole.id)
                        member.roles.add(guildRole.id);
                    }
                    else if (event.t === "MESSAGE_REACTION_REMOVE")  {
                        console.log("Role removed!")
                        member.roles.remove(guildRole.id);
                    }
                }
            }
        }
    }
    

}
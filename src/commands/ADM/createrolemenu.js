const { MessageEmbed } = require("discord.js");
const CONFIG = require("../../util/rolemenuconfig")

module.exports.run = async (bot, message, args) => {
    // Security Checks
    if(message.author.bot) return; 
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return;
    if(!message.guild) return;

    // Deletes the Message
    message.delete().catch(O_o=>{});

    let roleEmbed = new MessageEmbed()
    .setTitle(CONFIG.embedFooter)
    .setDescription(CONFIG.embedMessage)
    .setFooter("Viva a Dev-U");

    roleEmbed.setColor(CONFIG.embedColor);
    roleEmbed.setThumbnail(message.guild.iconURL);

    const fields = generateEmbedFields();

    for (const { emoji, role } of fields) {
        if (!message.guild.roles.cache.find(r => r.name === role))
            console.log(`The role '${role}' does not exist!`);
            roleEmbed.addField(emoji, role, true);
   }

    message.channel.send(roleEmbed).then(async m => {
        for (const r of CONFIG.reactions) {
            const emoji = r;
            await m.react(emoji);
        }
    });

    function generateEmbedFields() {
        return CONFIG.roles.map((r, e) => {
            return {
                emoji: CONFIG.reactions[e],
                role: r
            };
        });
    }
}


module.exports.help = {
    name: "createrolemenu",
    description: "Creates a role selection menu (Only on Dev-U Server)!",
    usage: "e!createrolemenu"
}

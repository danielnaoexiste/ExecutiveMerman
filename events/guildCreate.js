const Discord = require("discord.js")
const prefix = require("../botconfig.json")

module.exports = async (bot, guild) => {
    
    console.log(`Joined: ${guild.name}`);
    let penaltiesChannel = guild.channels.find(x => x.name === "penalties");
    let reportChannel = guild.channels.find(x => x.name === "reports");
    let category = guild.channels.find(c => c.name == "ADM" && c.type == "category");
    
    
    // Creates the ADM Category
    if(!category) {
       await guild.createChannel("ADM", "category");
    }
    
    // Creates and links penalties channel
    if(!penaltiesChannel) {
        console.log("Created penalties channel");
        await guild.createChannel("penalties", "text");
        await guild.channels.find(x => x.name === "penalties").setParent(guild.channels.find(c => c.name == "ADM" && c.type == "category").id);
    }
    
    // Creates and links reports channel
    if(!reportChannel) {
        console.log("Created reports channel");
        await guild.createChannel("reports", "text");
        await guild.channels.find(x => x.name === "reports").setParent(guild.channels.find(c => c.name == "ADM" && c.type == "category").id);
    }
    
    // If channel was already created, assign it to the category
    if (category && penaltiesChannel) {
        console.log("Set parent");
        penaltiesChannel.setParent(category.id);
    }   
    
    // If channel was already created, assign it to the category
    if (category && reportChannel){ 
        console.log("Set parent");
        reportChannel.setParent(category.id);
    }
}
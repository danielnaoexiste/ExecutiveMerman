module.exports = async (guild) => {
    console.log(`Joined: ${guild.name}`);
    let penaltiesChannel = guild.channels.cache.find(x => x.name === "penalties");
    let reportChannel = guild.channels.cache.find(x => x.name === "reports");
    let category = guild.channels.cache.find(c => c.name == "ADM" && c.type == "category");
    
    
    // Creates the ADM Category
    if(!category) {
       await guild.channels.create("ADM", { 
        type: "category", 
        position: 1, 
        permissionOverwrites: [{
            id: guild.roles.everyone.id, // @everyone role
            deny: ['VIEW_CHANNEL']
      }] });
    }
    
    // Creates and links penalties channel
    if(!penaltiesChannel) {
        console.log("Created penalties channel");
        await guild.channels.create("penalties");
        await guild.channels.cache.find(x => x.name === "penalties").setParent(guild.channels.cache.find(c => c.name == "ADM" && c.type == "category").id);
    }
    
    // Creates and links reports channel
    if(!reportChannel) {
        console.log("Created reports channel");
        await guild.channels.create("reports");
        await guild.channels.cache.find(x => x.name === "reports").setParent(guild.channels.cache.find(c => c.name == "ADM" && c.type == "category").id);
    }
    
    // If channel was already created, assign it to the category
    if (category && penaltiesChannel) {
        console.log("Set penalties parent");
        penaltiesChannel.setParent(category.id);
    }   
    
    // If channel was already created, assign it to the category
    if (category && reportChannel){ 
        console.log("Set reports parent");
        reportChannel.setParent(category.id);
    }
}
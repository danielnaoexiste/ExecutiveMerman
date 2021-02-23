// Require Modules
const { Client, Collection } = require('discord.js');
const glob = require("glob");
const path = require("path");
require("dotenv").config();

// Declare Bot
const bot = new Client();
bot.commands = new Collection();


// Filesystem + Reading Commands

glob.sync("./src/commands/**/*.js").forEach(function(file){
    let props = require(path.resolve(file))
    console.log(`${props.help.name} loaded!`);
    bot.commands.set(props.help.name, props)
});

require("./util/eventHandler")(bot);

bot.on('message', async message =>  {
    // Returns in certain cases (Author is the bot // dm channel)
    if(message.author.bot) return; 
    if(message.channel.type === "dm") return;
    
    // Declare Locals
    let prefix = process.env.PREFIX;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(0);
    
    // Get the Command Files
    if(!message.content.startsWith(prefix)) return; 
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    
    // Run the Commands
    if (commandfile) commandfile.run(bot, message, args);

});

bot.login(process.env.BOT_TOKEN);
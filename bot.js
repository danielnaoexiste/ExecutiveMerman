// Require Modules
const Discord = require('discord.js');
const tokenfile = require('./token.json')
const botconfig = require('./botconfig.json');
const glob = require("glob");
const path = require("path");

// Declare Bot
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


// Filesystem + Reading Commands

glob.sync("./commands/**/*.js").forEach(function(file){
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
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(0); // Slice the command from the message
    
    // Get the Command Files
    if(!message.content.startsWith(botconfig.prefix)) return; 
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    
    // Run the Commands
    if (commandfile) commandfile.run(bot, message, args);

});

bot.login(tokenfile.token);
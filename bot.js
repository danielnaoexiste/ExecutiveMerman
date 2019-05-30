// Require Modules
const Discord = require('discord.js');
const tokenfile = require('./token.json')
const botconfig = require('./botconfig.json');
const fs = require("fs");
const queue = new Map();


// Declare Bot
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


// Filesystem + Reading Commands
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    
    let jsfile = files.filter(f => f.split(".").pop() === "js"); 
    
    // If no file could be found
    if(jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }
    
    // Logs & loads commands
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props)
    });
});

// Initialize Bot
bot.on('ready', async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setPresence({game:{name: "Discord Administration", type: 0}});
});

bot.on('message', async message =>  {
    // Returns in certain cases (Author is the bot // dm channel)
    if(message.author.bot) return; 
    if(message.channel.type === "dm") return;
    
    // Declare Locals
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(0); // Slice the command from the message
    let serverQueue = queue.get(message.guild.id);
    
    // Get the Command Files
    if(!message.content.startsWith(botconfig.prefix)) return; 
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    
    // Run the Commands
    if (commandfile) commandfile.run(bot, message, args, queue, serverQueue);

});

bot.on('disconnect', () => {
    if(message.guild.me.voiceChannel) {
        queue.delete(message.guild.id);
        message.guild.me.voiceChannel.leave();
        console.log('I just disconnected, making sure you know, I will reconnect now...');
    }
});

bot.login(tokenfile.token);
const Discord = require("discord.js")


module.exports = bot => {
    console.log(`${bot.user.username} is online`)

    let games = [
        `on ${bot.guilds.size} servers!`,
        "+help",
        `with over ${bot.users.size} users!`,
        `alone :c`,
        `GameDEV`,
        `Server Management`
    ]

    setInterval(function() {
        let game = games[Math.floor(Math.random() * games.length)];
        bot.user.setPresence({game:{name: game, type: 0}})

    }, 1000 * 60 * 60);
}
const reqEvent = (event) => require(`../events/${event}`)

module.exports = async(bot) => {
    bot.on("ready", function() {reqEvent("ready") (bot) });
    bot.on("reconnecting", () => reqEvent("reconnecting") (bot))
    bot.on("disconnect", () => reqEvent("disconnect") (bot))
    bot.on("guildCreate", async (guild) => reqEvent("guildCreate") (guild))
    bot.on("warn", reqEvent("warn"))
    bot.on("error", reqEvent("error"))
}
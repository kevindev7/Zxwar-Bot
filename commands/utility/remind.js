const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "remind",
  aliases: ["rm"],
  description: "Reminds a user about something",
  category: "misc",
  usage: "remind <time> <reason>",
  run: async (client, message, args) => {
    let time = args[0];
    if (!time)
      return message.channel.send(
        "What is the time when the reminder should be off?"
      );
    if (ms(time) > ms("1w"))
      return message.reply(
        `${message.author.tag} You cannot set your reminder for more than 1w`
      );

    let alert = args.slice(1).join(" ");
    if (!alert) return message.channel.send(`What is reminder for?`);
    let embed = new MessageEmbed()
      .setAuthor(`${message.author.username} Your reminder has been set!`, client.user.displayAvatarURL())
      .setColor(client.embedcolor)
      .addField(`Time:`, `\`${time}\``, true)
      .addField(`For:`, `\`${alert}\``, true);
    const chgd = await message.channel.send({embeds: [embed]});
		
    setTimeout(() => {
      let DP = new MessageEmbed()
        .setAuthor(`Your reminder is off!`, client.user.displayAvatarURL())
        .setColor(client.embedcolor)
        .addField("Duration", `\`${time}\``, true)
        .addField(`Reason:`, `\`${alert}\``, true);
      message.author.send({ embeds: [DP]});
			chgd.edit({ embeds: [DP]})
    }, ms(time));
  },
};
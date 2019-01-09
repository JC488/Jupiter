"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class Nowplaying extends Command {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      description: "Voir la lecture en cours.",
      category: "Musique",
      usage: "nowplaying",
      aliases: ["np"]
    });
}

  async run(message, args) {
    let queue = this.client.music.getQueue(message.guild.id);
    if(queue.length === 0) {
      return this.client.music.sendEmbed(message, "⚠ Il n'y a pas de musique dans la queue !");
    }

    let embed = new Discord.RichEmbed()
    .setColor(0x36393f)
    .setAuthor(`${this.client.user.username}`, `${this.client.user.displayAvatarURL}`)
    .setThumbnail((queue[0].thumbnails ? queue[0].thumbnails : "https://i.imgur.com/Fo2oWtR.png"))
    .setDescription(`[${queue[0].title}](${queue[0].link})`)
    .setFooter(`Ajouté par: ${queue[0].requested}`);
    await message.channel.send("🎶 Lecture en cours:", embed);
  }
}

module.exports = Nowplaying;
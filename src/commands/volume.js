"use strict";

const Command = require("../structures/Command");

class Volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Changer le volume du bot",
      category: "Musique",
      usage: "volume <Nombre>",
      aliases: []
    });
  }

  async run(message, args) {
    let client = this.client;
    if(!message.member.voiceChannel) {
      return client.music.sendEmbed(message, "⚠ Vous devez être connecté dans un salon-vocal !");
    }
    if(!message.member.voiceChannel.joinable) {
      return client.music.sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    }
    if(!message.member.voiceChannel.speakable) {
      return client.music.sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    }
    if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) {
      return client.music.sendEmbed(message, "⚠ Je ne joue actuellement pas !");
    }
      let volume = args.slice(1).join(" ");
      if(!volume) {
        return client.music.sendEmbed(message, "⚠ Donnez-moi un nom de musique à chanter !");
      }
        await client.music.changeVolume(message, volume);
  }
}

module.exports = Volume;
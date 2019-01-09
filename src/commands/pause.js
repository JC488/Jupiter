"use strict";

const Command = require("../structures/Command");

class Pause extends Command {
  constructor(client) {
    super(client, {
      name: "pause",
      description: "Mettre en pause la musique",
      category: "Musique",
      usage: "pause",
      aliases: []
    });
  }

  async run(message, args) {
    let client = this.client;
    if(!message.guild.voiceConnection) {
      return client.music.sendEmbed(message, "⚠ Je ne suis pas connecté dans un salon-vocal !");
    }
    if(!message.member.voiceChannel) {
      return client.music.sendEmbed(message, "⚠ Vous devez être connecté dans un salon-vocal !");
    }
    if(!message.member.voiceChannel.speakable) {
      return client.music.sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    }
    if(!message.guild.voiceConnection.player.dispatcher) {
      return client.music.sendEmbed(message, ":point_up::skin-tone-3: Je n'ai pas de musique à jouer !");
    }
      if(message.guild.voiceConnection.player.dispatcher.paused) {
        await message.guild.voiceConnection.player.dispatcher.resume();
        await client.music.sendEmbed(message, "▶ La musique était déjà en pause, j'ai donc remis la musique sur play");
      } else {
        await message.guild.voiceConnection.player.dispatcher.pause();
        await client.music.sendEmbed(message, "⏸ J\'ai mis votre musique en pause");
      }
  }
}

module.exports = Pause;

"use strict";

const Command = require("../structures/Command");

class Resume extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      description: "Remettre la musique en route",
      category: "Musique",
      usage: "resume",
      aliases: []
    });
  }

  async run(message, args) {
    let client = this.client;
    if(!message.guild.voiceConnection) {
      return client.music.sendEmbed(message, "⚠ Je ne suis pas connecté dans un salon-vocal !");
    }
    else if(!message.member.voiceChannel) {
      return client.music.sendEmbed(message, "⚠ Vous devez être connecté dans un salon-vocal !");
    }
    else if(!message.member.voiceChannel.speakable) {
      return client.music.sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    }
    else if(!message.guild.voiceConnection.player.dispatcher) {
      return client.music.sendEmbed(message, ":point_up::skin-tone-3: Je n'ai pas de musique à jouer !");
    }
      if(message.guild.voiceConnection.player.dispatcher.paused) {
        await message.guild.voiceConnection.player.dispatcher.resume();
        await client.music.sendEmbed(message, "▶ Je continue à jouer votre musique");
      } else {
        await message.guild.voiceConnection.player.dispatcher.pause();
        await client.music.sendEmbed(message, "⏸ La musique était déjà en mode play, j'ai donc mis la musique en pause");
      }
  }
}

module.exports = Resume;

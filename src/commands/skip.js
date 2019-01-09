"use strict";

const Command = require("../structures/Command");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Passer à la musique suivante",
      category: "Musique",
      usage: "skip",
      aliases: []
    });
  }

  async run(message, args) {
    if(!message.guild.voiceConnection) {
      return this.client.music.sendEmbed(message, "⚠ Je ne suis pas connecté dans un salon-vocal !");
    }
    if(!message.member.voiceChannel) {
      return this.client.music.sendEmbed(message, "⚠ Vous devez être connecté dans un salon-vocal !");
    }
    if(!message.member.voiceChannel.speakable) {
      return this.client.music.sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    }
    if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) {
      return this.client.music.sendEmbed(message, ":point_up::skin-tone-3: Je ne joue actuellement pas.");
    }
      await message.guild.voiceConnection.player.dispatcher.end();
      await this.client.music.sendEmbed(message, "⏩ Changement de la musique en cours !");
  }
}

module.exports = Skip;

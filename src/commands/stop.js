
"use strict";

const Command = require("../structures/Command");

class Stop extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      description: "Stopper la musique et supprimer la queue",
      category: "Musique",
      usage: "stop",
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
    else if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) {
      return client.music.sendEmbed(message, ":point_up::skin-tone-3: Je ne joue actuellement pas.");
    }
        let queue = this.client.music.getQueue(message.guild.id);
        await message.guild.voiceConnection.player.dispatcher.end();
        await client.music.sendEmbed(message, "✅ Je me suis bien arrêté de chanter.");

        if(queue.length === 0) {
          return;
        }
            for (var i = queue.length - 1; i >= 0; i--) {
                await queue.splice(i, 1);
            }
  }
}

module.exports = Stop;

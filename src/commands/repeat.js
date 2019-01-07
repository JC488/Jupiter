"use strict";

const Command = require("../structures/Command");

class Repeat extends Command {
  constructor(client) {
    super(client, {
      name: "repeat",
      description: "Répéter la première musique de la queue",
      category: "Musique",
      usage: "repeat",
      aliases: []
    });
  }

  async run(message, args) {
    if(!message.guild.voiceConnection) return this.client.utils.get("music").sendEmbed(message, "⚠ Je ne suis pas connecté dans un salon-vocal !");
    if(!message.member.voiceChannel) return this.client.utils.get("music").sendEmbed(message, "⚠ Vous devez être connecté dans un salon-vocal !");
    if(!message.member.voiceChannel.speakable) return this.client.utils.get("music").sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) return this.client.utils.get("music").sendEmbed(message, ":point_up::skin-tone-3: Je ne joue actuellement pas.");
        let queue = this.client.utils.get("music").getQueue(message.guild.id);
        if (queue.length == 0) this.client.utils.get("music").sendEmbed(message, "⚠ Il n'y a **aucune** musiques dans la queue !");
            await this.client.utils.get("music").repeat(message, queue, queue[0].link);
  }
};

module.exports = Repeat;

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
    if(!message.guild.voiceConnection) return message.channel.send("⚠ Je ne suis pas connecté dans un salon-vocal !");
    if(!message.member.voiceChannel) return message.channel.send("⚠ Vous devez être connecté dans un salon-vocal !");
    if(!message.member.voiceChannel.speakable) return message.channel.send("⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    if(!message.guild.voiceConnection.player.dispatcher || message.guild.voiceConnection.player.dispatcher.paused) return message.channel.send(":point_up::skin-tone-3: Je ne joue actuellement pas.");
        let queue = this.client.utils.get("music").getQueue(message.guild.id);
        await message.guild.voiceConnection.player.dispatcher.end();
        await message.channel.send("✅ Je me suis bien arrêté de chanter.");

        if(queue.length == 0) return;
            for (var i = queue.length - 1; i >= 0; i--) {
                await queue.splice(i, 1);
            }
  }
};

module.exports = Stop;

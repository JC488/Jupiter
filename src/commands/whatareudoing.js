"use strict";

const Command = require("../structures/Command");

class Whatareudoing extends Command {
  constructor(client) {
    super(client, {
      name: "whatareudoing",
      description: "Entendre un son",
      category: "Soundboard",
      usage: "whatareudoing",
      aliases: []
    });
  }

  async run(message, args) {
    let client = this.client;
    if(!message.member.voiceChannel) {
      return client.music.sendEmbed(message, "⚠ Vous devez être connecté dans un salon-vocal !");
    }
    else if(!message.member.voiceChannel.joinable) {
      return client.music.sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    }
    else if(!message.member.voiceChannel.speakable) {
      return client.music.sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    }
      message.member.voiceChannel.join()
        .then(async(connection) => {
          await connection.sendVoiceStateUpdate({
            self_deaf: true
          });
          await connection.playFile(`./src/assets/soundboard/${this.name}.wav`);
        })
          .catch((err) => {
            if(err) {
              return client.music.sendEmbed(message, "❌ Une erreur est survenue !");
            }
          });
  }
}

module.exports = Whatareudoing;
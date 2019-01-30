"use strict";

const Command = require("../structures/Command");

class Bigletters extends Command {
  constructor(client) {
    super(client, {
      name: "bigletters",
      description: "Rendre vos mots plus grands ! (Caractères Max. 2000)",
      category: "Fun",
      usage: "bigletters <texte>",
      aliases: []
    });
}

  async run(message, args) {
    let client = this.client;
    let text = args.slice(1);
    
    if(!text) {
        return client.music.sendEmbed(message, "⚠ Aucun texte spécifié !");
    }

        text = text.join(" ")
            .replace(/[^a-zA-Z ]/g, "");

        let letterArr = text.split("")
            .map((letter) => (letter === " " ? " " : `:regional_indicator_${letter}:`))
            .join("");

        message.channel.send(letterArr)
            .catch((err) => {
                if(err) {
                    return client.music.sendEmbed(message, "❌ Il y a trop de caractères ! (Max. 2000)");
                }
            });
  }
}

module.exports = Bigletters;

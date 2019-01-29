"use strict";

const Command = require("../structures/Command");

class Invite extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      description: "Envoie l'invitation du bot",
      category: "Bot",
      usage: "invite",
      aliases: []
    });
  }

  async run(message, args) {
    let client = this.client;
    await client.music.sendEmbed(message, "Pour m'inviter, [cliquez-ici](https://discordapp.com/oauth2/authorize?client_id=531502637888045057&scope=bot&permissions=36719872)");
  }
}

module.exports = Invite;

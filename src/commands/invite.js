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
    await client.utils.get("music").sendEmbed(message, `Pour m'inviter, [clique-ici](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1)`);
  }
};

module.exports = Invite;
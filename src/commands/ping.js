"use strict";

const Command = require("../structures/Command");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Voir le ping du bot.",
      category: "Bot",
      usage: "ping",
      aliases: []
    });
}

  async run(message, args) {
    let startTime = Date.now();
    await message.channel.send("*Calcul du ping en cours...*").then(async(m) => await m.edit(`🏓 Pong! **${Date.now() - startTime}**ms`));
  }
}

module.exports = Ping;
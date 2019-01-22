"use strict";

const Command = require("../structures/Command");

class Bingo extends Command {
  constructor(client) {
    super(client, {
      name: "bingo",
      description: "Jouer au bingo",
      category: "Fun",
      usage: "bingo <limite>",
      aliases: []
    });
}

  async run(message, args) {
    let client = this.client;
    let limit = args[1];
    
    if(client.cooldown.bingo[message.guild.id]) {
        return message.channel.send("⚠ Un bingo est déjà en route!");
    }
    
    if(!limit || isNaN(limit) || limit === 0) {
        return message.channel.send("⚠ Ce n'est pas une limite valide, veuillez taper un nombre > **0**!");
    }
    else if(limit > 1000) {
        return message.channel.send("⚠ Ce n'est pas une limite valide, veuillez taper un nombre < **1000**!");
    }
    
    message.channel.send(`Que le bingo commence ! Vous avez **1** minute pour trouver un nombre compris entre **0** et **${Math.round(limit)}**`).then(async(m) => {
        const random = Math.floor(Math.random() * limit);
        const filter = m => m.author.id !== client.user.id;
        const collector = await m.channel.createMessageCollector(filter, { time: 60000 });

        client.cooldown.bingo[m.guild.id] = true;

        collector.on("collect", async(collected) => {
            if(collected.content.toLowerCase() === "annuler") {
                return collector.stop(`✅ Bingo annulé !`);
            } else {
                let response = await collected.content.trim();
                response = parseInt(response);

                if(isNaN(response)) {
                    return message.channel.send("⚠ Ce n'est pas un nombre !");
                }
                else if(response < random) {
                    return message.channel.send("⚠ C'est plus !");
                }
                else if(response > random) {
                    return message.channel.send("⚠ C'est moins !");
                }
                else if(response === random) {
                    await collector.stop(`${collected.author.toString()} a remporté le Bingo, le nombre était: **${random}**`);
                }
            }
        });
        collector.on("end", async(collected, reason) => {
            delete client.cooldown.bingo[m.guild.id];

            if(reason && reason !== "time") {
                return message.channel.send(reason);
            } else {
                return message.channel.send(`Personne a remporté le Bingo, le nombre était: **${random}**`);
            }
        });
    });
  }
}

module.exports = Bingo;

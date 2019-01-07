"use strict";

const Command = require('../structures/Command');
const Discord = require('discord.js');
const util = require("util");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Evaluer un code",
      category: "Owner",
      usage: "eval <code>",
      aliases: ["e"]
    });
  }

  async run(message, args) {
    let code = args.slice(1).join(" ");

    if(message.author.id != this.client.config.OWNER_ID) return message.channel.send("⚠ Tu n'as pas les permissions suffisantes pour exécuter cette commande.");
      try {

        let ev = eval(code);
        let str = util.inspect(ev, {
            depth: 1
        });

        str = `${str.replace(new RegExp(`${this.client.token}`, "g"), "token")}`;

        if(str.length > 1900) {
          str = str.substr(0, 1900);
          str = str + "...";
        }

        await message.react("✅");
        await message.channel.send('📝 Eval réussi avec succès:\n'+ '\`\`\`JS\n' + str + '\`\`\`');
      } catch (err) {
        await message.react("❌");
        await message.channel.send('💥 Eval échoué:\n'+'\`\`\`JS\n' + err + '\`\`\`');
      }
  }
};

module.exports = Eval;
"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Voir les commandes du bot",
      category: "Bot",
      usage: "help",
      aliases: ["h"]
    });
  }

  async run(message, args) {
    let argument = args.slice(1).join(" ");

    if(!argument) {
      let categories = [];

      await this.client.commands.filter((c) => c.category != "Owner").forEach(async(c) => {
        if(!categories.includes(c.category)){
          await categories.push(c.category);
        }
      });

      let embed = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setAuthor(`${this.client.user.username}`, `${this.client.user.displayAvatarURL}`)
        .setFooter(`${this.client.user.username} © 2019 | Type '!help <command>' to display command details.`);
        await categories.sort().map(async(c) => {
          embed.addField(c, await this.client.commands.filter((command) => command.category === c).map(command => `\`${command.name}\``).join(", "), false);
        });
        await message.channel.send(embed);
    } else {
      if(!this.client.commands.has(argument)) {
        return this.client.utils.get("music").sendEmbed(message, "⚠ Aucune commande de ce nom trouvé !");
      }
      
        let command = this.client.commands.get(argument);
        let aliases = ((command.aliases.length > 0) ? command.aliases.map((a) => `\`${a}\``).join(", ") : "Aucun");
        
        let embed = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setAuthor(`${this.client.user.username}`, `${this.client.user.displayAvatarURL}`)
        .setDescription("Syntaxe:\n\n[] = option\n<> = obligation")
        .addField("Nom", command.name, false)
        .addField("Description", command.description, false)
        .addField("Categorie", command.category, false)
        .addField("Usage", command.usage, false)
        .addField("Aliases", aliases, false)
        .setFooter(`${this.client.user.username} © 2019`);
        await message.channel.send(embed);
    }
  }
}

module.exports = Help;
"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const axios = require("axios");

class Lookup extends Command {
  constructor(client) {
    super(client, {
      name: "lookup",
      description: "Voir l'aperçu d'un utilisateur ou d'une guild.",
      category: "Utilitaire",
      usage: "lookup <`guild` ou `user`> <ID>",
      aliases: []
    });
}

  async run(message, args) {
    let client = this.client;
    let search = args.slice(2).join(" ");
    if(!args.slice(1).join(" ")) {
        return client.music.sendEmbed(message, `⚠ L'utilisation correcte est: ${client.config.PREFIX}lookup <\`user\` ou \`guild\`> <ID>`);
    }
      switch (args[1]) {
          case "user":
              if(!search) {
                  return client.music.sendEmbed(message, "⚠ Donnez-moi l'ID d'un utilisateur Discord !");
              }
                await axios.get(`https://discordapp.com/api/v6/users/${search}`, {
                    headers: {
                        "User-Agent": `${client.user.username}`,
                        "Content-Type": "application/json",
                        Authorization: `Bot ${client.config.BOT_TOKEN}`
                    }
                })
                    .then(async(res) => {
                        if(!res.data) {
                            return client.music.sendEmbed(message, "❌ Aucun utilisateur trouvé !");
                        }
                          let embed = new Discord.RichEmbed()
                          .setColor(0x36393f)
                          .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                          .addField("ID", `${res.data.id}`, false)
                          .addField("Nom", `${res.data.username}#${res.data.discriminator}`, false)
                          .setImage(`https://cdn.discordapp.com/avatars/${res.data.id}/${res.data.avatar}`);
                          await message.channel.send(embed);
                    })
                        .catch((err) => {
                            if(err) {
                                return client.music.sendEmbed(message, "❌ Une erreur est survenue !");
                            }
                        });
              break;
          case "guild":
              if(!search) {
                  return client.music.sendEmbed(message, "⚠ Donnez-moi l'ID d'une guild Discord !");
              }
                await axios.get(`https://discordapp.com/api/v6/guilds/${search}`, {
                    headers: {
                        "User-Agent": `${client.user.username}`,
                        "Content-Type": "application/json",
                        Authorization: `Bot ${client.config.BOT_TOKEN}`
                    }
                })
                    .then(async(res) => {
                        if(!res.data) {
                            return client.music.sendEmbed(message, "❌ Aucune guild trouvée !");
                        }
                          let embed = new Discord.RichEmbed()
                          .setColor(0x36393f)
                          .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL}`)
                          .addField("ID", `${res.data.id}`, false)
                          .addField("Nom", `${res.data.name}`, false)
                          .addField("Emojis", `${res.data.emojis.length}`, false)
                          .addField("Roles", `${res.data.roles.length}`, false)
                          .addField("Region", `${res.data.region}`, false)
                          .setImage(`https://cdn.discordapp.com/icons/${res.data.id}/${res.data.icon}`);
                          await message.channel.send(embed);
                    })
                        .catch((err) => {
                            if(err) {
                                return client.music.sendEmbed(message, "❌ Une erreur est survenue !");
                            }
                        });
              break;
          default:
              client.music.sendEmbed(message, `⚠ L'utilisation correcte est: ${client.config.PREFIX}lookup <\`user\` ou \`guild\`> <ID>`);
              break;
      }
  }
}

module.exports = Lookup;

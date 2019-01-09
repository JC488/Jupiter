"use strict";

const Command = require("../structures/Command");
const Discord = require("discord.js");
const os = require("os");

class Stats extends Command {
  constructor(client) {
    super(client, {
      name: "stats",
      description: "Voir les stats du bot.",
      category: "Bot",
      usage: "stats",
      aliases: ["debug"]
    });
}

  async run(message, args) {
    let ownerID = this.client.config.OWNER_ID;
    let guilds = await this.client.shard.fetchClientValues('guilds.size');
      guilds.reduce((prev, val) => prev + val, 0);
    let users = await this.client.shard.fetchClientValues('users.size');
      users.reduce((prev, val) => prev + val, 0);
    let channels = await this.client.shard.fetchClientValues('channels.size');
      channels.reduce((prev, val) => prev + val, 0);
    let voiceConnections = await this.client.shard.fetchClientValues('voiceConnections.size');
      voiceConnections.reduce((prev, val) => prev + val, 0);
    let uptime = await this.client.shard.fetchClientValues('uptime');

    let embed = new Discord.RichEmbed()
    .setColor(0x36393f)
    .setAuthor(`${this.client.user.username}`, `${this.client.user.displayAvatarURL}`)
    .addField("Nombre de serveurs", `${guilds}`, true)
    .addField("Nombre d\'utilisateurs", `${users}`, true)  
    .addField("Nombre de salons", `${channels}`, true)
    .addField("Nombre de connections", `${voiceConnections}`, true)
    .addField("Développeur du bot", `${this.client.users.get(ownerID).tag}`, false)
    .addField("RAM", `${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%)`, true)
    .addField("CPU", `${os.cpus()[0].model} @${os.cpus()[0].speed}MHz`, true)
    .addField("Dernière connexion", (Math.round(uptime / (1000 * 60 * 60))) + " Heure(s), " + (Math.round(uptime / (1000 * 60)) % 60) + " minute(s) et " + (Math.round(uptime / 1000) % 60) + " seconde(s)")
    .addField("Lib", `Discord.js ${Discord.version}`, false);
    await message.channel.send("⚙ Mes stats:", embed);
  }
}

module.exports = Stats;

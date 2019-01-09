"use strict";

const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config");
const LOGGER = require("./src/utils/helpers/logger");
const MUSIC = require("./src/utils/helpers/music");

class Jupiter extends Discord.Client {
  constructor() {
    super();
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.config = config;
    this.logger = new LOGGER(this);
    this.music = new MUSIC(this);
  }
}

const client = new Jupiter();

fs.readdir("./src/commands", (err, files) => {
  if(err) throw err;
  if(!files.length) {
    return client.logger.warn("Aucune commande trouvée !");
  }

  const commands = files.filter((c) => c.split(".").pop() === "js");

  for (let i = 0; i < commands.length; i++) {
    if (!commands.length) {
      return client.logger.warn("Aucune commande trouvée !");
    }
    const FILE = require(`./src/commands/${commands[i]}`);
    const command = new FILE(client);

    client.commands.set(command.name, command);
    client.logger.log(`[Commande] ${command.name} chargée !`);

    if (command && command.aliases) {
      for (let i = 0; i < command.aliases.length; i++) {
        client.aliases.set(command.aliases[i], command);
      }
    }
  }
});

fs.readdir("./src/events", (err, files) => {
  if(err) throw err;
  if(!files.length) {
    return client.logger.warn("[Alerte] Aucun event trouvé !");
  }

  const events = files.filter((c) => c.split(".").pop() === "js");

  for (let i = 0; i < events.length; i++) {
    if (!events.length) {
      return client.logger.warn("[Alerte] Aucun event trouvé !");
    }

    const FILE = require(`./src/events/${events[i]}`);
    const event = new FILE(client);

    client.logger.log(`[Event] ${event.name} chargé !`);
    client.on(events[i].split(".")[0], (args) => event.run(args));
  }
});

process.on("unhandledRejection", (err) => {
  client.logger.error(err);
});

client.login(config.BOT_TOKEN);

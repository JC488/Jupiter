"use strict";

const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config");

class Jupiter extends Discord.Client {
  constructor() {
    super();
    this.commands = new Discord.Collection();
    this.aliases = new Discord.Collection();
    this.utils = new Discord.Collection();
    this.config = config;
  }
}

const client = new Jupiter();

fs.readdir("./src/commands", (err, files) => {
  if(err) throw err;
  if(!files.length) return console.log("[Alerte] Aucune commande trouvée !");

  const commands = files.filter((c) => c.split(".").pop() === "js");

  for (let i = 0; i < commands.length; i++) {
    if (!commands.length) return console.log("[Alerte] Aucune commande trouvée !");
    const FILE = require(`./src/commands/${commands[i]}`);
    const command = new FILE(client);

    client.commands.set(command.name, command);
    console.log(`[Commande] ${command.name} chargée !`);

    if (command && command.aliases) {
      for (let i = 0; i < command.aliases.length; i++) {
        client.aliases.set(command.aliases[i], command);
      }
    }
  }
});

fs.readdir("./src/events", (err, files) => {
  if(err) throw err;
  if(!files.length) return console.log("[Alerte] Aucun event trouvée !");

  const events = files.filter((c) => c.split(".").pop() === "js");

  for (let i = 0; i < events.length; i++) {
    if (!events.length) return console.log("[Alerte] Aucun event trouvée !");

    const FILE = require(`./src/events/${events[i]}`);
    const event = new FILE(client);

    console.log(`[Event] ${event.name} chargé !`);
    client.on(events[i].split(".")[0], (args) => event.run(args));
  }
});

fs.readdir("./src/utils/helpers/", (err, files) => {
  if(err) throw err;
  if (!files.length) return console.log("[Alerte] Aucun plugin trouvé !");

  const plugs = files.filter((c) => c.split(".").pop() === "js");

  for (let i = 0; i < plugs.length; i++) {
    if (!plugs.length) return console.log("[Alerte] Aucun plugin trouvé !");

    const PLUG = require(`./src/utils/helpers/${plugs[i]}`);
    const nplug = new PLUG(client);

    client.utils.set(plugs[i].split(".")[0], nplug);
    console.log(`[Plugin] ${plugs[i].split(".")[0]} chargé !`);
  }
});

process.on("unhandledRejection", (err) => {
  console.dir(err);
});

client.login(config.BOT_TOKEN);
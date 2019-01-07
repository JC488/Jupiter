module.exports = class Command {
  constructor(client, options) {
    this.client = client;
    this.name = options.name;
    this.usage = options.usage || "Aucun usage spécifié.";
    this.description = options.description || "Aucune description spécifiée.";
    this.aliases = options.aliases || "Aucun aliase spécifié.";
    this.category = options.category || null;
  }
};
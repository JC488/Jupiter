"use strict";

class Event {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name;
  }

  async run(event) {
    try {
      await this.run(event);
    } catch (err) {
      console.error(e);
    }
  }
};

module.exports = Event;
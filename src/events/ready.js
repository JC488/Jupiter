const Event = require("../structures/Event");

class Ready extends Event {
  constructor(args) {
    super(args, {
    	name: "Ready"
    });
  }

  async run() {
    if(!this.client.user.bot) {
        process.exit(0);
    }

    await this.client.user.setPresence({game:{name: `${this.client.config.PREFIX}help`}});
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`${this.client.user.username}#${this.client.user.discriminator} est en ligne sur la version ${require("../../package").version} de Jupiter`);
  }
}

module.exports = Ready;
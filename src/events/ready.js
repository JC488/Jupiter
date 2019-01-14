const Event = require("../structures/Event");
const logo = require('asciiart-logo');

class Ready extends Event {
  constructor(args) {
    super(args, {
    	name: "Ready"
    });
  }

  async run() {
    let client = this.client;
    if(!client.user.bot) {
      return process.exit(0);
    }

    await client.user.setPresence({game:{name: `${client.config.PREFIX}help`}});
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await console.log(
      logo({
        name: `${client.user.username}`,
        font: 'Speed',
        lineChars: 15,
        padding: 5,
        margin: 2
      })
      .emptyLine()
      .right(`version ${require("../../package").version}`)
      .emptyLine()
      .wrap(`${client.user.username}#${client.user.discriminator} développé par Sworder.`)
      .render()
    );
    client.updater.updateStats();
  }
}

module.exports = Ready;

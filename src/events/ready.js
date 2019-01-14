const Event = require("../structures/Event");
const logo = require("asciiart-logo");

class Ready extends Event {
  constructor(args) {
    super(args, {
    	name: "Ready"
    });
  }

  async run() {
    if(!this.client.user.bot) {
      return process.exit(0);
    }

    await this.client.user.setPresence({game:{name: `${this.client.config.PREFIX}help`}});
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(
      logo({
        name: `${this.client.user.username}`,
        font: "Speed",
        lineChars: 15,
        padding: 5,
        margin: 2
      })
      .emptyLine()
      .right(`version ${require("../../package").version}`)
      .emptyLine()
      .wrap(`${this.client.user.username}#${this.client.user.discriminator} développé par Sworder.`)
      .render()
    );
  }
}

module.exports = Ready;

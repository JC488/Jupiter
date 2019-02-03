"use strict";

const Command = require("../structures/Command");
const { Canvas } = require("canvas-constructor");
const axios = require("axios");

class Badge extends Command {
  constructor(client) {
    super(client, {
      name: "badge",
      description: "Voir une jolie image du bot",
      category: "Bot",
      usage: "badge",
      aliases: []
    });
}

  async run(message, args) {
    let client = this.client;
    
    Canvas.registerFont("./src/assets/fonts/Uni_Sans_Heavy.otf", "Discord");

    let img = new Canvas(390, 180)
    .save()
    .setColor("#00000082")
    .setShadowColor("rgba(0, 0, 0, 0.3)")
    .setShadowOffsetY(2)
    .setShadowBlur(10)
    .addRect(0, 0, 390, 170)
    .addCircle(80, 85, 60)
    .addRoundImage(await getImage(client.user.displayAvatarURL), 20, 20, 128, 128, 64)
    .restore()

    .save()
    .setTextAlign("center")
    .setTextFont("25px Discord")
    .setColor("#FFFFFF")
    .addText(client.user.username, 265, 54)
    .restore()

    .save()
    .setColor("#ccc")
    .addBeveledRect(188, 60, 155, 4, 5)
    .restore()

    .save()
    .setTextAlign("center")
    .setTextFont("20px Discord")
    .setColor("#777")
    .addText(`${client.guilds.size} serveurs`, 265, 100)
    .addText(`${client.users.size} utilisateurs`, 265, 125)
    .restore()

    .toBuffer();

    message.channel.send({ file: { attachment: await img, name: "badge.png" }});

    async function getImage(imageURL) {
        return new Promise(async(resolve, reject) => {
            await axios.get(imageURL, {
                responseType: "arraybuffer"
            }).then((res) => {
                if(res.data) {
                    resolve(res.data);
                }
            }).catch((err) => {
                if(err) {
                    reject(new Error(err));
                }
            })
        });
    }
  }
}

module.exports = Badge;

"use strict";

const Event = require("../structures/Event");

class Message extends Event {
    constructor(args) {
        super(args, {
            name: "Message"
        });
    }

    async run(message) {
        if(message.channel.type === "dm") {
            return;
        }
        if(message.author.bot) {
            return;
        }
        if(!message.channel.permissionsFor(this.client.user).has("SEND_MESSAGES")) {
            return;
        }

            let prefix = this.client.config.PREFIX;
            let command = message.content.slice(1).trim().split(" ").shift().toLowerCase();

            if(!message.content.startsWith(prefix)) {
                return;
            }

                let args = message.content.split(" ");
                
                if(this.client.commands.has(command)) {
                    const cmd = this.client.commands.get(command);
                    if(cmd.category === "Owner" && message.author.id !== this.client.config.OWNER_ID) {
                        return;
                    }
                        await cmd.run(message, args);
                } else if(this.client.aliases.has(command)) {
                    const cmd = this.client.aliases.get(command);
                    await cmd.run(message, args);
                } else {
                    return;
                }
    }
}

module.exports = Message;

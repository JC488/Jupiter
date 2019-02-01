"use strict";

const Event = require("../structures/Event");

class Error extends Event {
    constructor(args) {
        super(args, {
            name: "Error"
        });
    }

    async run(error) {
        if(!error) {
            return;
        }
            this.client.logger.error(error);
    }
}

module.exports = Error;

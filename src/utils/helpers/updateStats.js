"use strict";

const axios = require("axios");

class UpdateStats {
    /**
     * @constructor
     */
    constructor(client) {
        this.client = client;
    }

    async updateStats() {
        let client = this.client;
        let server_count = await client.shard.fetchClientValues("guilds.size");
            server_count.reduce((prev, val) => prev + val, 0);
            
        await axios({
            method: "post",
            url: `https://divinediscordbots.com/bots/${client.user.BOT_ID}/stats`,
            headers: {
                "Content-Type": "application/json",
                Authorization: client.config.DBL_TOKENS.DDBL
            },
            data: {
                server_count
            }
        })
            .then(() => {
                client.logger.log(`[STATS] Les stats du bot ont bien été postés sur DDBL !\nNombre de serveurs: ${server_count}`);
            })
                .catch((err) => {
                    if(err) {
                        return client.logger.error(`[STATS] Une erreur est survenue lors de la mise à jours des stats sur DDBL !\n${err.stack}`);
                    }
                });
        await axios({
            method: "post",
            url: `https://botsfordiscord.com/api/bot/${client.user.BOT_ID}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: client.config.DBL_TOKENS.BFD
            },
            data: {
                server_count
            }
        })
            .then(() => {
                client.logger.log(`[STATS] Les stats du bot ont bien été postés sur BFD !\nNombre de serveurs: ${server_count}`);
            })
                .catch((err) => {
                    if(err) {
                        return client.logger.error(`[STATS] Une erreur est survenue lors de la mise à jours des stats sur BFD !\n${err.stack}`);
                    }
                });
    }
}

module.exports = UpdateStats;

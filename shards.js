const { ShardingManager } = require("discord.js");
const config = require("./config");
const LOGGER = require("./src/utils/helpers/logger");
const logger = new LOGGER();

const sharder = new ShardingManager("./index.js", {
    token: config.BOT_TOKEN,
    totalShards: "auto"
});

sharder.on("launch", (shard) => {
    logger.log(`Sharding | Shard #${shard.id} lancé !`);
});

sharder.spawn()
    .then(() => {
        logger.log("Sharding | Tous les shards sont lancés !");
    });

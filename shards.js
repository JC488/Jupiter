const { ShardingManager } = require("discord.js");
const config = require("./config");
const LOGGER = require("./src/utils/helpers/logger");
const logger = new LOGGER();

const shards = new ShardingManager("./index.js", {
    token: config.BOT_TOKEN,
    totalShards: "auto"
});

shards.on("launch", (shard) => {
    logger.log(`[SHARDING] Shard #${shard.id} lancé`);
});

shards.spawn();

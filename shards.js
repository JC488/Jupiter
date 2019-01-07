const { ShardingManager } = require("discord.js");
const config = require("./config");
const shards = new ShardingManager("./index.js", {
    token: config.BOT_TOKEN,
    totalShards: "auto"
});

shards.on("launch", (shard) => {
    console.log(`[SHARDING] Shard #${shard.id} lancé`);
});

shards.spawn();
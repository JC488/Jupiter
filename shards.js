const config = require("./config");
const { ShardingManager } = require("discord.js");
const shards = new ShardingManager("./index.js", {
    token: config.BOT_TOKEN,
    totalShards: "auto"
});

let Console = console;

shards.on("launch", (shard) => {
    Console.log(`[SHARDING] Shard #${shard.id} lancé`);
});

shards.spawn();

"use strict";

const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const search = require("youtube-search");
const ffmpeg = require("ffmpeg-binaries");
const axios = require("axios");
const cheerio = require("cheerio");

let dispatcher;
let queues = {};

class Music {
  /**
   * @constructor
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Returns the queue of the guild.
   * @param {string} guildID The ID of the guild
   */
  getQueue(guildID) {    
    if(!guildID) {
      return;
    }
    if(!queues[guildID]) {
      queues[guildID] = [];
    }
    return queues[guildID];
  }

  /**
   * Search the song.
   * @param {Object} message
   * @param {string} song The song
   * @returns {Promise}
   */
  searchSong(message, song) {
    let client = this.client;
    search(song, client.config.MUSIC_OPTS, async function(err, results) {
      if(err) {
        return client.utils.get("music").sendEmbed(message, "⚠ Un bug est survenu !");
      }
        let pre = "";
        let msg = "";

        if(results.length === 0) {
          return client.utils.get("music").sendEmbed(message, "⚠ Aucune musique trouvée.");
        }
        if(results.length > 1) {
          pre += `**${results.length}** résultats pour: \`${song}\``;
        } else {
          return await client.utils.get("music").addToQueue(message, await client.utils.get("music").getQueue(message.guild.id), results[0]);
        }   

        for (var i = 0; i < results.length; i++){
          msg += "\n> **" + (i+1) + "** - `" + results[i].title + "`";   
        }
        msg += "\n\nChoisissez votre musique avec le numéro qui correspond, tapez `annuler` pour annuler.";

        let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL)
        .setColor(0x36393f) 
        .setDescription(msg);
        message.channel.send(pre, embed).then(async(m) => {
          const filter = m => m.author.id === message.author.id;
          await m.channel.awaitMessages(filter, {max: 1, time: 20000}).then(async(collected) => {
            collected = collected.first();
            if(collected.content.toLowerCase() === "annuler") {
              return client.utils.get("music").sendEmbed(message, "Mode annulé ! ✅");
            }
              let choice = await collected.content.match(/\d{1}/g);
              if(!choice || !choice.length) {
                return client.utils.get("music").sendEmbed(message, "⚠ Ce n'est pas un choix valide !");
              }
                choice = parseInt(choice[0])-1;
                if(isNaN(choice) || choice > results.length || choice < 0) {
                  return client.utils.get("music").sendEmbed(message, "⚠ Ce n'est pas un choix qui fait parti de la selection !");
                }
                  await client.utils.get("music").addToQueue(message, await client.utils.get("music").getQueue(message.guild.id), results[choice]);
                  await m.delete();
          }).catch((err) => {
            if(err) {
              return client.utils.get("music").sendEmbed(message, "⚠ Aucun choix donné à temps, j\'ai clos la sélection.");
            }
          });
        });
    });
  }

  /**
   * Adds a song to the queue.
   * @param {Object} message
   * @param {Array} queue The queue of the guild
   * @param {string} song The song
   */
  addToQueue(message, queue, song) {
    let client = this.client;
    try {
      if(!message || !queue) {
        return;
      }
      if(song) {
        let stream = ytdl(song.link, {
            audioonly: true,
            quality: "highestaudio"
        });

        stream.on("error", (error) => {
            return client.utils.get("music").sendEmbed(message, "⚠ Un bug est survenu.");
        });

        let test;
        if(queue.length === 0) {
          test = true;
        }

        queue.push({
            "title": song.title,
            "requested": message.author.username,
            "toplay": stream,
            "link": song.link,
            "description": song.description,
            "thumbnails": song.thumbnails.default.url,
            "videoId": song.id
        });
                  
        if(queue.length > 1) {
          client.utils.get("music").sendEmbed(message, `✍ Nouvel ajout dans la queue: \`${queue[queue.length - 1].title}\``);
        }
          
        if(test) {
          setTimeout(async() => {
            await client.utils.get("music").play(message, queue);
          }, 1000);
        }
      } else {
          return client.utils.get("music").sendEmbed(message, "⚠ Aucune musique receptionnée !");
      }
    } catch (err) {
      if(err) {
        return client.utils.get("music").sendEmbed(message, "❌ Une erreur est survenue !");
      }
    }
  }

  /**
   * Starts the bot queue.
   * @param {Object} message
   * @param {Array} queue The queue of the guild
   */
  play(message, queue) {
    let client = this.client;
    if(!message.guild.voiceConnection) {
      return client.utils.get("music").sendEmbed(message, "⚠ Je ne suis pas connecté !");
    }
    if(!message.member.voiceChannel) {
      return client.utils.get("music").sendEmbed(message, "⚠ Vous devez être connecté dans un salon-vocal !");
    }
    if(!message.member.voiceChannel.speakable) {
      return client.utils.get("music").sendEmbed(message, "⚠ Je n'ai pas la permission de `rejoindre` ou `parler` dans ce salon !");
    }
    if(queue.length === 0) {
      return client.utils.get("music").sendEmbed(message, "⚠ La queue est vide !");
    }
    
      let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL)
      .setThumbnail((queue[0].thumbnails ? queue[0].thumbnails : "https://i.imgur.com/Fo2oWtR.png"))
      .setColor(0x36393f)
      .setDescription(`[${queue[0].title}](${queue[0].link})`);
      message.channel.send("🎶 Lecture en cours:", embed);

      if(queue[0].toplay === null)  {
        queue[0].toplay = ytdl(queue[0].link, {
          audioonly: true,
          quality: "highestaudio"
        });
      }

      dispatcher = message.guild.voiceConnection.playStream(queue[0].toplay);
      dispatcher.on("error", async() => {
        await client.utils.get("music").sendEmbed(message, "⚠ Un bug est survenu !");
        await queue.shift();
        await client.utils.get("music").play(message, queue);
      });
      dispatcher.on("end", () => { 
        if(message.guild.me.voiceChannel.members.filter(m => m.id != client.user.id).size === 0) {
          message.guild.me.voiceChannel.leave()
            .then(async() => {
              await client.utils.get("music").sendEmbed(message, "C'est pas très sympa de me laisser toute seule ! 😡");
            })
              .catch((err) => {
                if(err) {
                  return client.utils.get("music").sendEmbed(message, "❌ Une erreur est survenue !");
                }
              });
        } else {
          setTimeout(async() => {
            if(queue.length > 0) { 
              await queue.shift();
              await client.utils.get("music").play(message, queue);
            }
          }, 1000);
        }
      });
  }

  /**
   * Repeat the song.
   * @param {Object} message
   * @param {Array} queue The queue of the guild
   * @param {string} song The song
   */
  repeat(message, queue, song) {
    let client = this.client;
    search(song, client.config.MUSIC_OPTS, function(err, results) {
      if(err) {
        return client.utils.get("music").sendEmbed(message, "⚠ Un bug est survenu !");
      }
      if(results.length === 0) {
        return client.utils.get("music").sendEmbed(message, "⚠ Aucune musique trouvée.");
      }
        client.utils.get("music").addToQueue(message, queue, results[0]);
    });
  }

  /**
   * Search lyrics of a song.
   * @param {Object} message
   * @param {string} song The song
   */
  searchLyrics(message, song) {
    let client = this.client;
    let titre = song
      .toLowerCase()
      .replace(/\(lyrics|lyric|official music video|audio|official|official video|official video hd|clip officiel|clip|extended|hq\)/g, "")
      .split(" ").join("%20");

    axios.get(`https://www.musixmatch.com/search/${titre}`)
      .then(async(result) => {
        let $ = await cheerio.load(result.data);
        let link = `https://musixmatch.com${$("h2[class=\"media-card-title\"]").find("a").attr("href")}`;
        await axios.get(link).then(async(res) => {
          let $$ = await cheerio.load(res.data);
          let lyrics = await $$("p[class=\"mxm-lyrics__content \"]").text();
          if(lyrics.length > 2032) {
            lyrics = lyrics.substr(0, 2032);
            lyrics = lyrics + "\n**Too long...**";
          } else if(lyrics.length === 0) {
            if(err) {
              return client.utils.get("music").sendEmbed(message, "❌ Aucune parole trouvées !");
            }
          }
          await client.utils.get("music").sendEmbed(message, lyrics);
        })
          .catch((err) => {
            if(err) {
              return client.utils.get("music").sendEmbed(message, "❌ Une erreur est survenue !");
            }
          });
      })
        .catch((err) => {
          if(err) {
            return client.utils.get("music").sendEmbed(message, "❌ Une erreur est survenue !");
          }
        });
  }

  /**
   * Change the volume.
   * @param {Object} message
   * @param {string} volume The volume
   */
  changeVolume(message, volume) {
    let client = this.client;
    if(parseInt(volume) > 100) {
      return client.utils.get("music").sendEmbed(message, "⚠ Le volume ne peut atteindre que jusqu'à 100% maximum !");
    }
      message.guild.voiceConnection.player.dispatcher.setVolume((parseInt(volume) / 100));
      client.utils.get("music").sendEmbed(message, `🔊 Le volume est désormais à \`${parseInt(volume)}/100\``);
  }

  /**
   * Returns message with an embed.
   * @param {Object} message
   * @param {string} content The content
   */
  sendEmbed(message, content) {
    let client = this.client;
    let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setColor(0x36393f)
    .setDescription(content);
    message.channel.send(embed);
  }
}

module.exports = Music;
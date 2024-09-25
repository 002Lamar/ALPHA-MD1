const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const fs = require('fs');
const axios = require("axios");
const ytdl = require("ytdl-core");

zokou({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Which song do you want?");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const results = await yts(searchQuery);
    const videos = results.videos;

    if (videos.length > 0) {
      const video = videos[0];
      const songDetails = {
        image: { url: video.thumbnail },
        caption: `\n*✞𝐍𝐚𝐦𝐞:* _${video.title}_\n*✞𝐃𝐮𝐫𝐚𝐭𝐢𝐨𝐧:* _${video.timestamp}_\n*✞𝐃𝐢𝐫𝐞𝐜𝐭 𝐥𝐢𝐧𝐤:* _${video.url}_\n\n_╭────────────────◆
u can as well join here to get your song download
in more tracks 🤗😋 
https://t.me/keithmd 
use prefix {/}  example {/search dada}
╰────────────────◆_\n\n_╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆_\n\n`
      };

      zk.sendMessage(origineMessage, songDetails, { quoted: commandeOptions.ms });

      const response = await axios.get(`https://api.cafirexos.com/api/v1/ytmp3?url=${video.url}`, {
        responseType: "stream"
      });

      const writeStream = fs.createWriteStream("audio.mp3");
      response.data.pipe(writeStream);

      writeStream.on("finish", () => {
        zk.sendMessage(origineMessage, {
          audio: { url: "audio.mp3" },
          mimetype: "audio/mp4"
        }, { quoted: commandeOptions.ms, ptt: false });
      });

      writeStream.on("error", err => {
        console.error("Error writing file:", err);
        repondre("Download failed");
      });
    } else {
      repondre("No video found.");
    }
  } catch (error) {
    console.error("Error during search or download:", error);
    repondre("Download failed");
  }
});

zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Insert video name");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos.length > 0) {
      const video = videos[0];
      const videoDetails = {
        image: { url: video.thumbnail },
        caption: `*✞𝐕𝐢𝐝𝐞𝐨 𝐍𝐚𝐦𝐞:* _${video.title}_\n*✞𝐃𝐮𝐫𝐚𝐭𝐢𝐨𝐧:* _${video.timestamp}_\n*✞𝐃𝐢𝐫𝐞𝐜𝐭 𝐥𝐢𝐧𝐤:* _${video.url}_\n_╭────────────────◆
u can as well join here to get your song download
in more tracks 🤗😋 
https://t.me/keithmd 
use prefix {/}  example {/search dada}
╰────────────────◆_\n\n_╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆_\n\n`
      };

      zk.sendMessage(origineMessage, videoDetails, { quoted: commandeOptions.ms });

      const response = await axios.get(`https://api.cafirexos.com/api/v1/ytmp4?url=${video.url}`, {
        responseType: "stream"
      });

      const fileStream = fs.createWriteStream("video.mp4");
      response.data.pipe(fileStream);

      fileStream.on('finish', () => {
        zk.sendMessage(origineMessage, {
          video: { url: "video.mp4" },
          caption: "*𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀*",
          gifPlayback: false
        }, { quoted: commandeOptions.ms });
      });

      fileStream.on('error', (error) => {
        console.error('Error writing video file:', error);
        repondre('An error occurred while writing the video file.');
      });
    } else {
      repondre('No video found');
    }
  } catch (error) {
    console.error('Error during search or video download:', error);
    repondre('An error occurred during the search or video download.');
  }
});

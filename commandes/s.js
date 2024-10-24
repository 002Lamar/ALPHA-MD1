const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const axios = require("axios");

zokou({
  nomCom: "playy",
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
    const video = results.videos[0]; // Get the first video from the results

    if (video && video.url) {
      const songDetails = {
        image: { url: video.thumbnail },
        caption: `\n*Song Name:* _${video.title}_\n*Duration:* _${video.timestamp}_\n*Url:* _${video.url}_\n\n*Downloading...*`
      };

      await zk.sendMessage(origineMessage, songDetails, { quoted: commandeOptions.ms });

      const response = await axios.get(`https://widipe.com/download/ytdl?url=${video.url}`);
      const data = response.data;

      if (data && data.result && data.result.mp3 && data.result.title) {
        await zk.sendMessage(origineMessage, {
          document: { url: data.result.mp3 },
          mimetype: "audio/mp3",
          fileName: `${data.result.title}.mp3`
        }, { quoted: commandeOptions.ms });
      } else {
        repondre("Download failed: No valid data found.");
      }
    } else {
      repondre("No video found.");
    }
  } catch (error) {
    console.error("Error during search or download:", error);
    repondre("Download failed.");
  }
});

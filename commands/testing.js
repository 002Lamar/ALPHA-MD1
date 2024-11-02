const { zokou } = require("../framework/zokou");
const yts = require("yt-search");

zokou({
  nomCom: "testing",
  categorie: "Download",
  reaction: '🦄'
}, async (chatId, client, messageData) => {
  const { ms, repondre, arg } = messageData;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const audioResults = await yts(searchQuery);

    if (audioResults && audioResults.videos.length > 0) {
      const audioUrl = audioResults.videos[0].url;
      const response = await fetch(`https://api.ibrahimadams.us.kg/api/download/ytmp3?url=${encodeURIComponent(audioUrl)}&apikey=cracker`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;

        const messageData = {
          image: { url: audioResults.videos[0].thumbnail },
          caption: `*ALPHA SONG PLAYER*\njoin for more track of the song
https://t.me/keithmd
╭───────────────◆
│ *Duration:* ${audioResults.videos[0].timestamp}
│ *Artist:* ${audioResults.videos[0].author.name}
╰────────────────◆`
        };

        await client.sendMessage(chatId, { text: "*Downloading wait*" }, { quoted: ms });
let downloadedLength = 0;
        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { audio: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: ms });

         await client.sendMessage(chatId, { document: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: ms });
        repondre(` * ${jsonResponse.result.title}*\n\n*Downloaded successfully. Keep using Alpha md*`);
      } else {
        repondre("Failed to download audio. Please try again later.");
      }
    } else {
      repondre("No audio found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    repondre("An error occurred while searching or downloading the audio.");
  }
});

zokou({
  nomCom: "vid",
  categorie: "Search",
  reaction: '🎥'
}, async (chatId, client, messageData) => {
  const { ms, repondre, arg } = messageData;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const videoResults = await yts(searchQuery);

    if (videoResults && videoResults.videos.length > 0) {
      const videoUrl = videoResults.videos[0].url;
      const response = await fetch(`https://api.ibrahimadams.us.kg/api/download/ytmp4?url=${encodeURIComponent(audioUrl)}&apikey=cracker`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;

        const messageData = {
          image: { url: videoResults.videos[0].thumbnail },
          caption: `*ALPHA-MD VIDEO PLAYER*\n
╭───────────────◆
│ *Duration:* ${videoResults.videos[0].timestamp}
│ *Artist:* ${videoResults.videos[0].author.name}
╰────────────────◆`
        };

        await client.sendMessage(chatId, { text: "*𝘿𝙤 𝙬𝙣𝙡𝙤𝙖𝙙𝙞𝙣𝙜  𝙬𝙖𝙞𝙩*" }, { quoted: ms });
let downloadedLength = 0;
        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: ms });

        await client.sendMessage(chatId, { document: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: ms }); 
        repondre(` * ${jsonResponse.result.title}*\n\n*Downloaded successfully. Keep using Alpha md*`);
      } else {
        repondre("Failed to download audio. Please try again later.");
      }
    } else {
      repondre("No audio found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    repondre("Wait Alpha is getting your file");
  }
});




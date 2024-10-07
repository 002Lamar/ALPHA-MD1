const axios = require("axios");
const { zokou } = require('../framework/zokou');
const { format } = require('../framework/mesfonctions');
const os = require('os');
const moment = require("moment-timezone");
const s = require("../set");

// Style mapping
const styles = {
  "0xa": {
    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
    "a": "𝚫", "b": "𝚩", "c": "𝐂", "d": "𝐃", "e": "𝚵", "f": "𝐅", "g": "𝐆", "h": "𝚮", "i": "𝚰",
    "j": "𝐉", "k": "𝐊", "l": "𝐋", "m": "𝚳", "n": "𝚴", "o": "𝚯", "p": "𝚸", "q": "𝐐", "r": "𝚪",
    "s": "𝐒", "t": "𝚻", "u": "𝐔", "v": "𝛁", "w": "𝐖", "x": "𝚾", "y": "𝐘", "z": "𝚭",
    "A": "𝚫", "B": "𝚩", "C": "𝐂", "D": "𝐃", "E": "𝚵", "F": "𝐅", "G": "𝐆", "H": "𝚮", "I": "𝚰",
    "J": "𝐉", "K": "𝐊", "L": "𝐋", "M": "𝚳", "N": "𝚴", "O": "𝚯", "P": "𝚸", "Q": "𝐐", "R": "𝚪",
    "S": "𝐒", "T": "𝚻", "U": "𝐔", "V": "𝛁", "W": "𝐖", "X": "𝚾", "Y": "𝐘", "Z": "𝚭"
  }
};

// Apply style to text
const applyStyle = (text, styleId) => {
  const style = styles[styleId];
  return text.split('').map(char => style[char] || char).join('');
};

// Get runtime in a readable format
const runtime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days ? `${days} ${days === 1 ? "day" : "days"}, ` : ''}${hours ? `${hours} ${hours === 1 ? "hour" : "hours"}, ` : ''}${minutes ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}, ` : ''}${secs ? `${secs} ${secs === 1 ? "second" : "seconds"}` : ''}`;
};

// Fetch GitHub stats
const fetchGitHubStats = async () => {
  try {
    const response = await axios.get("https://api.github.com/repos/Keithkeizzah/ALPHA-MD1");
    const { forks_count, stargazers_count } = response.data;
    const totalUsers = (forks_count + stargazers_count) * 2; // Adjusted for clarity
    return { forks: forks_count, stars: stargazers_count, totalUsers };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { forks: 0, stars: 0, totalUsers: 0 };
  }
};

// Main function for the "menu" command
zokou({
  nomCom: "list",
  categorie: "General"
}, async (message, respond, config) => {
  const { ms, repondre, prefixe, nomAuteurMessage } = config;
  const { cm } = require('../framework/zokou');

  // Prepare command categories
  const commandCategories = {};
  const mode = s.MODE.toLowerCase() === "public" ? 'Public' : 'Private';

  cm.forEach(command => {
    const category = command.categorie.toUpperCase();
    commandCategories[category] = commandCategories[category] || [];
    commandCategories[category].push(command.nomCom.toUpperCase());
  });

  // Get current time and date
  moment.tz.setDefault(s.TZ);
  const time = moment().format('HH:mm:ss');
  const date = moment().format("DD/MM/YYYY");
  const hour = moment().hour();
  
  const greetings = ["Good Night", "Good Morning", "Good Afternoon", "Good Evening"];
  const greeting = greetings[Math.min(3, Math.floor(hour / 6))];

  // Fetch GitHub stats
  const { totalUsers } = await fetchGitHubStats();
  const totalUsersFormatted = totalUsers.toLocaleString();

  // Create the message header
  let messageText = `
*${greeting} ${nomAuteurMessage}*

╭━━━ 〔 ${s.BOT} 〕━━━━┈⊷
┃✵╭──────────────
┃✵│▸ *BOT-OWNER* : ${s.OWNER_NAME}
┃✵│▸ *COMMANDER* : ${nomAuteurMessage}
│✰╰──────────────★
┃✵│▸ *TODAY* : ${date}
┃✵│▸ *TIME* : ${time}
┃✵│▸ *PREFIX* : ${s.PREFIXE}
┃✵│▸ *TOTAL USERS* : ${totalUsersFormatted}
┃✵│▸ *WORKTYPE* : ${mode} mode
┃✵│▸ *PLUGINS* : ${cm.length}
┃✵│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃✵│▸ *RUNNING ON* : ${os.platform()}
┃✵│▸ *UPTIME* : ${runtime(process.uptime())}
┃✵│▸ *THEME* : *𝐊𝐄𝐈𝐓𝐇*
┃✵╰──────────────
╰━━━━━━━━━━━━━━━━━┈⊷
> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐊𝐄𝐈𝐓𝐇
${String.fromCharCode(0x200e).repeat(0xfa1)}

*IN HONOR OF ALPHA GOD*
  `;

  // Append commands
  const sortedCategories = Object.keys(commandCategories).sort();
  let commandList = "";
  let commandNumber = 1;

  for (const category of sortedCategories) {
    commandList += `\n*╭──────「 ${applyStyle(category, 0xa)} 」─────┈⊷*\n│╭─────────────┈⊷`;
    commandCategories[category].forEach(command => {
      commandList += ` \n││◦➛  ${commandNumber++}. ${applyStyle(command, 0xa)}`;
    });
    commandList += "\n│╰────────────┈⊷\n╰────────────┈⊷\n";
  }

  messageText += commandList;

  // Send message
  try {
    await respond.sendMessage(message, {
      text: messageText,
      contextInfo: {
        mentionedJid: [nomAuteurMessage],
        externalAdReply: {
          title: "ALPHA MD",
          body: "POWERED BY KEITHKEIZZAH",
          thumbnailUrl: "https://telegra.ph/file/967c663a5978c545f78d6.jpg",
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } catch (error) {
    console.error("Error sending message:", error);
    respond("Error sending message: " + error);
  }
});

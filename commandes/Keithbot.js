"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "keith", reaction: "📷", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '```𝐓𝐡𝐚𝐭 𝐢𝐬 𝐦𝐲 𝐨𝐰𝐧𝐞𝐫 𝐧𝐚𝐦𝐞 𝐛𝐫𝐨/𝐬𝐢𝐳! 𝐰𝐡𝐢𝐜𝐡𝐞𝐯𝐞𝐫 𝐛𝐮𝐝𝐝𝐢𝐞😉𝐣𝐮𝐬𝐭 𝐟𝐨𝐥𝐥𝐨𝐰 𝐦𝐲 𝐦𝐚𝐬𝐭𝐞𝐫 𝐜𝐡𝐚𝐧𝐧𝐞𝐥 𝐚𝐧𝐝 𝐬𝐡𝐚𝐫𝐞 𝐧𝐨𝐰 𝐢𝐟 𝐲𝐨𝐮 𝐫𝐞𝐚𝐥𝐥𝐲 𝐥𝐢𝐤𝐞 𝐡𝐢𝐬 𝐡𝐚𝐧𝐝𝐰𝐨𝐫𝐤```\n\n ' + "*https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47*";
    let d = ' #𝐌𝐚𝐤𝐞 𝐬𝐮𝐫𝐞 𝐲𝐨𝐮 𝐟𝐨𝐥𝐥𝐨𝐰😜';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/ac64eb9543937fe3baaf3.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *FLASH-MD* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *France King*'
      let varmess=z+d
      var img='https://telegra.ph/file/13d63c21c1a665bfd8324.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 

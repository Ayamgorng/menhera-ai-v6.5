const yts = require('yt-search'); // 
let handler = async (m, { q,setReply, command, args, usedPrefix, reply }) => {
  
    if (!q) {
        return m.reply(`Command : ${command}\n🧩 Category : Search\n🛠 ️Usage : ${usedPrefix + command} [judul lagu]\n\n📚 Description : Mengirimkan hasil pencarian lagu di YouTube.`);
    }

    
    if (!args.join(" ")) {
        return m.reply(`Contoh : ${usedPrefix + command} Back in Black`);
    }

    try {
       
        let search = await yts(q);
        let teskd = `📂 YouTube Search\n🎵 Hasil dari: *${args.join(" ")}*\n\n`;
        
        
        for (let i of search.all) {
            teskd += `*Title:* ${i.title}\n*Author:* ${i.author.name}\n*Url:* ${i.url}\n\n`;
            teskd += `\n________________________________\n`;
        }

        
        reply(teskd);

    } catch (error) {
        console.error("Terjadi kesalahan saat mencari di YouTube:", error);
        m.reply("Maaf, terjadi kesalahan saat melakukan pencarian.");
    }
};

handler.help = ["ytsearch"];
handler.tags = ["search"];
handler.command = ["ytsearch", "yts"]; 
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["search YouTube "]

module.exports = handler;

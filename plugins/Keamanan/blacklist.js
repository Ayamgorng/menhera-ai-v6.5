/* 
  ────────「 *RANGELOFFICIAL* 」──────── 
  Powered by *EhanzDhoanx* × *MENHERA MD* 
  Copyright © Raihan Fadillah 
  Instagram: @ehanzdhonax 
  Yt : https://www.youtube.com/@rangelbot
  
  ⚠️ *Jangan hapus watermark ini!* 
  Dukunganmu sangat berarti untuk kami! 
  ──────────────────────────────── 
*/

let handler = async (m, { command, usedPrefix, text, participants }) => {
    const db = global.db.data;
    const chat = db.chats[m.chat];

    if (!chat) {  
        db.chats[m.chat] = {
            name: m.groupName,
            id: m.chat,
            blacklist: ""
        };
    }
    let targetNumber;
    if (m.quoted) {     
        targetNumber = m.quoted.sender.split("@")[0];
    } else if (text.startsWith("@")) {
    const match = text.match(/@(\d+)/);
    targetNumber = match ? match[1] + "@s.whatsapp.net" : "";
} else {       
        targetNumber = text.split(" ")[1];
    }

    let action = text.split(" ")[0]; 
    if (!action) return m.reply(`Gunakan perintah berikut:\n${usedPrefix + command} <add|remove|list> <nomor/tag/reply>\n\nContoh:\n${usedPrefix + command} add 6281234567890\n${usedPrefix + command} add @tag_user\n${usedPrefix + command} add (dengan reply pesan)`);
    if (action === "add") {
if (!targetNumber) return m.reply("Nomor tidak valid atau tidak ditemukan!");
        targetNumber += "@s.whatsapp.net"; 
         if (chat.blacklist.includes(targetNumber)) return m.reply(`Nomor ${targetNumber} sudah ada di blacklist.`);
        chat.blacklist = chat.blacklist ? chat.blacklist + `, ${targetNumber}` : targetNumber;
        return m.reply(`Nomor ${targetNumber} berhasil ditambahkan ke blacklist.`);
    }  
    if (action === "remove") {
        if (!targetNumber) return m.reply("Nomor tidak valid atau tidak ditemukan!");
        targetNumber += "@s.whatsapp.net"; 
if (!chat.blacklist.includes(targetNumber)) return m.reply(`Nomor ${targetNumber} tidak ditemukan di blacklist.`);
        let blacklistArray = chat.blacklist.split(", ").filter(n => n !== targetNumber);
        chat.blacklist = blacklistArray.join(", ");
        return m.reply(`Nomor ${targetNumber} berhasil dihapus dari blacklist.`);
    }  
    if (action === "list") {
        if (!chat.blacklist) return m.reply(`Blacklist kosong untuk grup ini.`);
        return m.reply(`Blacklist untuk grup *${chat.name}*:\n\n${chat.blacklist.split(", ").join("\n")}`);
    } 
    return m.reply(`Perintah tidak valid. Gunakan:\n${usedPrefix + command} <add|remove|list> <nomor/tag/reply>`);
};

handler.help = ['blacklist'];
handler.tags = ['group'];
handler.command = /^blacklist$/i;
handler.onlyGroup = true; 
handler.admin = true;
handler.description = ['hapus otomatis pesan user member']
module.exports = handler;
   
    
  
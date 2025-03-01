const fs = require('fs');

let handler = async (m, { hanz, setReply }) => {
   
    const userResPanel = JSON.parse(fs.readFileSync("./database/reselerpanel.json"));

  
    const isResPanel = userResPanel.includes(m.sender.replace('@s.whatsapp.net', ''));

    let teks = "*📋 Daftar Reseller Panel 📋*\n\n";

    if (userResPanel.length === 0) {
        teks += "Tidak ada reseller yang terdaftar saat ini.";
    } else {
        teks += "*✨ Daftar Reseller:* \n\n";
        for (const x of userResPanel) {
            teks += `🔹 @${x}\n`; 
        }
    }

    teks += `\n*🔍 Total Reseller:* ${userResPanel.length}\n`;
    teks += "*📌 Terima kasih telah bergabung dengan kami! 🎉*"; 
    setReply(teks);
};


handler.help = ['listreselerpanel'];
handler.tags = ['admin'];
handler.command = /^(listreselerpanel)$/i; 
handler.owner = true;  

module.exports = handler;

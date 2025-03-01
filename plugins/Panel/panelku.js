

const fs = require('fs');
const path = './database/datapanel.json';

const handler = async (m, { text, sendReact, setReply, hanz }) => {
   
    const cleanNumber = (number) => {
        return number.replace(/[^\d]/g, ''); 
    };

   
    let dataBuyPanel;
    try {
        dataBuyPanel = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (error) {
        return setReply("Terjadi kesalahan saat membaca file data panel. Pastikan format JSON benar.");
    }

  
    let cleanSenderNumber = cleanNumber(m.sender); 
    let userPanels = dataBuyPanel.filter(panel => cleanNumber(panel.number) === cleanSenderNumber); 

    if (userPanels.length === 0) {
        return setReply("Data panel Anda tidak ditemukan. Pastikan Anda telah melakukan pembelian panel dengan nomor yang terdaftar.");
    }
m.reply('data akan kami kirim ke private chat')
   
    let ctf = `📝 *Informasi Panel Anda*:\n`;
    userPanels.forEach((userPanel, index) => {
        ctf += `\nPanel ${index + 1}:
⩼ *Nama Pembeli:* ${userPanel.buyer_name}
⩼ *Nomor Pembeli:* ${userPanel.number}
⩼ *Tanggal Pembelian:* ${userPanel.date}
⩼ *Masa Berlaku Hingga:* ${userPanel.expired}

🔑 *Akun Rangelofficial:*
⩼ *Username:* ${userPanel.data.nama}
⩼ *Password:* ${userPanel.data.password}
⩼ *Login Panel:* ${userPanel.data.loginpanel}

📢 *Informasi Penting:* 
• Data Anda akan dikirimkan hanya sekali. Jika lupa, Anda bisa mengetik *panelku* untuk melihatnya lagi.\n`;
    });

   
    await hanz.sendMessage(m.sender, { text: ctf });
};

handler.command = ['panelku'];
handler.help = ['panelku'];
handler.tags = ['user'];
handler.cmdStore = true
handler.description = ["melihat data panel anda"]
module.exports = handler;
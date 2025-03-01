const fs = require('fs');
const path = './database/datapanel.json';

let handler = async (m, { command, text, hanz }) => {
   
    if (!fs.existsSync(path)) {
        m.reply("❌ Data panel tidak ditemukan!");
        return;
    }

    let dataBuyPanel;
    try {
        
        dataBuyPanel = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (error) {
        console.error("❌ Kesalahan saat membaca file data panel:", error);
        m.reply("❌ Terjadi kesalahan saat membaca data panel!");
        return;
    }

   
    if (!dataBuyPanel || dataBuyPanel.length === 0) {
        m.reply("❌ Tidak ada data pembeli panel untuk broadcast.");
        return;
    }


    const uniqueNumbers = [...new Set(dataBuyPanel.map(buyer => buyer.number))];

   
    if (!text) {
        m.reply("❌ Mohon sertakan pesan untuk broadcast!\n\nContoh:\n.broadcastbuyerpanel Halo pembeli, cek panel Anda segera.");
        return;
    }

 m.reply('broadcast ke buyer panel sedang berjalan')
         
    let successCount = 0, failedCount = 0;
    for (let number of uniqueNumbers) {
        try {
           
            let textBc = `
*「 📢 BROADCAST BUYER PANEL 」*

━━━━━━━━━━━━━━━━━━━
📋 *Pesan dari Owner:*
"${text}"
━━━━━━━━━━━━━━━━━━━

📌 *Informasi Penting:*  
- Pastikan panel Anda aktif dan berjalan lancar.  
- Hubungi kami jika membutuhkan bantuan lebih lanjut.  

📅 *Tanggal Broadcast:* ${new Date().toLocaleDateString('id-ID')}
━━━━━━━━━━━━━━━━━━━

🙏 Terima kasih atas kepercayaan Anda.  
Salam hangat,  
*Rangelofficial Team*
`;

          
            await hanz.sendMessage(
                `${number}@s.whatsapp.net`,
                {
                    image: { url: 'https://files.catbox.moe/g1wrhi.jpeg' },
                    caption: textBc
                },{quoted:fcall}
            );
            successCount++;
        } catch (error) {
            console.error(`❌ Gagal mengirim pesan ke ${number}:`, error);
            failedCount++;
        }
    }

   
    m.reply(`✅ *Broadcast selesai!*\n\n- *Berhasil terkirim:* ${successCount}\n- *Gagal terkirim:* ${failedCount}`);
};

handler.command = ['broadcastbuyerpanel', 'bcbuyerpanel'];
handler.help = ['broadcastbuyerpanel <pesan>'];
handler.tags = ['panel']; 

module.exports = handler;
    

const fs = require('fs');

let handler = async (m, { setReply }) => {
    const path = './database/datapanel.json';

    
    let dataBuyPanel;
    try {
        dataBuyPanel = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (error) {
        return setReply("❌ *Terjadi kesalahan saat membaca file data panel.*\nPastikan file JSON ada dan formatnya benar.");
    }

   
    if (!dataBuyPanel || dataBuyPanel.length === 0) {
        return setReply("📂 *Belum ada pembeli panel yang terdaftar.*");
    }

   
    let list = `🛒 *DAFTAR PEMBELI PANEL*\n\n`;
    list += dataBuyPanel
        .map((buyer, index) => {
            return `*${index + 1}.*  
👤 *Nama:* ${buyer.buyer_name}  
📞 *Nomor:* ${buyer.number}  
💳 *Pembayaran:* ${buyer.payment}  
💾 *RAM:* ${buyer.data.ram}  
💰 *Harga:* ${buyer.data.harga}  
📅 *Tanggal Beli:* ${buyer.date}  
⏳ *Berlaku Hingga:* ${buyer.expired}  
🔑 *ID:* ${buyer.ID}`;
        })
        .join('\n\n'); 
    m.reply(list);
};

handler.help = ["listbuyerpanel"];
handler.tags = ["panel"];
handler.command = /^(listbuyerpanel)$/i;
handler.owner = true;

module.exports = handler;
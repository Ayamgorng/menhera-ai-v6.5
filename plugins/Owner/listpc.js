let handler = async (m, { hanz, store}) => {
    try {
        // Ambil daftar semua private chat
        let anulistp = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id);
        
        // Inisialisasi teks
        let teks = `📬 *Daftar Private Chat* 📬\n\n🌐 *Total*: ${anulistp.length} Chat\n\n`;

        for (let i of anulistp) {
            let nama = store.messages[i]?.array[0]?.pushName || 'Tidak diketahui';
            let sender = i;

            teks += `👤 *Nama*: ${nama}\n` +
                    `🔗 *User*: @${sender.split('@')[0]}\n` +
                    `💬 *Chat*: [Klik di sini](https://wa.me/${sender.split('@')[0]})\n\n` +
                    `──────────────────\n\n`;
        }

        // Kirim daftar private chat
        hanz.sendMessage(m.chat, { 
            text: teks, 
            mentions: anulistp.map(v => v.split('@')[0] + '@s.whatsapp.net') 
        }, { quoted: m });

    } catch (e) {
        console.error(e);
       // hanz.reply(from, 'Terjadi kesalahan saat memproses permintaan.', m);
    }
};

// Properti plugin
handler.help = ['listprivate'];
handler.tags = ['tools'];
handler.command = /^listpc$/i;
handler.owner = true;

module.exports = handler;

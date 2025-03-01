const fs = require('fs');

const handler = async (m, { hanz, args }) => {
    const path = './database/menfes.json';

    if (!fs.existsSync(path)) {
        return m.reply('❌ File data Menfess tidak ditemukan.');
    }

 
    let menfessData;
    try {
        menfessData = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (e) {
        return m.reply('❌ Gagal membaca data Menfess.');
    }

    if (Object.keys(menfessData).length === 0) {
        return m.reply('✔️ Tidak ada data Menfess yang perlu dihapus.');
    }

   
    if (args[0] !== 'confirm') {
        return m.reply(
            `⚠️ Apakah Anda yakin ingin menghapus semua data Menfess?\n\nKetik:\n*${args[0] || ''} clearmenfes confirm*\n\nUntuk mengonfirmasi penghapusan.`
        );
    }

    try {
        fs.writeFileSync(path, JSON.stringify({}, null, 2));
        m.reply('✔️ Semua data Menfess berhasil dihapus.');
    } catch (e) {
        console.error('Error menghapus data Menfess:', e);
        return m.reply('❌ Gagal menghapus data Menfess.');
    }
};

handler.command = /^(clearmenfes|hapusmenfes)$/i;
handler.owner = true; 
handler.tags = ['owner'];
handler.help = ['clearmenfes'];

module.exports = handler;
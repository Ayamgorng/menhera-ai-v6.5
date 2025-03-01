const fs = require('fs');

let handler = async (m, { hanz }) => {
    const MENFES_FILE = './database/menfes.json';

    if (!fs.existsSync(MENFES_FILE)) return m.reply('Tidak ada data Menfess.');
    const menfessData = JSON.parse(fs.readFileSync(MENFES_FILE));
    const keys = Object.keys(menfessData);

    if (keys.length === 0) return m.reply('Tidak ada Menfess yang aktif.');

    let listText = '📜 *Daftar Menfess Aktif:*\n\n';

    keys.forEach((id, index) => {
        const menfess = menfessData[id];
        listText += `*${index + 1}. ID:* ${id}\n`;
        listText += `   📬 *Dari:* ${menfess.dari}\n`;
        listText += `   📝 *Pesan:* ${menfess.pesan}\n`;
        if (menfess.mediaUrl) {
            listText += `   📎 *Media:* ${menfess.mediaUrl}\n`;
        }
        listText += `   🎯 *Ke:* ${menfess.penerima}\n`;
        listText += `   ✅ *Status:* ${menfess.status ? 'Selesai' : 'Belum Dibalas'}\n`;

        // Penanganan properti `balasan`
        if (Array.isArray(menfess.balasan) && menfess.balasan.length > 0) {
            // Jika `balasan` berupa array dengan isi
            listText += `   🔄 *Balasan:*\n`;
            menfess.balasan.forEach((reply, idx) => {
                listText += `       ${idx + 1}. "${reply.pesan}" (pada ${new Date(reply.waktu).toLocaleString()})\n`;
            });
        } else if (typeof menfess.balasan === 'string' && menfess.balasan.trim() !== '') {
            // Jika `balasan` berupa string yang tidak kosong
            listText += `   🔄 *Balasan:* "${menfess.balasan}"\n`;
        } else {
            // Jika tidak ada balasan
            listText += `   🔄 *Balasan:* Tidak ada balasan.\n`;
        }

        listText += '\n';
    });

    m.reply(listText);
};

handler.tags = ['fun'];
handler.help = ['listmenfess'];
handler.command = /^(listmenfess|listmenfes|menfesslist|menfeslist)$/i;
handler.owner = true;
handler.description = ['Melihat daftar Menfess aktif beserta status dan balasan'];

module.exports = handler;
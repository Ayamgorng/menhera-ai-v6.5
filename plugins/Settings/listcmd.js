let handler = async (m, { hanz }) => {
    // Memastikan sticker sudah terdefinisi
    if (!global.db.data.sticker) {
        return hanz.reply(m.chat, '✳️ Tidak ada data sticker yang ditemukan.', m);
    }

    // Membangun pesan daftar command
    let message = `
*DAFTAR CMD*

▢ *Info:* Jika dalam *tebal* itu diblokir

──────────────────
${Object.entries(global.db.data.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `(bloqueado) ${key}` : key} : ${value.text}`).join('\n')}

`.trim();

    // Mengambil semua mentionedJid
    let mentions = Object.values(global.db.data.sticker)
        .flatMap(x => x.mentionedJid || [])
        .filter(Boolean); // Hapus undefined jika ada

    // Mengirim pesan dengan mentions
    await hanz.reply(m.chat, message, m, {
        mentions: mentions
    });
}

// Metadata untuk handler
handler.help = ['listcmd'];
handler.tags = ['cmd'];
handler.command = ['listcmd'];

module.exports = handler;

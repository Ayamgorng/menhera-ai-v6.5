let handler = async (m, { hanz, text, usedPrefix, command }) => {
    // Memeriksa apakah ada pesan yang dibalas
    if (!m.quoted) return m.reply(`Balas stiker dengan perintah *${usedPrefix + command}*`);
    
    // Memeriksa apakah stiker memiliki SHA256 hash
    if (!m.quoted.fileSha256) return m.reply('SHA256 Hash Missing');
    
    // Memeriksa apakah teks input tersedia
    if (!text) return m.reply(`Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`);
    
    let sticker = global.db.data.users[m.sender].sticker || {}; // Inisialisasi jika belum ada
    let hash = m.quoted.fileSha256.toString('base64');
    
    // Memeriksa apakah stiker sudah ada di database
    if (sticker[hash]) return m.reply(`Sticker tersebut sudah ada di database dengan command ${sticker[hash].text}`);
    
    // Memeriksa apakah stiker terkunci
    if (sticker[hash] && sticker[hash].locked) return m.reply('Kamu tidak memiliki izin untuk mengubah perintah stiker ini');
    
    // Menyimpan stiker dengan informasi terkait
    sticker[hash] = {
        text,
        mentionedJid: m.mentionedJid,
        creator: m.sender,
        at: +new Date(),
        locked: false,
    };

    // Mengirim pesan bahwa perintah berhasil disimpan
    m.reply('Berhasil!');
};

// Menetapkan informasi tambahan untuk handler
handler.help = ['setcmd'];
handler.tags = ['database', 'premium'];
handler.command = /^setcmd|addcmd$/i;
handler.premium = true;

// Mengekspor handler sebagai modul CommonJS
module.exports = handler;
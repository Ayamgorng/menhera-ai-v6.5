let handler = async (m, { hanz, usedPrefix, text }) => {
   
    hanz.absen = hanz.absen ? hanz.absen : {};
    let id = m.chat;

   
    if (id in hanz.absen) {
        await hanz.reply(m.chat, `❗ *Masih ada absen berlangsung di grup ini!*\n\n*${usedPrefix}hapusabsen* - untuk menghapus absen`, m);
        return; 
    }

   
    hanz.absen[id] = [
        await hanz.reply(m.chat, `✅ *Berhasil memulai absen!*\n\n*${usedPrefix}absen* - untuk melakukan absen\n*${usedPrefix}cekabsen* - untuk mengecek daftar hadir\n*${usedPrefix}hapusabsen* - untuk menghapus data absen\n\n*Deskripsi:* ${text}`, m),
        [],
        text
    ];
}

handler.help = ['mulaiabsen [teks]'];
handler.tags = ['absen'];
handler.command = /^(start|mulai)absen$/i;
handler.onlyGroup = true; 
handler.admin = true; 

module.exports = handler;

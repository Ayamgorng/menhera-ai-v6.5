let handler = async (m, { hanz, usedPrefix }) => {
    let id = m.chat;
    hanz.absen = hanz.absen ? hanz.absen : {};

    
    if (!(id in hanz.absen)) {
        await hanz.reply(m.chat, `_*Tidak ada absen berlangsung di grup ini!*_\n\n*${usedPrefix}mulaiabsen* - untuk memulai absen`, m);
        return; 
    }

    delete hanz.absen[id];
    
    await hanz.reply(m.chat, `✅ *Berhasil!* Absen di grup ini telah dihapus.`, m);
}

handler.help = ['hapusabsen'];
handler.tags = ['absen'];
handler.command = /^(delete|hapus)absen$/i;
handler.onlyGroup = true;
handler.admin = true; 

module.exports = handler;


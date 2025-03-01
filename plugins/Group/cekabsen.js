
let handler = async (m, { hanz, prefix }) => {
    let id = m.chat;
    hanz.absen = hanz.absen ? hanz.absen : {};
   
    if (!(id in hanz.absen)) {
        await hanz.reply(m.chat, `_*Tidak ada absen berlangsung di grup ini!*_\n\n*${prefix}mulaiabsen* - untuk memulai absen`, m);
        return; 
    }

    let d = new Date();
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    let absen = hanz.absen[id][1];
    let list = absen.map((v, i) => `nih ${i + 1}.  @${v.split`@`[0]}`).join('\n'); 

    let caption = `* TANGGAL *\n${date}\n${hanz.absen[id][2]}\n\n* SUDAH ABSEN *\n*Total:* ${absen.length}\n\n${list}`; 
    
    await hanz.reply(m.chat, caption, m, { mentions: hanz.parseMention(caption) });
}

handler.help = ['cekabsen'];
handler.tags = ['absen'];
handler.command = /^cekabsen$/i;
handler.onlyGroup = true;
module.exports = handler;

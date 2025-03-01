
let handler = async (m, { hanz, usedPrefix, pushname }) => {
    let id = m.chat;
    hanz.absen = hanz.absen ? hanz.absen : {};
    if (!(id in hanz.absen)) {
        await hanz.reply(m.chat, `Tidak ada absen berlangsung!`, m);
        throw false; 
    }

    let absen = hanz.absen[id][1]; 
    if (absen.includes(m.sender)) throw 'Kamu sudah absen!'; 

    absen.push(m.sender);
    let d = new Date();
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

  
    let list = absen.map((v, i) => ` ${i + 1}.  @${v.split`@`[0]}`).join('\n');
    let caption = `* TANGGAL *\n${date}\n${hanz.absen[id][2]}\n\n*DAFTAR ABSEN*\n*Total:* ${absen.length}\n${list}`;

   
    await hanz.reply(m.chat, caption, m, { mentions: hanz.parseMention(caption) });
}

handler.help = ['absen'];
handler.tags = ['absen'];
handler.noCmdStroe = false 
handler.onlyGroup = true;
handler.command = /^(absen)$/i;

module.exports = handler;

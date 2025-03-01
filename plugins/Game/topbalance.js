let handler = async (m, { hanz }) => {
      let uang = Object.values(db.data.users);
    uang.sort((a, b) => (a.balance < b.balance) ? 1 : -1);
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ?  hanz.sendMessage(m.chat, { text: teks, mentions: memberr, contextInfo: { "mentionedJid": memberr }}):  

hanz.sendMessage(m.chat, {mentions: memberr,text: teks, contextInfo: { "mentionedJid": memberr }},{quoted: m})
}
    let top = '🏆 *「 TOP BALANCE GLOBAL 」* 🏆\n\n';
    var arrTop = [];
    var total = 15;
    
    // Jika jumlah pengguna lebih sedikit dari 15, tampilkan semua
    if (uang.length < 15) total = uang.length;

    // Looping untuk menambahkan top balance pengguna
    for (let i = 0; i < total; i++) {
        let positionEmoji = '';
        switch (i) {
            case 0: positionEmoji = '🥇'; break;
            case 1: positionEmoji = '🥈'; break;
            case 2: positionEmoji = '🥉'; break;
            default: positionEmoji = '⭐'; break;
        }

        // Menambahkan pengguna ke daftar dengan format menarik
        top += `${positionEmoji} *${i + 1}. wa.me/${uang[i].id.split("@")[0]}*\n💰 Balance: $${uang[i].balance.toLocaleString()}\n\n`;
        arrTop.push(uang[i].id);
    }

    // Menampilkan pesan dengan mention ke pengguna yang ada di daftar
    mentions(top, arrTop, true);
};

handler.help = ['topbalance', 'topglobal'];
handler.tags = ['info'];
handler.command = /^(topbalance|topglobal)$/i;
handler.noCmdStore = true
handler.onlyGroup = true
module.exports = handler;

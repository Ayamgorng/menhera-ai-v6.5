let handler = async (m, { hanz, groupMembers, onlyToko }) => {
    if (!m.isGroup) return onlyToko(); // Memastikan perintah hanya dijalankan di dalam grup

    // Mendapatkan daftar anggota grup
    let member = m.groupMembers.map(u => u.id);

    // Memilih dua anggota secara acak
    let orang = member[Math.floor(Math.random() * member.length)];
    let jodoh = member[Math.floor(Math.random() * member.length)];

    // Menghasilkan pesan untuk pasangan yang dipilih
    let jawab = `Ciee yang jadian ❤️ Jangan lupa pajak jadiannya yee

@${orang.split('@')[0]} ❤️ @${jodoh.split('@')[0]}`;
    
    // Mentions untuk kedua pasangan
    let menst = [orang, jodoh];

    // Mengirim pesan dengan mention ke pasangan yang dipilih
    hanz.sendMessage(m.chat, { text: jawab, mentions: menst }, { quoted: m });
};

handler.help = ["jadian"];
handler.tags = ["fun"];
handler.command = ["jadian"];

module.exports = handler;

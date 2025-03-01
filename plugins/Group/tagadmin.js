let handler = async (m, { hanz, participants, groupMetadata, onlyToko }) => {
    if (!m.isGroup) return onlyToko(); // Menampilkan pesan jika perintah tidak dijalankan di grup

    // Mendapatkan admin grup
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');

    // Mendapatkan owner grup
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

    // Menyusun teks untuk ditampilkan
    let text = `
*Group Admins:*
${listAdmin}
`.trim();

    // Mengirim pesan ke grup dengan mention untuk admin
    hanz.sendMessage(m.chat, { text: text, mentions: [...groupAdmins.map(v => v.id), owner] }, { quoted: m });
};

handler.help = ["tagadmin", "listadmin"];
handler.tags = ["group"];
handler.command = ["tagadmin", "listadmin"];

module.exports = handler;

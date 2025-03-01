let handler = async (m, { q, setReply, hanz, pushname, fkontak }) => {
    if (!m.isGroup) return setReply("Perintah ini hanya bisa digunakan di grup.");
    if (m.key.fromMe) return;
    if (!q) return setReply("Alasan afk apa?");

    let user = global.db.data.users[m.sender];
    
    // Set AFK status for the user
    user.afk = +new Date();
    user.afkReason = q;

    // Message to inform the group that the user is AFK
    let afkMessage = `🚨 *${m.pushname} sekarang dalam mode AFK!* 🚨\n` +
                     `🔹 *Alasan*: ${q || 'Tidak ada alasan khusus.'}\n` +
                     `⏳ *Kamu akan dianggap AFK hingga kembali aktif.*`;

    // Send the AFK message
    await hanz.sendMessage(m.chat, { text: afkMessage },{quoted:m});
};

handler.help = ["afk"];
handler.tags = ["group"];
handler.command = ["afk"];  // Command for activating AFK

module.exports = handler;


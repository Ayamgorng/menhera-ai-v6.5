let handler = async (m, { q, prefix, command, reply, hanz }) => {
    if (!q) {
        return reply(`Please include a text or link\n\nFor Example:\n*${prefix + command}* wa.me://6282316643491`);
    }

    m.reply('Generating QR Code...');
    
    // Membuat URL QR Code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(q)}`;

    // Mengirimkan gambar QR Code
    try {
        await hanz.sendMessage(m.chat, {
            image: { url: qrUrl },
            caption: 'QR Code generated successfully',
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        reply('Failed to generate QR Code. ❌');
    }
};

handler.help = ["toqr"];
handler.tags = ["tools"];
handler.command = ["toqr"]; // Alias command untuk membuat QR Code

module.exports = handler;
 
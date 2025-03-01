// getppgc.js

let handler = async (m, { hanz, onlyToko, setReply }) => {
    if (!m.isGroup) return onlyToko();

    try {
        // Mengambil foto profil grup
        let ppimg = await hanz.profilePictureUrl(m.chat);
        
        // Jika terjadi error, menggunakan gambar default
        if (!ppimg) {
            ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg';
        }
        
        // Mengirim foto profil grup
        await hanz.sendMessage(m.chat, { image: { url: ppimg }, caption: "Ini adalah foto profil grup." });
    } catch (err) {
        console.log(err);
        setReply("Terjadi kesalahan saat mengambil foto profil grup.");
    }
};

handler.help = ["getppgc"];
handler.tags = ["group"];
handler.command = ["getppgc"];

module.exports = handler;

const fetch = require('node-fetch');

const handler = async (m, { args, setReply,isResPanel }) => {
    
   // if (!isResPanel) return setReply(mess.resPanel)
    // Ambil ID server dari argumen
    let srv = args[0];
    
    // Memastikan ID server telah diberikan
    if (!srv) return setReply('ID server mana yang ingin dihapus?');

    try {
        // Mengirim permintaan DELETE ke API untuk menghapus server
        let f = await fetch(`${domain}/api/application/servers/${srv}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta,
            }
        });

        // Mengecek apakah respons dari server berhasil
        let res = f.ok ? { errors: null } : await f.json();

        // Menangani jika server tidak ditemukan
        if (res.errors) {
            return setReply('*SERVER TIDAK DITEMUKAN*');
        }

        // Mengirimkan pesan sukses jika server berhasil dihapus
        return setReply('*SERVER BERHASIL DIHAPUS*');
    } catch (error) {
        console.error(error);
        // Mengirim pesan jika terjadi kesalahan saat menghapus server
        return setReply('Terjadi kesalahan saat mencoba menghapus server. Silakan coba lagi nanti.');
    }
};

// Daftar command dan pengaturan plugin
handler.command = ['delserver','delsrv'];
handler.help = ['delserver <ID>'];
handler.tags = ['server'];
handler.selerpanel = true;

module.exports = handler;

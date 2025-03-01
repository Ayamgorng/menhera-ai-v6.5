const fetch = require('node-fetch');

const handler = async (m, { args, setReply,isResPanel }) => {
    
    //if (!isResPanel) return setReply(mess.resPanel)
    // Mengambil ID pengguna dari argumen
    let usr = args[0];

    // Memastikan ID pengguna telah diberikan
    if (!usr) return setReply('🔍 Silakan berikan ID pengguna yang ingin dihapus.');

    try {
        // Menghapus pengguna dari API
        let f = await fetch(`${domain}/api/application/users/${usr}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            }
        });

        // Memeriksa respons dari API
        let res = f.ok ? { errors: null } : await f.json();

        // Memeriksa apakah ada kesalahan, seperti pengguna tidak ditemukan
        if (res.errors) return setReply('*USER TIDAK DITEMUKAN*');

        // Mengirimkan pesan sukses
        setReply('*BERHASIL MENGHAPUS PENGGUNA* ✅');
    } catch (error) {
        console.error(error);
        // Mengirim pesan jika terjadi kesalahan saat menghapus pengguna
        setReply('❌ Terjadi kesalahan saat menghapus pengguna. Silakan coba lagi nanti.');
    }
};

// Daftar command dan pengaturan plugin
handler.command = ['delusr'];
handler.help = ['deleteuser <ID>'];
handler.tags = ['user'];
handler.selerpanel = true;

module.exports = handler;

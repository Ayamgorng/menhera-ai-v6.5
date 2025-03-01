const fetch = require('node-fetch');

const handler = async (m, { args, prefix, hanz,setReply,isResPanel }) => {
    
    if (!isResPanel) return setReply(mess.resPanel)
    let page = args[0] ? args[0] : '1';

    try {
        // Mengambil daftar server dari API
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            }
        });

        let res = await f.json();
        let servers = res.data;
        let messageText = "Berikut adalah daftar server:\n\n";

        // Memeriksa apakah ada server
        if (servers.length === 0) {
            return m.reply("Tidak ada server ditemukan.");
        }

        for (let server of servers) {
            let s = server.attributes;

            // Mengambil status server
            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split`-`[0]}/resources`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apiPltc
                }
            });

            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            // Menambahkan informasi server ke pesan
            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        // Menambahkan informasi pagination ke pesan
        messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Server: ${res.meta.pagination.count}`;

        // Mengirimkan pesan ke pengguna
        //await hanz.sendMessage(m.chat, { text: messageText }, { quoted: m });
setReply(messageText)
        // Pemberitahuan untuk halaman berikutnya jika ada
        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
            m.reply(`Gunakan perintah .listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
        }
    } catch (error) {
        console.error(error);
        m.reply("Terjadi kesalahan saat mengambil data server. Silakan coba lagi nanti.");
    }
};

// Daftar command dan pengaturan plugin
handler.command = ['listsrv'];
handler.help = ['listsrv [page]'];
handler.tags = ['server'];
handler.limit = false;

module.exports = handler;

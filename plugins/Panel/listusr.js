const fetch = require('node-fetch');

const handler = async (m, { args, prefix, setReply,isResPanel}) => {
    
    if (!isResPanel) return setReply(mess.resPanel)
   
    let page = args[0] ? args[0] : '1';

    try {
      
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            }
        });

        let res = await f.json();
        let users = res.data;

       
        if (users.length === 0) {
            return m.reply("Tidak ada pengguna ditemukan.");
        }

       
        let messageText = "🌟 *Berikut adalah daftar pengguna:* 🌟\n\n";
        
        for (let user of users) {
            let u = user.attributes;
            let status = u.attributes?.user?.server_limit === null ? '🔴 Tidak Aktif' : '🟢 Aktif';

            messageText += `*ID:* ${u.id}\n`;
            messageText += `*Username:* ${u.username}\n`;
            messageText += `*Nama:* ${u.first_name} ${u.last_name}\n`;
            messageText += `*Status:* ${status}\n\n`;
        }

        
        messageText += `📄 *Halaman:* ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `👥 *Total Pengguna:* ${res.meta.pagination.count}`;

 let teksCuy = messageText
       // await conn.sendMessage(m.chat, { text: messageText }, { quoted: m });
setReply(teksCuy)
       
        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
            m.reply(`🔍 Gunakan perintah .listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
        }    
    } catch (error) {
        console.error(error);
      
        m.reply('Terjadi kesalahan saat mengambil daftar pengguna. Silakan coba lagi nanti.');
    }
};


handler.command = ['listusr'];
handler.help = ['listusr [page]'];
handler.tags = ['user'];
handler.limit = false;

module.exports = handler;

const fetch = require('node-fetch');

const handler = async (m, { args, setReply,isResPanel }) => {
    
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
        let messageText = "👮‍♂️ *DAFTAR ADMIN* 👮‍♂️\n\n";

       
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🌟 *ID*: ${u.id} - *Status*: ${u.attributes?.user?.server_limit === null ? 'Tidak Aktif' : 'Aktif'}\n`;
                messageText += `👤 *Username*: ${u.username}\n`;
                messageText += `📛 *Nama*: ${u.first_name} ${u.last_name}\n\n`;
            }
        }

       
        messageText += `📄 *Halaman*: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `🔢 *Total Admin*: ${res.meta.pagination.count}`;
let teksNy = Ehztext(messageText)
      
setReply(teksNy)
        
        if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
     
            
 setReply(`🔄 Gunakan perintah .listadmin ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
        }
    } catch (error) {
        console.error(error);
       
        setReply('❌ Terjadi kesalahan saat mengambil daftar admin. Silakan coba lagi nanti.');
    }
};


handler.command = ['listadminpanel'];
handler.help = ['listadmin <halaman>'];
handler.tags = ['admin'];
handler.limit = false;

module.exports = handler;

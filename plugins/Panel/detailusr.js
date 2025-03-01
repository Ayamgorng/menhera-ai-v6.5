const fetch = require('node-fetch');

const handler = async (m, { args, setReply,isResPanel }) => {
    
 
    let usr = args[0];


    if (!usr) return setReply('Silakan berikan ID pengguna yang ingin dilihat.');

    try {
     
        let f = await fetch(`${domain}/api/application/users/${usr}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            }
        });

      
        let res = await f.json();

 
        if (res.errors) return setReply('*USER TIDAK DITEMUKAN*');


        let u = res.attributes;

    
        let messageText = `✨ *DETAIL PENGGUNA ${u.username.toUpperCase()}* ✨\n\n`;
        messageText += `\`\`\`ID: ${u.id}\n`;
        messageText += `UUID: ${u.uuid}\n`;
        messageText += `USERNAME: ${u.username}\n`;
        messageText += `EMAIL: ${u.email}\n`;
        messageText += `NAMA: ${u.first_name} ${u.last_name}\n`;
        messageText += `BAHASA: ${u.language}\n`;
        messageText += `ADMIN: ${u.root_admin ? '✅ Ya' : '❌ Tidak'}\n`;
        messageText += `DIBUAT PADA: ${u.created_at}\`\`\``;

   
        setReply(messageText);
    } catch (error) {
        console.error(error);
      
        setReply('Terjadi kesalahan saat mengambil detail pengguna. Silakan coba lagi nanti.');
    }
};


handler.command = ['detailusr'];
handler.help = ['userdetail <ID>'];
handler.tags = ['user'];
handler.selerpanel = true;

module.exports = handler;

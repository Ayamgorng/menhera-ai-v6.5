const fetch = require('node-fetch');

const handler = async (m, { text, setReply, hanz,isResPanel }) => {
    
    //if (!isResPanel) return setReply(mess.resPanel)
    let q = text.split(',');
    let email = q[0];
    let username = q[0];
    let nomor = q[1];

    // Memeriksa format input
    if (q.length < 2) {
        return setReply(`*Format salah!*\nPenggunaan:\n.creatadmin user,nomer`);
    }
    if (!username) {
        return setReply(`Ex: .createadmin  username,@tag/nomor\n\nContoh:\n .createadmin example,@user`);
    }
    if (!nomor) {
        return setReply(`Ex: .createadmin Username,@tag/nomor\n\nContoh:\n.createadmin example,@user`);
    }

    // Membuat password dan nomor WhatsApp
    let password = username + "019";
    let nomornya = nomor.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

    // Mengirim permintaan untuk membuat pengguna baru
    let f = await fetch(`${domain}/api/application/users`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiPlta
        },
        body: JSON.stringify({
            email: `${username}@gmail.com`,
            username: username,
            first_name: username,
            last_name: "Memb",
            language: "en",
            root_admin: true,
            password: password.toString()
        })
    });

    // Mengambil data dari respons
    let data = await f.json();
    if (data.errors) {
        return setReply(JSON.stringify(data.errors[0], null, 2));
    }

    let user = data.attributes;

    // Membuat pesan detail pengguna
    let tks = `
🆕 *DETAIL AKUN ADMIN PANEL ANDA* 🆕

📡 ID: ${user.id}
🌷 UUID: ${user.uuid}
👤 USERNAME: ${user.username}
📬 EMAIL: ${user.email}
🦖 NAMA: ${user.first_name} ${user.last_name}
🔥 BAHASA: ${user.language}
📊 ADMIN: ${user.root_admin ? "Ya" : "Tidak"}
☢️ DIBUAT PADA: ${user.created_at}

🖥️ LOGIN: ${domain}
`;

    const listMessage = {
        text: tks,
    };

    // Mengirim pesan ke grup
    await hanz.sendMessage(m.chat, listMessage);

    // Mengirim pesan ke nomor WhatsApp
    await hanz.sendMessage(nomornya, {
        text: `*BERIKUT DETAIL AKUN ADMIN PANEL ANDA* 📄\n\n` +
              `👤 USERNAME: ${username}\n` +
              `🔑 PASSWORD: ${password}\n` +
              `🖥️ LOGIN: ${domain}\n\n` +
              `*NOTE:*\n` +
              `1. OWNER HANYA MENGIRIM 1X DATA AKUN ANDA. MOHON DI SIMPAN BAIK-BAIK. KALAU DATA AKUN ANDA HILANG, OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI.\n` +
              `2. GARANSI CUMA 1X. KLAIM GARANSI HARUS DISERTAI BUKTI PEMBELIAN.\n` +
              `3. JANGAN RUSUH SERVER LAIN.\n` +
              `4. CREATE PANEL SECUKUPNYA.\n`
    });
};

// Daftar command dan pengaturan plugin
handler.command = ['createadmin']; // Ganti dengan command yang sesuai
handler.help = ['createadmin user,nomor'];
handler.tags = ['admin'];
handler.selerpanel = true;

module.exports = handler;

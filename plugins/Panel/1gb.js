const fetch = require('node-fetch');
const fs = require('fs');
const path = './database/datapanel.json';

const handler = async (m, { text, sendReact, setReply, ucapanWaktu, hanz }) => {
    let t = text.split(',');
    if (t.length < 2) return setReply(`*Format salah!*\nPenggunaan:\n.1gb nama_pembeli,nomor_telepon`);
    sendReact('🔁');

    let username = t[0];
    let u = t[1] + '@s.whatsapp.net';
    let u1 = t[1];
    let name = username + " 1GB";
    let egg = global.eggs;
    let loc = global.location;
    let memo = "1024";
    let cpu = "50";
    let disk = "0";
    let email = `${username}505@gmail.com`;
    let akunlo = "https://raw.githubusercontent.com/Rangelofficial/Uploade-db/main/uploader/1736351669495.jpg";
    let password = username + "001";

    if (!u) return;

    try {
        let d = (await hanz.onWhatsApp(u.split`@`[0]))[0] || {};

        let f = await fetch(`${domain}/api/application/users`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            },
            body: JSON.stringify({
                email: email,
                username: username,
                first_name: username,
                last_name: username,
                language: "en",
                password: password
            })
        });

        let data = await f.json();
        if (data.errors) return setReply(JSON.stringify(data.errors[0], null, 2));
        let user = data.attributes;

        let f2 = await fetch(`${domain}/api/application/nests/5/eggs/${egg}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta
            }
        });

        let data2 = await f2.json();
        let startup_cmd = data2.attributes.startup;

        let f3 = await fetch(`${domain}/api/application/servers`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiPlta,
            },
            body: JSON.stringify({
                name: name,
                description: " ",
                user: user.id,
                egg: parseInt(egg),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: startup_cmd,
                environment: {
                    INST: "npm",
                    USER_UPLOAD: "0",
                    AUTO_UPDATE: "0",
                    CMD_RUN: "npm start"
                },
                limits: {
                    memory: memo,
                    swap: 0,
                    disk: disk,
                    io: 500,
                    cpu: cpu
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 1
                },
                deploy: {
                    locations: [parseInt(loc)],
                    dedicated_ip: false,
                    port_range: [],
                },
            })
        });

        let res = await f3.json();
        if (res.errors) return setReply(JSON.stringify(res.errors[0], null, 2));
        let server = res.attributes;

        // Baca data panel yang sudah ada
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([]));
        }

        let dataBuyPanel;
        try {
            dataBuyPanel = JSON.parse(fs.readFileSync(path, 'utf-8'));
        } catch (error) {
            return setReply("Terjadi kesalahan saat membaca file data panel. Pastikan format JSON benar.");
        }

        // Periksa apakah nama sudah terdaftar
        const buyerName = t[0].trim();
        const buyerNumber = t[1].trim();
        const isNameExist = dataBuyPanel.some((buyer) => buyer.buyer_name.toLowerCase() === buyerName.toLowerCase());
        if (isNameExist) {
            return setReply(`❌ Nama pembeli *${buyerName}* sudah terdaftar. Harap gunakan nama lain.`);
        }

        // Hitung tanggal expired
        const now = new Date();
        const expiredDate = new Date(now);
        expiredDate.setDate(now.getDate() + waktuPanel.onegb.waktu); // Berlaku waktunya yah

        // Buat data panel baru
        const belipanel = {
            ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
            date: now.toLocaleDateString("ID", { timeZone: "Asia/Jakarta" }),
            expired: expiredDate.toLocaleDateString("ID", { timeZone: "Asia/Jakarta" }),
            buyer_name: t[0],
            number: t[1],
            payment: "DANA",
            data: {
                nama: user.username,
                email: email,
                password: password,
                loginpanel: domain,
                ram: "1GB",
                harga: waktuPanel.onegb.harga
            }
        };

        // Tambahkan data baru ke dalam daftar panel
        dataBuyPanel.push(belipanel);

        // Simpan data pembeli ke file
        try {
            fs.writeFileSync(path, JSON.stringify(dataBuyPanel, null, 2));
        } catch (error) {
            return setReply("Terjadi kesalahan saat menyimpan data panel.");
        }

        // Kirim pesan sukses ke pembeli
       let ctf = `ʜᴀɪ ${belipanel.buyer_name}
sᴇʟᴀᴍᴀᴛ ᴀɴᴅᴀ ᴛᴇʟᴀʜ ᴛᴇʀᴅᴀғᴛᴀʀ ᴅɪ ᴘᴀɴᴇʟ ʀᴀɴɢᴇʟᴏғғɪᴄɪᴀʟ

📑 *ᴅᴇᴛᴀɪʟ ᴀᴋᴜɴ ᴀɴᴅᴀ*
⟢ *ᴜsᴇʀɴᴀᴍᴇ* : ${user.username}
⟢ *ᴘᴀssᴡᴏʀᴅ* : ${password}
⟢ *ʟᴏɢɪɴ ᴘᴀɴᴇʟ* ${domain}
⟢ *ᴛᴀɴɢɢᴀʟ ᴘᴇᴍʙᴇʟɪᴀɴ* : ${belipanel.date}
⟢ *ᴍᴀsᴀ ʙᴇʀʟᴀᴋᴜ ʜɪɴɢɢᴀ* : ${belipanel.expired}

⚠️ *ɪɴғᴏʀᴍᴀsɪ ᴘᴇɴᴛɪɴɢ*
Ⓘ ᴅᴀᴛᴀ ᴀᴋᴀɴ ᴅɪᴋɪʀɪᴍ ᴋᴀɴ ʜᴀɴʏᴀ sᴇᴋᴀʟɪ,ᴊɪᴋᴀ ᴀɴᴅᴀ ʟᴜᴘᴀ sɪʟᴀʜᴋᴀɴ ᴋᴇᴛɪᴋ *.ᴘᴀɴᴇʟᴋᴜ*
Ⓘ ᴅɪʟᴀʀᴀɴɢ ᴋᴇʀᴀs ᴍᴇɴɢɢᴜɴᴀᴋᴀɴ ᴘᴀɴᴇʟ ᴜɴᴛᴜᴋ ᴀᴋᴛɪᴠɪᴛᴀs ɪʟᴇɢᴀʟ sᴇᴘᴇʀᴛɪ ᴅᴅᴏs. ᴘᴇʟᴀɴɢɢᴀʀᴀɴ ᴀᴋᴀɴ ᴍᴇɴɢᴀᴋɪʙᴀᴛᴋᴀɴ ᴘᴇɴɢʜᴀᴘᴜsᴀɴ ᴀᴋᴜɴ ᴅᴀɴ sᴇʀᴠᴇʀ ᴛᴀɴᴘᴀ ᴘᴇᴍʙᴇʀɪᴛᴀʜᴜᴀɴ
Ⓘ ɪɴғᴏ sᴇʟᴇɴɢᴋᴀᴘɴʏᴀ: ${gcStore}

*ᴛᴇʀɪᴍᴀᴋᴀsɪʜ ᴛᴇʟᴀʜ ᴍᴇᴍᴘᴇʀᴄᴀʏᴀɪ ʀᴀɴɢᴇʟᴏғғɪᴄɪᴀʟ*`

        await hanz.sendMessage(u, { image: { url: akunlo }, caption: ctf });

        let teksSucces = `✅ *Proses berhasil! Akun telah dibuat.*
 Nama Pembeli: ${belipanel.buyer_name}
 Nomor Pembeli: ${belipanel.number}
 Tanggal Pembelian:  ${belipanel.date}
 Masa Berlaku Hingga: ${belipanel.expired}`;

        await hanz.sendMessage(m.chat, { text: teksSucces }, { quoted: m });

        // Menghapus data expired setelah waktu yang ditentukan
        setInterval(() => {
            let now = new Date();
            dataBuyPanel = dataBuyPanel.filter(buyer => {
                const expiredDate = new Date(buyer.expired);
                if (expiredDate < now) {
                    // Menghapus data yang sudah expired
                    console.log(`Data pembeli ${buyer.buyer_name} telah expired dan dihapus.`);
                    return false;
                }
                return true;
            });

            try {
                fs.writeFileSync(path, JSON.stringify(dataBuyPanel, null, 2));
            } catch (error) {
                console.error("Terjadi kesalahan saat menyimpan data panel setelah penghapusan:", error);
            }
        }, 24 * 60 * 60 * 1000); // Setiap 24 jam

    } catch (error) {
        console.error(error);
        setReply("Terjadi kesalahan, silakan coba lagi nanti.");
    }
};

handler.command = ['1gb'];
handler.help = ['createaccount nama,nomor'];
handler.tags = ['admin'];
handler.selerpanel = true
handler.cmdStore = true
handler.description = ["ram 1GB"]
module.exports = handler;
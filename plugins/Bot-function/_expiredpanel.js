const fs = require("fs");
const path = "./database/datapanel.json";

let handler = m => m;

handler.before = async function (m, { hanz }) {
    if (!fs.existsSync(path)) return;

    let dataBuyPanel;
    try {
        dataBuyPanel = JSON.parse(fs.readFileSync(path, "utf-8"));
    } catch (error) {
        console.error("❌ Kesalahan saat membaca file data panel:", error);
        return;
    }
    if (!dataBuyPanel || dataBuyPanel.length === 0) return;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const oneDayMs = 24 * 60 * 60 * 1000;
    let notifiedNumbers = new Set();
    let dataToRemove = [];
    for (let buyer of dataBuyPanel) {
        try {
            const expiredDateParts = buyer.expired.split("/");
            const expiredDate = new Date(
                expiredDateParts[2], // Tahun
                expiredDateParts[1] - 1, // Bulan (0-indexed)
                expiredDateParts[0] // Tanggal
            );
            if (isNaN(expiredDate.getTime())) {
                console.error(`❌ Tanggal expired pembeli tidak valid: ${buyer.expired}`);
                continue;
            }
            expiredDate.setHours(0, 0, 0, 0);
            const timeDiff = expiredDate - now;
            if (timeDiff > 0 && timeDiff <= oneDayMs && !buyer.notified && !notifiedNumbers.has(buyer.number)) {
 const teksPembeli = `🛑 *Info Panel* 🛑
Halo, *${buyer.buyer_name}*. Masa aktif panel Anda akan *berakhir besok* (${buyer.expired}).
🚨 Harap segera lakukan backup script Anda atau perpanjang masa aktif panel Anda. Setelah masa aktif habis, akses panel tidak dapat digunakan lagi.
👤 *Nama Pembeli:* ${buyer.buyer_name}
📞 *Nomor Pembeli:* ${buyer.number}
📅 *Tanggal Expired:* ${buyer.expired}
📧 *Email Pembeli:* ${buyer.data.email}
📞 Kontak kami jika ada pertanyaan lebih lanjut.
*Terima kasih atas kepercayaan Anda!*
_By Rangelofficial_`;

await hanz.sendMessage(`${buyer.number}@s.whatsapp.net`, { text: teksPembeli });
const teksOwner = `🛑 *Notifikasi Owner* 🛑
Halo Owner, masa aktif pembeli panel akan segera berakhir:
👤 *Nama Pembeli:* ${buyer.buyer_name}
📞 *Nomor Pembeli:* ${buyer.number}
📅 *Tanggal Expired:* ${buyer.expired}
📧 *Email Pembeli:* ${buyer.data.email}

Harap tindak lanjuti untuk mengingatkan pembeli atau menawarkan perpanjangan masa aktif.`;
                await hanz.sendMessage(`${ownerNumber}@s.whatsapp.net`, { text: teksOwner });
                buyer.notified = true; 
                notifiedNumbers.add(buyer.number); 
            }
            if (timeDiff < 0) {
                dataToRemove.push(buyer);
            }
        } catch (error) {
            console.error(`❌ Gagal memproses pembeli ${buyer.buyer_name}:`, error);
        }
    }
    if (dataToRemove.length > 0) {
        dataBuyPanel = dataBuyPanel.filter(buyer => !dataToRemove.includes(buyer));
        try {
            fs.writeFileSync(path, JSON.stringify(dataBuyPanel, null, 2));
            console.log("✅ Data pembeli yang sudah expired berhasil dihapus.");
            const teksOwnerDelete = `🛑 *Notifikasi Owner* 🛑
Data pembeli yang masa aktifnya sudah habis telah berhasil dihapus:

${dataToRemove
    .map(
        buyer => `👤 *Nama Pembeli:* ${buyer.buyer_name}\n📞 *Nomor Pembeli:* ${buyer.number}\n📅 *Tanggal Expired:* ${buyer.expired}\n📧 *Email:* ${buyer.data.email}`
    )
    .join("\n\n")}
Harap dicatat, data pembeli ini sudah tidak dapat diakses lagi.`;

            await hanz.sendMessage(`${ownerNumber}@s.whatsapp.net`, { text: teksOwnerDelete });
        } catch (error) {
            console.error("❌ Gagal menyimpan data setelah penghapusan:", error);
        }
    }

    try {
        fs.writeFileSync(path, JSON.stringify(dataBuyPanel, null, 2));
    } catch (error) {
        console.error("❌ Gagal menyimpan data panel:", error);
    }
};

module.exports = handler;
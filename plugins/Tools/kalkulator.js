const matematik = require('mathjs');

let handler = async (m, { q, reply, setReply }) => {
    try {
        // Jika tidak ada ekspresi atau ekspresi kosong
        if (!q || q.trim() === '') {
            return m.reply('❌: Format salah!\n\n⚠️ Harap masukkan ekspresi matematika yang valid.\nContoh: 3+5, 10-4, 2*6, 20/5');
        }

        // Ganti simbol "x" dengan "*" dan "÷" dengan "/" agar sesuai dengan operasi matematika
        let ekspresi = q.replace(/x/g, "*").replace(/÷/g, "/");

        // Pastikan ekspresi hanya mengandung karakter yang valid (angka, simbol matematika, tanda kurung)
        if (!/^[0-9+\-*/().πe ]+$/.test(ekspresi)) {
            return m.reply('❌: Format salah!\n\n⚠️ Ekspresi hanya boleh mengandung angka (0-9) dan simbol matematika: +, -, *, /, (), π, e');
        }

        // Evaluasi ekspresi matematika menggunakan mathjs
        let hasil = matematik.evaluate(ekspresi);

        // Format balasan dengan template string
        let teks = `📊 *Kalkulator*\n\n🧮 *Ekspresi*: ${q}\n📌 *Hasil*: ${hasil}`;

        // Kirim balasan
        setReply(teks);
    } catch (err) {
        // Jika terjadi kesalahan saat evaluasi
        console.error(err);
        setReply('❌: Terjadi kesalahan saat menghitung ekspresi.\n⚠️ Pastikan format ekspresi sudah benar dan hanya mengandung karakter yang valid.');
    }
};

handler.help = ["kalkulator"];
handler.tags = ["tools"];
handler.command = ["kalkulator", "math"];

module.exports = handler;

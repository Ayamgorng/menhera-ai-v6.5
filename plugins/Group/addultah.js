let handler = async (m, { hanz, usedPrefix, text }) => {
    if (!text) {
        return m.reply(`Harap masukkan tanggal ulang tahun dengan format: *${usedPrefix}addultah tanggal,bulan,tahun*\nContoh: *${usedPrefix}addultah 28,06,2004*`);
    }

  
    let [day, month, year] = text.split(',').map(v => v.trim());
    if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
        return m.reply(`Format salah! Harap masukkan ulang tahun dengan format: *${usedPrefix}addultah tanggal,bulan,tahun*\nContoh: *${usedPrefix}addultah 28,06,2004*`);
    }

    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
        return m.reply(`format tidak valid! Pastikan format dan nilai tanggal,bulan,thun benar.`);
    }

  
    global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};

  
    global.db.data.users[m.sender].ultah = `${day.toString().padStart(2, '0')},${month.toString().padStart(2, '0')},${year}`;

    m.reply(`🎉 Ulang tahun kamu berhasil disimpan!\n📅 ${day.toString().padStart(2, '0')},${month.toString().padStart(2, '0')},${year}`);
};

handler.help = ['addultah'];
handler.tags = ['group'];
handler.command = /^(addultah)$/i;
handler.onlyGroup = true;

module.exports = handler;
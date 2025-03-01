const fs = require('fs');

// Fungsi untuk menambah ID pengguna
exports.addUserId = (gcount, limitCount, tanggal, pushname, sender, _level) => {
    const obj = { name: pushname, id: sender, date: tanggal, xp: 1, level: 1, hit: 0, balance: 0, limit: limitCount, glimit: gcount };
    _level.push(obj);
    // fs.writeFileSync('./database/user.json', JSON.stringify(_level));
};

// Fungsi untuk mendapatkan XP pengguna
exports.getLevelingXp = (sender, _level) => {
    let position = false;
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
            position = i;
        }
    });
    return position !== false ? _level[position].xp : null;
};

// Fungsi untuk mendapatkan level pengguna
exports.getLevelingLevel = (sender, _level) => {
    let position = false;
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
            position = i;
        }
    });
    return position !== false ? _level[position].level : null;
};

// Fungsi untuk mendapatkan ID pengguna
exports.getLevelingId = (sender, _level) => {
    let position = false;
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
            position = i;
        }
    });
    return position !== false ? _level[position].id : null;
};

// Fungsi untuk mendapatkan tanggal pengguna
exports.getDateId = (sender, _level) => {
    let position = false;
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
            position = i;
        }
    });
    return position !== false ? _level[position].date : null;
};

// Fungsi untuk menambah XP pengguna
exports.addLevelingXp = (sender, amount, _level) => {
    let position = false;
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
            position = i;
        }
    });
    if (position !== false) {
        _level[position].xp += amount;
        // fs.writeFileSync('./database/user.json', JSON.stringify(_level));
    }
};

// Fungsi untuk mengatur ulang XP pengguna
exports.resetLevelingXp = (sender, amount, _level) => {
    let position = false;
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
            position = i;
        }
    });
    if (position !== false) {
        _level[position].xp -= amount;
        // fs.writeFileSync('./database/user.json', JSON.stringify(_level));
    }
};

// Fungsi untuk menambah level pengguna
exports.addLevelingLevel = (sender, amount, _level) => {
    let position = false;
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === sender) {
            position = i;
        }
    });
    if (position !== false) {
        _level[position].level += amount;
        // fs.writeFileSync('./database/user.json', JSON.stringify(_level));
    }
};

// Fungsi untuk menentukan role berdasarkan level
exports.userLeveling = (levelRole) => {
    if (levelRole <= 2) return `Newbie ㋡`;
    else if (levelRole <= 4) return `Beginner Grade 1 ⚊¹`;
    else if (levelRole <= 6) return `Beginner Grade 2 ⚊²`;
    else if (levelRole <= 8) return `Beginner Grade 3 ⚊³`;
    else if (levelRole <= 10) return `Beginner Grade 4 ⚊⁴`;
    // Tambahkan lebih banyak level sesuai kebutuhan
    else return `End level 程度❗`;
};

// Fungsi untuk menampilkan XP pengguna dalam bentuk bar
exports.userXp = (jumlahXp) => {
    if (jumlahXp <= 5) return `[▒▒▒▒▒▒▒▒▒▒]`;
    else if (jumlahXp <= 10) return `[█▒▒▒▒▒▒▒▒▒]`;
    else if (jumlahXp <= 20) return `[██▒▒▒▒▒▒▒▒]`;
    else if (jumlahXp <= 30) return `[███▒▒▒▒▒▒▒]`;
    else if (jumlahXp <= 40) return `[████▒▒▒▒▒▒]`;
    else if (jumlahXp <= 50) return `[█████▒▒▒▒▒]`;
    else if (jumlahXp <= 60) return `[██████▒▒▒▒]`;
    else if (jumlahXp <= 70) return `[███████▒▒▒]`;
    else if (jumlahXp <= 80) return `[████████▒▒]`;
    else if (jumlahXp <= 90) return `[█████████▒]`;
    else return `[██████████]`;
};

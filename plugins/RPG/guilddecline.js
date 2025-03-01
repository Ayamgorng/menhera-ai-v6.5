let handler = async (m, { hanz }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.guild) return hanz.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return hanz.reply(m.chat, 'Guild tidak ditemukan.', m);

    if (guild.owner === userId) return hanz.reply(m.chat, 'Pemilik guild tidak bisa menolak permintaan.', m);

    guild.waitingRoom = guild.waitingRoom.filter(room => room !== userId);

    hanz.reply(m.chat, 'Permintaan kamu untuk bergabung dengan guild telah ditolak.', m);
};

handler.help = ['guilddecline'];
handler.tags = ['rpgG'];
handler.command = /^(guilddecline)$/i;
module.exports = handler;
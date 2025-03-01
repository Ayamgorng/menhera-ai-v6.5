let handler = async (m, { hanz }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.guild) return hanz.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return hanz.reply(m.chat, 'Guild tidak ditemukan.', m);

    guild.members = guild.members.filter(member => member !== userId);
    user.guild = null;

    hanz.reply(m.chat, 'Kamu telah keluar dari guild.', m);
};

handler.help = ['guildleave'];
handler.tags = ['rpgG'];
handler.command = /^(guildleave)$/i;
module.exports = handler;
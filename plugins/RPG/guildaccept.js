let handler = async (m, { hanz }) => {
    let user = global.db.data.users[m.sender];
    if (!isGuildOwner(user) && !isGuildStaff(user)) {
        return hanz.reply(m.chat, 'Anda tidak memiliki izin untuk melakukan ini.', m);
    }

    let target = m.mentionedJid[0];
    if (!target) return hanz.reply(m.chat, 'Tag user yang ingin Anda terima di guild.', m);

    let targetUser = global.db.data.users[target];
    if (!targetUser.guildRequest) return hanz.reply(m.chat, 'Tidak ada permintaan bergabung yang tertunda dari pengguna ini.', m);

    let guildName = targetUser.guildRequest;
    let guild = global.db.data.guilds[guildName];

    guild.members.push(target);
    targetUser.guild = guildName;
    delete targetUser.guildRequest;

    hanz.reply(m.chat, `Permintaan bergabung dari @${target.split('@')[0]} telah diterima.`, m);
};

handler.help = ['guildaccept @user'];
handler.tags = ['rpgG'];
handler.command = /^(guildaccept)$/i;
module.exports = handler;

function isGuildOwner(user) {
    return user.role === 'owner';
}
function isGuildStaff(user) {
    return user.role === 'staff'; 
}
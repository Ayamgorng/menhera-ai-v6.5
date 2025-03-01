let handler = async (m, { hanz }) => {
    let guilds = Object.values(global.db.data.guilds);

    if (guilds.length === 0) {
        return hanz.reply(m.chat, 'Belum ada guild yang terdaftar.', m);
    }

    let guildList = guilds.map((guild, idx) => `${idx + 1}. ${guild.name} ${guild.members.length} Member`).join('\n');

    hanz.reply(m.chat, `亗 PUBLIC GUILD 亗\n${guildList}`, m);
};

handler.help = ['guildlist'];
handler.tags = ['rpgG'];
handler.command = /^(guildlist)$/i;
module.exports = handler;
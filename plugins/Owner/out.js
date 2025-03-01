let handler = async (m, { hanz, isOwner, isGroup, setReply, args }) => {
    
    let groupList = await hanz.groupFetchAllParticipating();
    let groups = Object.values(groupList); 

    if (groups.length === 0) {
        return setReply('Bot tidak tergabung dalam grup mana pun.');
    }

   
    if (!args[0]) {
        let groupText = '*Daftar Grup yang Ditempati Bot:*\n\n';
        groups.forEach((group, index) => {
            groupText += `${index + 1}. ${group.subject}\n`;
        });
        groupText += `\nKetik nomor grup untuk keluar. Contoh: out 1`;
        return setReply(groupText);
    }

   
    let groupIndex = parseInt(args[0]) - 1;
    if (isNaN(groupIndex) || groupIndex < 0 || groupIndex >= groups.length) {
        return setReply('Nomor grup tidak valid.');
    }

    let selectedGroup = groups[groupIndex].id;

    await hanz.groupLeave(selectedGroup);
    setReply(`Berhasil keluar dari grup: ${groups[groupIndex].subject}`);
};

handler.help = ['out'];
handler.tags = ['owner'];
handler.command = ['out'];
handler.owner = true

module.exports = handler;
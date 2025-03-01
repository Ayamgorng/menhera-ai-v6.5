let handler = async (m, { hanz, isOwner, isGroup, setReply, args }) => {
    let groupList = await hanz.groupFetchAllParticipating();
    let groups = Object.values(groupList); 

    if (groups.length === 0) {
        return setReply('Bot tidak tergabung dalam grup mana pun.');
    }
    if (!args[0]) {
        let groupText = `${gris}Silahkan Di Pilih Ingin Broadcast ke Group Mana\nDaftar Grup yang Ditempati Bot${gris}:\n\n`;
        groups.forEach((group, index) => {
            groupText += `${index + 1}. ${group.subject}\n`;
        });
        groupText += `\nKetik nomor grup dan pesan yang ingin dikirim. Contoh: broadcast 1 Pesan saya.`;
        return setReply(groupText);
    }

    let groupIndex = parseInt(args[0]) - 1;
    if (isNaN(groupIndex) || groupIndex < 0 || groupIndex >= groups.length) {
        return setReply('Nomor grup tidak valid.');
    }

    let message = args.slice(1).join(' ');

    if (!message) return setReply('Silakan masukkan pesan yang ingin dikirim.');
let contextInfo = {
        forwardingScore: 50,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid,
            serverMessageId: 100,
            newsletterName
        },
        externalAdReply: {
            showAdAttribution: true,
            renderLargerThumbnail: true,
            title: `${botName}`,
            body: `Version: ${baileysVersion}`,
            mediaType: 1, 
            containsAutoReply: true,
            thumbnailUrl: "https://pomf2.lain.la/f/vmbwcb1.jpg"
        }
    };
    let selectedGroup = groups[groupIndex].id;
let textBc = `
*「 BROADCAST GROUP 」*
*Khusus untuk Grup:* _${groups[groupIndex].subject}_

────────────────────────
*📢 Pesan dari Owner:*
"${message}"
────────────────────────

Terima kasih telah menjadi bagian dari komunitas ini. Kami menghargai dukungan dan kebersamaan Anda di grup ini. Tetap semangat dan terus berkontribusi!

Salam hangat,  
Owner
`
    if (m.quoted && m.quoted.mediaKey) {
        const media = await hanz.downloadMediaMessage(m.quoted);
        await hanz.sendMessage(selectedGroup, { image: media, caption: textBc });
    } else {
        await hanz.sendMessage(selectedGroup, { text: textBc, contextInfo });
    }

    
    

    setReply(`Berhasil mengirim pesan ke grup: ${groups[groupIndex].subject}`);
};

handler.help = ['broadcast'];
handler.tags = ['owner'];
handler.command = ['broadcast'];
handler.owner = true;

module.exports = handler;
      
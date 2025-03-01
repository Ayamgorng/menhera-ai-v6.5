// jodohku.js

let handler = async (m, { hanz, isGroup, groupMembers }) => {
    if (!m.isGroup) return m.reply("Fitur ini hanya dapat digunakan dalam grup.");

    let member = m.groupMembers.map(u => u.id);
    let jodoh = member[Math.floor(Math.random() * member.length)];
    let jawab = `Jodoh kamu adalah @${jodoh.split('@')[0]}`;
    let menst = [jodoh];

    hanz.sendMessage(m.chat, { text: jawab, mentions: menst }, { quoted: m });
};

handler.help = ["jodohku"];
handler.tags = ["fun"];
handler.command = ["jodohku"];

module.exports = handler;

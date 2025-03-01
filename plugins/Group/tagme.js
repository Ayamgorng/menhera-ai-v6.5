// tagme.js

let handler = async (m, { isGroup,hanz, from, onlyToko }) => {
    if (!m.isGroup) return onlyToko();
    
    let menst = [m.sender];
    await hanz.sendMessage(from, { 
        text: `@${m.senderNumber}`, 
        mentions: menst 
    }, { quoted: m });
};

handler.help = ["tagme"];
handler.tags = ["group"];
handler.command = ["tagme"];

module.exports = handler;

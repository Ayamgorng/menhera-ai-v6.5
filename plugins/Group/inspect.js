// inspect.js

let handler = async (m, { q, hanz, setReply }) => {
    const rex1 = /chat.whatsapp.com\/([\w\d]*)/g;
    let code = q.match(rex1);
    if (code === null) return setReply("No invite URL detected.");
    
    code = code[0].replace("chat.whatsapp.com/", "");
    
    try {
        let { id, subject, creator, creation, desc, descId } = await hanz.groupGetInviteInfo(code);
        
        let text = `*Group Information*\n\n` +
                   `🔸 *Subject:* ${subject}\n` +
                   `🔸 *Group ID:* ${id}\n` +
                   `🔸 *Creator:* ${creator ? `${creator.split("@")[0]}` : "Unknown"}\n` +
                   `🔸 *Created At:* ${new Date(creation * 1000).toLocaleString()}\n` +
                   `${desc ? `🔸 *Description:* ${desc}\n🔸 *Desc ID:* ${descId}` : ""}`;
        
        setReply(text);
    } catch (err) {
        setReply("Invalid invite URL.");
    }
};

handler.help = ["inspect"];
handler.tags = ["group"];
handler.command = ["inspect"];

module.exports = handler;

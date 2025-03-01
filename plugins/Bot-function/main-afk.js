let handler = m => m;
handler.before = async m => {
    // Check if the user is AFK and notify when they return
   const user = global.db.data.users[m.sender]
    if (user && user.afk > -1) {
        let udahAfk = Ehztext(`⚡ ${m.pushname} *telah kembali dari mode AFK!* ⚡\n${
            user.afkReason ? `🔹 *Alasan AFK*: ${user.afkReason}` : ''
        }\n🔸 *Durasi AFK*: ${clockString(new Date() - user.afk)}`).trim();
        
        // Send the "back from AFK" message
        await m.reply(udahAfk);

        // Reset status AFK
        user.afk = -1;
        user.afkReason = '';
    }

    // Check if any mentioned users or quoted user are AFK
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    
    for (let jid of jids) {
        let userAfk = global.db.data.users[jid];
        if (!userAfk) continue;
        
        let afkTime = userAfk.afk;
        if (!afkTime || afkTime < 0) continue;
        
        let reason = userAfk.afkReason || 'Tanpa alasan khusus';
        let yoe = Ehztext(`🤫 *Ssssttt! Jangan tag dia!* 🤫\n💤 ${botName} memberitahukan bahwa dia sedang AFK!\n${
            reason ? `🔹 *Alasan AFK*: ${reason}` : ''
        }\n⏳ *Durasi*: ${clockString(new Date() - afkTime)}`).trim();
        
        // Notify the user that the mentioned person is AFK
        m.reply(yoe);
    }
}

module.exports = handler;

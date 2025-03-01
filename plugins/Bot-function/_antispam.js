let handler = (m) => m;
handler.before = async function (m, { hanz,isOwner }) {
// NEW ANTI SPAM
if(!m.isGroup) return
const isSticker = (m.type === 'stickerMessage');
const isText = (m.type === 'extendedTextMessage');

hanz.spamSticker = hanz.spamSticker ? hanz.spamSticker : {};
hanz.spamText = hanz.spamText ? hanz.spamText : {};


const chat = db.data.chats[m.chat]
if (chat && chat.antispam) {


    if (isSticker && !m.isAdmin) {
        if (m.sender in hanz.spamSticker) {
            hanz.spamSticker[m.sender].count += 1
            let timeSinceLastSpam = m.messageTimestamp.toNumber() - hanz.spamSticker[m.sender].lastspam;
            
            if (timeSinceLastSpam <= 10) {
                if (hanz.spamSticker[m.sender].count > 5) {
                    hanz.spamSticker[m.sender].count = 0;
                    //let name = m.pushname || await hanz.getName(m.sender);
                    let teks = `Terdeteksi nomor ${m.senderNumber} telah melakukan spam sticker lebih dari 5 kali, bot akan kick otomatis. Untuk menonaktifkan fitur ini ketik antispam off.`;

                    m.reply(teks);
                    
                    await sleep(2000)
                    if(isOwner) return m.reply("Tolong jangan spam ya ka")

                    // Implementasikan logika untuk kick user di sini
                    if(m.isBotAdmin) hanz.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                }
            } else {
                hanz.spamSticker[m.sender].count = 1; // Reset count jika lebih dari 1 menit
                hanz.spamSticker[m.sender].lastspam = m.messageTimestamp.toNumber();
            }
        } else {
            hanz.spamSticker[m.sender] = {
                count: 1,
                lastspam: m.messageTimestamp.toNumber()
            };
        }
    }



    if (isText && !m.isAdmin) {
        if (m.sender in hanz.spamText) {
            hanz.spamText[m.sender].count += 1
            let timeSinceLastSpam = m.messageTimestamp.toNumber() - hanz.spamText[m.sender].lastspam;
            
            if (timeSinceLastSpam <= 15) {
                if (hanz.spamText[m.sender].count > 10) {
                    let name = m.pushname || await hanz.getName(m.sender);
                    let teks = `Terdeteksi nomor ${m.senderNumber} telah melakukan spam text lebih dari 10 kali, bot akan kick otomatis. Untuk menonaktifkan fitur ini ketik antispam off.`;

                    m.reply(teks);
                    hanz.spamText[m.sender].count = 0;
                    if(isOwner) return m.reply("Tolong jangan spam ya ka")

                    // Implementasikan logika untuk kick user di sini
                    if(m.isBotAdmin) hanz.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
                }
            } else {
                hanz.spamText[m.sender].count = 1; // Reset count jika lebih dari 1 menit
                hanz.spamText[m.sender].lastspam = m.messageTimestamp.toNumber();
            }
        } else {
            hanz.spamText[m.sender] = {
                count: 1,
                lastspam: m.messageTimestamp.toNumber()
            };
        }
    }





}

};
module.exports = handler;

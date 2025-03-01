const fs = require('fs');
const { addSpam, cekSpam } = require('../../lib/antispam');

let handler = (m) => m;

handler.before = async function (m, { hanz }) {
    
    if (db.data.audio[m.budy]) {
        const AntiSpam = db.data.antispam;
        
       
        if (cekSpam("NotCase", m.senderNumber, AntiSpam)) return;

       
        const nono = {
            key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "16505434800@s.whatsapp.net" } : {}) },
            message: {
                "extendedTextMessage": {
                    "text": `${m.pushname} \n「 Audio 」⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻`,
                    "title": "Hmm",
                    'jpegThumbnail': fs.readFileSync('./stik/rangel.jpg')
                }
            }
        };
        
        const iniQuoted = m.mentionByReply ? m.quoted.fakeObj : nono;
        
        
        await hanz.sendMessage(m.chat, {
            audio: { url: db.data.audio[m.budy].link },
            ptt: true,
            waveform: [0, 0, 50, 0, 0, 0, 10, 80, 10, 60, 10, 99, 60, 30, 10, 0, 0, 0],
            mimetype: 'audio/mpeg'
        }, { quoted: iniQuoted });

       
        addSpam("NotCase", m.senderNumber, "5s", AntiSpam);
    }
};

module.exports = handler;

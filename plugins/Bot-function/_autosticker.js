const fs = require('fs');
const { addSpam, cekSpam } = require('../../lib/antispam');
let handler = (m) => m;
handler.before = async function (m, { hanz, isPremium }) {
//Auto Sticker Online
const AntiSpam = db.data.antispam
if(db.data.sticker[m.budy]){
    if (cekSpam("NotCase",m.senderNumber, AntiSpam)) return
    addSpam("NotCase",m.senderNumber, "5s", AntiSpam)
    hanz.sendMessage(m.chat,{sticker:{url:db.data.sticker[m.budy].link}})
    }
    
};
module.exports = handler;
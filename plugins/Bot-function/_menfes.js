const fs = require('fs');
const path = './database/menfes.json';


const loadData = () => {
    try {
        return JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (e) {
        fs.writeFileSync(path, JSON.stringify({}));
        return {};
    }
};
const saveData = (data) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

const delay = (time) => new Promise((res) => setTimeout(res, time));

let handler = (m) => m;
handler.all = async function (m) {
    if (!m.chat.endsWith('@s.whatsapp.net')) return !0;
    let menfess = loadData();
    let mf = Object.values(menfess).find(
        (v) => v.status === false && v.penerima === m.sender
    );
    if (!mf) return !0;
if (m.type === 'videoMessage' || 
        m.type === 'stickerMessage' || 
        m.type === 'audioMessage' || 
        m.type === 'contactMessage' || 
        m.type === 'locationMessage' ||
        m.type === 'inviteLinkGroup' ||
        m.type === 'mentionedJid') {
        return;
    }
    console.log({ text: m.text });

    if (
        (m.text === 'BALAS PESAN' || m.text === '') &&
        m.quoted?.mtype === 'buttonMessage'
    )
        return m.reply('Silahkan ketik pesan balasanmu.');

    let txt = `✨ *Hai, Kak @${mf.dari.split('@')[0]}!* ✨\n\nKamu baru saja menerima *pesan balasan* nih! 🎉\n\n📩 *Pesan Kamu*: \n"${mf.pesan}"\n\n💌 *Pesan Balasan*: \n"${m.text}"\n\nSemoga pesan ini membuat harimu lebih menyenangkan! 😊`.trim();

    await this.reply(mf.dari, txt, null).then(() => {
        m.reply('Berhasil mengirim balasan!');
        delay(2000);

       
        menfess[mf.id].status = true;
        menfess[mf.id].balasan = m.text;

        saveData(menfess);
    });

    return !0;
};

module.exports = handler;
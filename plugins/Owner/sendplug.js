const { readdirSync, statSync } = require('fs');
const { join, parse } = require('path');
const fs = require('fs-extra');

let handler = async (m, { q, usedPrefix, command, hanz, text }) => {
    let pluginFiles = getPluginFiles('./plugins');
    
    if (!text) throw `Penggunaan salah! Silakan tag atau reply target dan gunakan perintah seperti ini:\n\n${usedPrefix + command} menu`;

    let who;
    try {
        if (m.isGroup) {
            who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
        } else {
            who = m.sender; 
        }
    } catch (err) {
        if (m.isGroup) {
            who = args[0] + '@s.whatsapp.net';
        } else {
            who = m.sender; 
        }
    }
    
    if (!who) return m.reply(`Tag atau nomor tidak ditemukan!`);

    const pluginPath = pluginFiles[text];
    if (!pluginPath) {
        m.reply(`Plugin *${text}* tidak ditemukan`);
        return;
    }

    let file = fs.readFileSync(pluginPath);
    let jpegThumbnail = fs.readFileSync('./stik/menhera.jpg');
    let mimetype = 'text/javascript';

    // Mengirimkan plugin secara privat
    await hanz.sendMessage(who, {
        document: file,
        fileName: `${q}.js`,
        mimetype,
        jpegThumbnail
    }, { quoted: m });

    m.reply(`Plugin *${text}* telah dikirim ke ${who}`);
};

handler.help = ['sendplug'].map((v) => v + ' <teks>');
handler.tags = ['host'];
handler.command = /^(sendplug|sp)$/i;
handler.owner = true;
handler.onlyGroup = true
module.exports = handler;

function getPluginFiles(folderPath) {
    let files = {};

    function getFilesRecursively(folderPath) {
        const items = readdirSync(folderPath);

        for (let item of items) {
            const itemPath = join(folderPath, item);
            const itemStat = statSync(itemPath);

            if (itemStat.isDirectory()) {
                getFilesRecursively(itemPath); 
            } else if (item.endsWith('.js')) {
                const { name } = parse(item);
                files[name] = itemPath;
            }
        }
    }

    getFilesRecursively(folderPath);
    return files;
}
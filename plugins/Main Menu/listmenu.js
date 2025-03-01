const fs = require('fs');
const path = require('path');

let handler = async (m, { hanz, isOwner }) => {
    let forOwner = ['Bot-function'];
    let forUser = ['Bot-function', 'Game_answer', 'Game_hints'];
    const excludedFolders = isOwner ? forOwner : forUser;
    const pluginsFolderPath = "./plugins";

   
    function listFolders(folderPath, excludedFolders = []) {
        let result = '';
        const files = fs.readdirSync(folderPath);

        files.forEach((file) => {
            const filePath = path.join(folderPath, file);
            const stat = fs.statSync(filePath);

            
            if (stat.isDirectory() && !excludedFolders.includes(file)) {
                result += `menu ${file} \n`; 
                result += listFolders(filePath, excludedFolders); 
            }
        });

        return result;
    }

    const outputString = listFolders(pluginsFolderPath, excludedFolders);

    const menuAll = transformText (`
📂 List Menu
Daftar folder di dalam folder plugins:

${outputString}

silahkan ketik *.menu <namafolder>* Jika Ingin Melihat Daftar Fitur Yang Ada Dalam Masing Masing Folder`);

    
    hanz.relayMessage(m.chat, {
        liveLocationMessage: {
         degreesLatitude: -7.350556,
         degreesLongitude: 108.217222,
            caption: menuAll,
            sequenceNumber: 1656662972682001,
timeOffset: 8600,
            jpegThumbnail: null,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    containsAutoReply: true,
                    showAdAttribution: true,
                }
            }
        }
    }, { quoted: fimage });
};

handler.help = ["listmenu"];
handler.tags = ["internet"];
handler.onlyGroup = true;
handler.gcStore = true;
handler.register = true;
handler.command = ["listmenu"];

module.exports = handler;
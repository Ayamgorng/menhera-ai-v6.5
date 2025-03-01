const fs = require('fs');

let handler = async (m, { text, setReply,prefix }) => {
    const chatId = m.chat;
    const dbPath = './database/aihome.json'; 
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, '[]');
    }
    const aihomeData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));  
    let groupData = aihomeData.find((group) => group.id === chatId);  
    if (!groupData) {
        groupData = {
            group: m.groupMetadata?.subject || "Unknown Group",
            id: chatId,
            type: "teks", 
            status: false, 
            promptAi: "kamu adalah rangel, asisten perusahaan rangelofficial, kamu mempunyai rumah yaitu rangel, tuan kamu adalah ehanz atau Raihan Fadillah dan tuan kamu mempunyai pacar Yaitu angel"
        };
        aihomeData.push(groupData);
    }
    const args = text.split('|').map((arg) => arg.trim());
    const option = args[0]?.toLowerCase(); 
    
    if (!option) {
       
        const status = groupData.status ? "Aktif" : "Nonaktif";
        setReply(`
Status AI Home:
- Grup: ${groupData.group}
- Status: ${status}
- Tipe: ${groupData.type}
- Prompt: ${groupData.promptAi}
        
Gunakan perintah:
- ${prefix}aihome on/off
- ${prefix}aihome teks/audio
- ${prefix}aihome prompt|<prompt baru>
        `.trim());
        return;
    }
 
    switch (option) {
        case 'on':
            groupData.status = true;
            setReply(`AI Home telah diaktifkan untuk grup ini.`);
            break;

        case 'off':
            groupData.status = false;
            setReply(`AI Home telah dinonaktifkan untuk grup ini.`);
            break;

        case 'teks':
        case 'audio':
            groupData.type = option;
            setReply(`Tipe respons AI diubah menjadi ${option}.`);
            break;

        case 'prompt':
            const newPrompt = args[1];
            if (!newPrompt) {
                setReply(`Prompt tidak boleh kosong. Gunakan perintah: ${prefix}aihome prompt|<prompt baru>`);
            } else {
                groupData.promptAi = newPrompt;
                setReply(`Prompt AI telah diperbarui:\n"${newPrompt}"`);
            }
            break;

        default:
            setReply(`Opsi tidak valid. Gunakan: on/off, teks/audio, atau prompt|<prompt baru>.`);
            return;
    }

    fs.writeFileSync(dbPath, JSON.stringify(aihomeData, null, 2));
};

handler.tags = ["admin"];
handler.command = ["aihome", "aigroup"];
handler.onlyGroup = true; 
handler.admin = true; 

module.exports = handler;
let handler = async (m, { hanz,store, args}) => {
    try {
       
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] :m.chat;

   
        if (!store.presences || !store.presences[id]) {
            return hanz.reply(m.chat, 'Tidak ada data online untuk grup ini.', m);
        }

   
        let online = [...Object.keys(store.presences[id]), hanz.user.jid];

  
        hanz.sendText(
            m.chat,
            'List Online:\n\n' +
                online
                    .map((v) => '⭔ @' + v.replace(/@.+/, ''))
                    .join('\n'),
            m,
            { mentions: online }
        );
    } catch (e) {
        console.error(e);
       // hanz.reply(fro, 'Terjadi kesalahan saat memproses permintaan.', m);
    }
};

// Properti plugin
handler.help = ['listonline'];
handler.tags = ['group'];
handler.command = /^listonline$/i;
handler.group = false;

module.exports = handler;

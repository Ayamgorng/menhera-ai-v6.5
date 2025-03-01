const { exec } = require('child_process');

const handler = async (m, { hanz, command, prefix }) => {
    // Check if the user wants to know the disk usage
    if (command === 'disk') {
        exec('cd && du -h --max-depth=1', (err, stdout) => {
            if (err) {
                return hanz.reply(m.chat, `⚠️ Terjadi kesalahan: ${err}`, m);
            }
            if (stdout) {
                return hanz.reply(m.chat, `*Disk Usage:*\n\n${stdout}`, m);
            }
        });
    }
};

// Command setup
handler.help = ['disk'];
handler.tags = ['tools'];
handler.command = /^disk$/i;

module.exports = handler;

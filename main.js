'use strict';
require('dotenv').config();
const {
    Browsers,
    DisconnectReason,
    makeInMemoryStore,
    makeWASocket,
    MessageRetryMap,
    useMultiFileAuthState,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    generateMessageTag
} = require('@adiwajshing/baileys');
const chalk = require('chalk');
const fs = require('fs');
const yargs = require('yargs');
const pino = require('pino');
const chokidar = require('chokidar');
const qrcode = require('qrcode-terminal');
const simple = require('./lib/simple');
const { connectionUpdate } = require('./message/connection');
const { 
    notifGcStore, 
    notifGcAlarm, 
    notifPrivate, 
    autoOpenCloseGc, 
    autoNotifSholat, 
    autoSholat, 
    autoSendTugas, 
    notifSholatJumat 
} = require('./message/scheduler');
const CFonts = require('cfonts');
const path = require('path');
const { Boom } = require('@hapi/boom');
const _ = require('lodash');
const { fileURLToPath, pathToFileURL } = require('url');
const syntaxerror = require('syntax-error');
const { format } = require('util');
const axios = require('axios');
const { color } = require('./lib/color');
const spin = require('spinnies');
const { getRandom, getBuffer, sleep } = require('./lib/myfunc');

// ---------- Inisialisasi Sistem ----------
process.on('uncaughtException', console.error);
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent' }) });
let conn;

// ========== [FITUR BARU] AUTO DELETE CHAT 5 MENIT ==========
async function autoDeleteChat() {
    try {
        const chats = await conn.chats.all();
        const now = Date.now();
        
        for (const chat of chats) {
            if (now - chat.lastMessageTimestamp > 300000) { // 5 menit dalam ms
                await conn.chatModify({
                    delete: true,
                    lastMessages: [{
                        key: chat.lastMessageReciept,
                        messageTimestamp: chat.lastMessageTimestamp
                    }]
                }, chat.id);
                console.log(chalk.green(`[AUTO DELETE] Chat ${chat.id} telah dihapus`));
            }
        }
    } catch (error) {
        console.error(chalk.red('[AUTO DELETE ERROR]'), error);
    }
}

// ---------- Fungsi Koneksi WhatsApp ----------
async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    // ---------- Inisialisasi Database ----------
    const { Low } = await import('lowdb');
    const { JSONFile } = await import('lowdb/node');
    global.db = new Low(new JSONFile('database/database.json'));
    await global.db.read();
    
    // ---------- Konfigurasi Koneksi ----------
    const { version } = await fetchLatestBaileysVersion();
    const socketConfig = {
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino())
        },
        browser: Browsers.ubuntu('Chrome'),
        generateHighQualityLinkPreview: true,
        markOnlineOnConnect: true
    };

    conn = makeWASocket(socketConfig);
    store.bind(conn.ev);

    // ---------- Event Handlers ----------
    conn.ev.on('connection.update', async (update) => {
        await connectionUpdate(connectToWhatsApp, conn, update);
        await global.db.read();
    });

    conn.ev.on('messages.upsert', async ({ messages }) => {
        try {
            let msg = messages[0];
            msg = await simple.smsg(conn, msg, store);
            require('./message/handler')(conn, msg, messages, store);
        } catch (error) {
            console.error(chalk.red('Error processing message:'), error);
        }
    });

    // ========== AKTIFKAN AUTO DELETE ==========
    setInterval(autoDeleteChat, 300000); // Jalankan setiap 5 menit

    // ---------- Fitur Lain ----------
    conn.ev.on('group-participants.update', async (update) => {
        require('./message/group.js')(conn, update);
    });

    conn.ev.on('call', async (call) => {
        const anticall = global.db.data.settings.anticall || false;
        if (anticall) {
            await conn.rejectCall(call.id, call.from);
            await conn.sendMessage(call.from, { text: 'Maaf, kami tidak menerima panggilan!' });
        }
    });

    // ---------- Jadwal Tugas ----------
    setInterval(() => notifSholatJumat(conn), 60000);
    setInterval(() => autoOpenCloseGc(conn), 60000);
    setInterval(() => notifGcAlarm(conn), 1800000);
    setInterval(() => notifPrivate(conn), 1800000);
    setInterval(async () => await autoSholat(conn), 60000);
    setInterval(() => autoNotifSholat(conn), 60000);
    setInterval(() => autoSendTugas(conn), 60000);
    notifGcStore(conn);

    return conn;
}

// ---------- Menjalankan Bot ----------
CFonts.say('Menhera-MD', {
    font: 'block',
    align: 'center',
    colors: ['cyan', 'white'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1
});

connectToWhatsApp()
    .then(() => console.log(chalk.green.bold('Bot berhasil terhubung ke WhatsApp!')))
    .catch(err => {
        console.error(chalk.red.bold('Gagal menghubungkan:'), err);
        process.exit(1);
    });
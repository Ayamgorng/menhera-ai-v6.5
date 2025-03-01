const chalk = require('chalk');
const moment = require('moment-timezone');
const { fetchJson, sleep } = require("../lib/myfunc");
const { msgFilter, addSpam, SpamExpired, cekSpam } = require('../lib/antispam');

// Log pesan di group dan private chat
exports.Logmessage = async (hanz, m, budy, AntiSpam) => {
  const isGroup = m.isGroup;
  const idConsole = isGroup ? m.chat : m.sender;

  if (budy && m.key.remoteJid !== 'status@broadcast') {
    const time = moment.tz('Asia/Jakarta').format('HH:mm');
    if (isGroup) {
      console.log(
        chalk.bgMagentaBright("[ GROUP ]"),
        `\n${chalk.cyan("📝 TEKS")}     : ${chalk.green.italic(budy)}`,
        `\n${chalk.cyan("👤 DARI")}    : ${chalk.keyword('orange')(m.pushname)}`,
        `\n${chalk.cyan("👥 DI GC")}   : ${chalk.blueBright(m.groupName)}`,
        `\n${chalk.cyan("🆔 ID")}      : ${chalk.hex('#FFA500')(idConsole)}`,
        `\n${chalk.cyan("⏰ WAKTU")}   : ${chalk.hex('#FF8800')(time)}`
      );
    } else {
      console.log(
        chalk.bgGreenBright("[ PRIVATE ]"),
        `\n${chalk.cyan("📝 TEKS")}     : ${chalk.white.italic(budy)}`,
        `\n${chalk.cyan("👤 DARI")}    : ${chalk.keyword('orange')(m.pushname)}`,
        `\n${chalk.cyan("🆔 ID")}      : ${chalk.hex('#FFA500')(idConsole)}`,
        `\n${chalk.cyan("⏰ WAKTU")}   : ${chalk.hex('#FF8800')(time)}`
      );
    }
  }

 //Reply status user 
if(m.key.remoteJid == 'status@broadcast'){
if (cekSpam("NotCase",m.senderNumber, AntiSpam)) return
addSpam("NotCase",m.senderNumber, "10s", AntiSpam)
let simi = await fetchJson(`https://api.simsimi.net/v2/?text=${budy}&lc=id`, {methods: "GET"})
let sami = simi.success   
if(sami.startsWith("Aku tidak mengerti")) return
let teksnya = sami
await sleep(2000)
hanz.sendMessage(m.sender,{text: teksnya},{quoted: m})    
}  
}

// Log command bot
exports.Logcommands = async (m, command) => {
  const isGroup = m.isGroup;
  const idConsole = isGroup ? m.chat : m.sender;
  const time = moment.tz('Asia/Jakarta').format('HH:mm');

  if (isGroup) {
    console.log(
      chalk.bgCyanBright("[ COMMAND GROUP ]"),
      `\n${chalk.cyan("TEKS")}     : ${chalk.white.italic(command)}`,
      `\n${chalk.cyan("👤 DARI")}  : ${chalk.keyword('orange')(m.pushname)}`,
      `\n${chalk.cyan("👥 DI GC")} : ${chalk.blue(m.groupName)}`,
      `\n${chalk.cyan("🆔 ID")}    : ${chalk.hex('#FFA500')(idConsole)}`,
      `\n${chalk.cyan("⏰ WAKTU")} : ${chalk.hex('#FF8800')(time)}`
    );
  } else {
    console.log(
      chalk.bgCyanBright("[ COMMAND PRIVATE ]"),
      `\n${chalk.cyan("TEKS")}     : ${chalk.white.italic(command)}`,
      `\n${chalk.cyan("👤 DARI")}  : ${chalk.keyword('orange')(m.pushname)}`,
      `\n${chalk.cyan("🆔 ID")}    : ${chalk.hex('#FFA500')(idConsole)}`,
      `\n${chalk.cyan("⏰ WAKTU")} : ${chalk.hex('#FF8800')(time)}`
    );
  }
};

// Log error
exports.Logerror = async (m, command) => {
  const isGroup = m.isGroup;
  const idConsole = isGroup ? m.chat : m.sender;
  const time = moment.tz('Asia/Jakarta').format('HH:mm');

  if (isGroup) {
    console.log(
      chalk.bgRed("[ ERROR GROUP ]"),
      `\n${chalk.cyan("TEKS")}     : ${chalk.white.italic(command)}`,
      `\n${chalk.cyan("👤 DARI")}  : ${chalk.keyword('orange')(m.pushname)}`,
      `\n${chalk.cyan("👥 DI GC")} : ${chalk.blue(m.groupName)}`,
      `\n${chalk.cyan("🆔 ID")}    : ${chalk.hex('#FFA500')(idConsole)}`,
      `\n${chalk.cyan("⏰ WAKTU")} : ${chalk.hex('#FF8800')(time)}`
    );
  } else {
    console.log(
      chalk.bgRed("[ ERROR PRIVATE ]"),
      `\n${chalk.cyan("TEKS")}     : ${chalk.green(command)}`,
      `\n${chalk.cyan("👤 DARI")}  : ${chalk.keyword('orange')(m.pushname)}`,
      `\n${chalk.cyan("🆔 ID")}    : ${chalk.hex('#FFA500')(idConsole)}`,
      `\n${chalk.cyan("⏰ WAKTU")} : ${chalk.hex('#FF8800')(time)}`
    );
  }
};
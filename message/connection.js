"use strict";
const makeWASocket = require("baileys").default;
const { Browsers, DisconnectReason, fetchLatestBaileysVersion } = require("baileys");
const chalk = require("chalk");
const { Boom } = require("@hapi/boom");
const spin = require("spinnies");
const { sleep } = require("../lib/myfunc");

const spinner = {
  interval: 130,
  frames: [
    "✖ [░░░░░░░░░░░░░░░]",
    "✖ [■░░░░░░░░░░░░░░]",
    "✖ [■■░░░░░░░░░░░░░]",
    "✖ [■■■░░░░░░░░░░░░]",
    "✖ [■■■■░░░░░░░░░░░]",
    "✖ [■■■■■░░░░░░░░░░]",
    "✖ [■■■■■■░░░░░░░░░]",
    "✖ [■■■■■■■░░░░░░░░]",
    "✖ [■■■■■■■■░░░░░░░]",
    "✖ [■■■■■■■■■░░░░░░]",
    "✖ [■■■■■■■■■■░░░░░]",
    "✖ [■■■■■■■■■■■░░░░]",
    "✖ [■■■■■■■■■■■■░░░]",
    "✖ [■■■■■■■■■■■■■░░]",
    "✖ [■■■■■■■■■■■■■■░]",
    "✖ [■■■■■■■■■■■■■■■]",
  ],
};

let globalSpinner;
const getGlobalSpinner = (disableSpins = false) => {
  if (!globalSpinner)
    globalSpinner = new spin({
      color: "blue",
      succeedColor: "green",
      spinner,
      disableSpins,
    });
  return globalSpinner;
};
let spins = getGlobalSpinner(false);

const start = (id, text) => {
  spins.add(id, { text: text });
};
const success = (id, text) => {
  spins.succeed(id, { text: text });
};
const fail = (id, text) => {
  spins.fail(id, { text: text });
};

const connectionUpdate = async (connectToWhatsApp, conn, update) => {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const {
    connection,
    lastDisconnect,
    receivedPendingNotifications,
    isNewLogin,
    qr,
  } = update;

  const reason = new Boom(lastDisconnect?.error)?.output.statusCode;

  // Handle connection close scenarios
  if (connection === "close") {
    console.log(chalk.red(lastDisconnect.error));

    if (reason === DisconnectReason.badSession) {
      console.log(`Bad Session File, Please Delete Session and Scan Again`);
      process.send("reset");
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log("[SYSTEM]", chalk.red("Connection closed, reconnecting..."));
      process.send("reset");
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(
        chalk.red("[SYSTEM]", "white"),
        chalk.green("Connection lost, trying to reconnect")
      );
      process.send("reset");
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(
        chalk.red(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First"
        )
      );
      conn.logout();
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.red(`Device Logged Out, Please Scan Again And Run.`));
      conn.logout();
    } else if (reason === DisconnectReason.restartRequired) {
      console.log("Restart Required, Restarting...");
      connectToWhatsApp();
      process.send("reset");
    } else if (reason === DisconnectReason.timedOut) {
      console.log(chalk.red("Connection TimedOut, Reconnecting..."));
      connectToWhatsApp();
    } else {
      console.log("Unknown Disconnect Reason, reconnecting...");
      process.send("reset");
    }
  }

  // Handle connection status
  if (connection === "connecting") {
    console.log(
        chalk.magenta(`]─`),
        `「`,
        chalk.cyan(`Rangelofficial`),
        `」`,
        chalk.magenta(`─[`)
    );

    // Periksa apakah spinner ID 1 sudah diinisialisasi
    if (!global.pairingCode["1"]) {
        console.log("Initializing spinner ID 1...");
        start(`1`, `Connecting...`);
    }
}

if (connection === "open") {
    console.log("Connection opened!");

    // Pastikan spinner ID 1 selalu ada sebelum memperbarui
    if (!global.pairingCode["1"]) {
        console.log("Spinner ID 1 not found. Initializing now...");
        start(`1`, `Reconnecting...`);
    }

    success(`1`, `[■■■■■■■■■■■■■■■] Connected`);

   
conn.sendMessage(`${ownerNumber}`, {
    text: 'Tersambung Kembali.\n\nSilakan baca panduan bot untuk memulai penggunaan. Untuk informasi lebih lanjut, ketik .panduanbot.',

        contextInfo: {
            externalAdReply: {
                title: "Menhera Bσт ✅ ",
                body: `Suport Kami Kak`,
                thumbnailUrl: "https://raw.githubusercontent.com/Rangelofficial/Uploade-db/main/uploader/1735154206994.jpg",
                sourceUrl: `https://youtube.com/@rangelbot`,
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        },
    });
       //await sleep(400)
    

    // Handle restart case
    const bot = db.data.others["restart"];
    if (bot) {
      const m = bot.m;
      const from = bot.from;
      let text = "Bot is connected";
      await conn.sendMessage(from, { text }, { quoted: m });
      delete db.data.others["restart"];
    }
  }
};

module.exports = { connectionUpdate };

  
      
    
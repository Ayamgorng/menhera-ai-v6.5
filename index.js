const chalk = require("chalk");
const axios = require("axios");
const path = require("path");
const cluster = require("cluster");
const fs = require("fs-extra");
const express = require("express");
const Readline = require("readline");

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const app = express();
const rl = Readline.createInterface(process.stdin, process.stdout);
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

let error = 0;
let isRunning = false;

/**
 * Start a JS file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return;
  isRunning = true;

  const args = [path.join(__dirname, file), ...process.argv.slice(2)];
  cluster.setupPrimary({
    exec: path.join(__dirname, file),
    args: args.slice(1),
  });

  const worker = cluster.fork();

  worker.on("message", (data) => {
    switch (data) {
      case "reset":
        console.log(chalk.yellow("Bot sedang di-reset..."));
        restartWorker(worker, file);
        break;
      case "null":
      case "SIGKILL":
        restartWorker(worker, file);
        break;
      case "uptime":
        worker.send(process.uptime());
        break;
      default:
        console.log(chalk.cyan(`[Worker Message] ${data}`));
        break;
    }
  });

  worker.on("exit", (code) => {
    console.error(chalk.red(`🛑 Worker exited with code: ${code}`));
    if (error >= 5) {
      console.log(
        chalk.yellowBright.bold(
          `Error lebih dari 5 kali. Sistem dihentikan sementara selama 1 jam.`
        )
      );
      setTimeout(() => {
        error = 0;
        start(file);
        console.log(chalk.yellowBright.bold(`Sistem kembali berjalan.`));
      }, 60 * 60 * 1000); // 1 jam
    } else {
      error++;
      restartWorker(worker, file);
    }
  });

  worker.on("error", (err) => {
    console.error(chalk.red(`❌ Worker Error: ${err.message}`));
    error++;
    restartWorker(worker, file);
  });

  worker.on("unhandledRejection", (reason) => {
    console.error(
      chalk.red(`❌ Unhandled Rejection: ${reason}. Restarting worker...`)
    );
    error++;
    restartWorker(worker, file);
  });
}

function restartWorker(worker, file) {
  console.log(chalk.yellowBright("🔄 Restarting worker..."));
  worker.process.kill();
  isRunning = false;
  sleep(5000).then(() => start(file));
}



start("main.js");



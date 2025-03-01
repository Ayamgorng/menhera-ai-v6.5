const fs = require('fs-extra')
let handler = (m) => m;
handler.before = async function (m, { hanz }) {
  let id = m.chat;
  let reward = 9999;
  let body = typeof m.text == "string" ? m.text : false;
  let user = db.data.users[m.sender];
  hanz.tebakbom = hanz.tebakbom ? hanz.tebakbom : {};
  if (!(id in hanz.tebakbom) && m.quoted && /❏  *B O M B*/i.test(m.quoted.text))
    return hanz.reply(
      m.chat,
      `Sesi telah berakhir, silahkan kirim .tebakbom untuk membuat sesi baru.`,
      m
    );
  if (id in hanz.tebakbom && !isNaN(body)) {
    let timeout = 180000;
    let json = hanz.tebakbom[id][1].find((v) => v.position == body);
    if (!json)
      return hanz.reply(m.chat, `Untuk membuka kotak kirim angka 1 - 9`, m);
    if (json.emot == "💥") {
      json.state = true;
      let bomb = hanz.tebakbom[id][1];
      let teks = `❏  *B O M B*\n\n`;
      teks += `Duaarrr bom meledak!\n\n`;
      teks +=
        bomb
          .slice(0, 3)
          .map((v) => (v.state ? v.emot : v.number))
          .join("") + "\n";
      teks +=
        bomb
          .slice(3, 6)
          .map((v) => (v.state ? v.emot : v.number))
          .join("") + "\n";
      teks +=
        bomb
          .slice(6)
          .map((v) => (v.state ? v.emot : v.number))
          .join("") + "\n\n";
      teks += `Timeout : [ *${timeout / 1000 / 60} menit* ]\n`;
      teks += `*Permainan selesai!*, kotak berisi bom terbuka.`;
      hanz.sendFile(
        m.chat,
        "https://pomf2.lain.la/f/8g3ue5em.jpg",
        "",
        teks,
        m
      );
      clearTimeout(hanz.tebakbom[id][2]);
      delete hanz.tebakbom[id];
    } else if (json.state) {
      return hanz.reply(
        m.chat,
        `Kotak ${json.number} sudah di buka silahkan pilih kotak yang lain.`,
        m
      );
    } else {
      json.state = true;
      let changes = hanz.tebakbom[id][1];
      let open = changes.filter((v) => v.state && v.emot != "💥").length;
      if (open >= 8) {
        let teks = `❏  *B O M B*\n\n`;
        teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
        teks +=
          changes
            .slice(0, 3)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n";
        teks +=
          changes
            .slice(3, 6)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n";
        teks +=
          changes
            .slice(6)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n\n";
        teks += `Timeout : [ *${timeout / 1000 / 60} menit* ]\n`;
        teks += `*Permainan selesai!* kotak berisi bom tidak terbuka : (+ *${reward}* Exp )`;
        hanz.sendFile(
          m.chat,
          "https://telegra.ph/file/f6ebfea2758b947e1e49d.jpg",
          "",
          teks,
          m
        );
        db.data.users[m.sender].exp += reward;
        clearTimeout(hanz.tebakbom[id][2]);
        delete hanz.tebakbom[id];
      } else {
        let teks = `❏  *B O M B*\n\n`;
        teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
        teks +=
          changes
            .slice(0, 3)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n";
        teks +=
          changes
            .slice(3, 6)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n";
        teks +=
          changes
            .slice(6)
            .map((v) => (v.state ? v.emot : v.number))
            .join("") + "\n\n";
        teks += `Timeout : [ *${timeout / 1000 / 60} menit* ]\n`;
        teks += `Kotak berisi bom tidak terbuka.`;
        hanz.reply(m.chat, teks, m).then(() => {
          if (user) db.data.users[m.sender].exp += reward;
        });
      }
    }
  }
};

module.exports = handler;

async function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

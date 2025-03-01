	

const { checkDataId, createDataId, addDataId } = require("../../lib/totalcmd");

let handler = async (m, { q, prefix, setReply }) => {
const DataId = db.data.data;

  let nana = await DataId.filter((item) => item.name == "commands");
  let teks = "┌  List Commands For Owner\n";
  let nunu = nana[0].id;
  for (let i of nunu) {
    teks += `╰ ◦ ${i}\n`;

  }


  setReply(teks);

};

handler.help = ["listcmdowner"];
handler.tags = ["settings"];
handler.command = ["listcmdowner"];
handler.owner = true;

module.exports = handler;

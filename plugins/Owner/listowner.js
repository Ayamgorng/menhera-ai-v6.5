const { Nothing,Failed,Succes,addAutoClear,autoClearChat, checkDataName, createDataId, addDataId, removeDataId, checkDataId, getHit, cmdAdd, expiredCmd } = require("../../lib/totalcmd");

let handler = async (m, { q, isOwner, setReply, command }) => {
  const DataId = db.data.data;

  if (!checkDataName("owner", q, DataId)) {
    await createDataId("owner", DataId);
  }
  let nana = await DataId.filter((item) => item.name == "owner");
  if (!nana) return setReply("Tidak ada");
  let teks = "List Owner\n";
  let nunu = nana[0].id;
  for (let i of nunu) {
    teks += `- wa.me/${i.split("@")[0]} \n`;
  }
  setReply(teks);
};
handler.command = ["listowner"];
handler.owner = true;
module.exports = handler;
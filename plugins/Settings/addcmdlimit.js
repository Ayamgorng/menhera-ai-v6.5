const { checkDataName,createDataId,removeDataId,checkDataId,addDataId } = require("../../lib/totalcmd")
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!isOwner) return setReply(mess.only.ownerB);
  if (!q) return setReply(mess.query);
  if (checkDataId("limit", q, DataId))
    return setReply("Command sudah ada di database");
  if (!checkDataName("limit", q, DataId)) {
    await _data.createDataId("limit", DataId);
  }
  addDataId(q, "limit", DataId);
  setReply(`Berhasil menambahkan ${q} ke daftar fitur limit`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["addcmdlimit"];
module.exports = handler;
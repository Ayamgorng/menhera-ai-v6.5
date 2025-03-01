const { checkDataName,createDataId,removeDataId,checkDataId,addDataId } = require("../../lib/totalcmd")
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!q) return setReply(mess.query);
  if (!isOwner) return setReply(mess.only.ownerB);

  if (!checkDataId("limit", q, DataId))
    return setReply("Command tidak ada di database");
  removeDataId("limit", q, DataId);
  setReply(`Berhasil menghapus ${q} ke daftar fitur limit`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["delcmdlimit"];
module.exports = handler;
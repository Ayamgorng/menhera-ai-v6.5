const { checkDataName,createDataId,removeDataId,checkDataId } = require("../../lib/totalcmd")
let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!q) return setReply(mess.query);
  if (!isOwner) return setReply(mess.only.ownerB);

  if (!checkDataId("premium", q, DataId))
    return setReply("Command tidak ada di database");
  removeDataId("premium", q, DataId);
  setReply(`Berhasil menghapus ${q} ke daftar fitur premium`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["delcmdprem"];
module.exports = handler;
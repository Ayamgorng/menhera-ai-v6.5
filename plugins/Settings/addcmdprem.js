const { checkDataName,createDataId,removeDataId,addDataId,checkDataId } = require("../../lib/totalcmd")

let handler = async (m, { q, isOwner, setReply }) => {
  const DataId = db.data.data;

  if (!isOwner) return setReply(mess.only.ownerB);
  if (!q) return setReply(mess.query);
  if (checkDataId("premium", q, DataId))
    return setReply("Command sudah ada di database");
  if (!checkDataName("premium", q, DataId)) {
    await createDataId("premium", DataId);
  }
  addDataId(q, "premium", DataId);
  setReply(`Berhasil menambahkan ${q} ke daftar fitur premium`);
};
handler.help = ["addowner reply nomer"];
handler.tags = ["owner"];
handler.command = ["addcmdprem"];
module.exports = handler;
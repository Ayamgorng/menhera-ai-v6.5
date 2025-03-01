const { checkDataId,createDataId,addDataId,checkDataName } = require("../../lib/totalcmd");

 let handler = async (m, { q,prefix,setReply }) => {
 const DataId = db.data.data;
if(!q) return setReply(mess.query)
	if(checkDataId("commands", q,  DataId)) return setReply(`${q} sudah menjadi cmd owner`)
	if(!checkDataName("commands", q, DataId)) { await createDataId("commands", DataId) }
	addDataId(q, "commands", DataId)
	setReply(`Berhasil menambahkan ${q} ke daftar fitur owner`)
	}
	
handler.help = ['addcmdowner'];
handler.tags = ['settings'];
handler.command = ['addcmdowner'];
handler.owner = true

module.exports = handler;
const { checkDataId,createDataId,addDataId,removeDataId } = require("../../lib/totalcmd");

 let handler = async (m, { q,prefix,setReply }) => {
 
if(!q) return setReply(mess.query)
	  try {
          const DataId = db.data.data;
	  if(!checkDataId("commands", q, DataId)) return setReply(`${q} bukan cmd owner`)
	  removeDataId ("commands", q, DataId)
	  setReply(`Berhasil menghapus ${q} ke daftar fitur owner`)
	  } catch (err){
	  console.log(err)
	  setReply(`${err}`)
	  }
	  }
	
handler.help = ['delcmdowner'];
handler.tags = ['settings'];
handler.command = ['delcmdowner'];
handler.owner = true

module.exports = handler;
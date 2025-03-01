const fs = require("fs")
const { addError,clearAllError, deleteError, checkError } = require("../../lib/totalerror")



let handler = async (m, { text, q, hanz,reply, setReply }) => {
const listerror = db.data.listerror
	if (!m.itsMe && !m.isOwner) return reply (mess.only.ownerB)
	listerror.splice(q, 1)
	fs.writeFileSync('./database/listerror.json', JSON.stringify(listerror))
	setReply( `Sukses menghapus ${q} di daftar error`)
	}
handler.help = ["delerror"];
handler.tags = ["check"];
handler.command = /^(delerror)$/i;
handler.owner = true;
module.exports = handler;
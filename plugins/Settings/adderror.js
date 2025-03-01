const { addError,clearAllError, deleteError, checkError } = require("../../lib/totalerror")


let handler = async (m, { text, q, hanz,reply,isOwner, setReply }) => {
const listerror = db.data.listerror
	if (!q) return setReply(`Yang error apa bro ?\nContoh: .adderror menu`)
	if (!m.key.fromMe && !isOwner) return reply (mess.only.ownerB)
	let oke = q.split("|")[0]
	let oka = q.split("|")[1]
	addError(oke, oka, listerror)
	await setReply(`Sukses Menambahkan ${q} ke daftar error`)
	};
handler.help = ["adderror"];
handler.tags = ["check"];
handler.command = /^(adderror)$/i;
handler.owner = true;
module.exports = handler;
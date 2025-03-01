const { addError,clearAllError, deleteError, checkError } = require("../../lib/totalerror")
let handler = async (m, { text, q, hanz,reply, setReply }) => {

const listerror = db.data.listerror
reply("SukseS clear all error")
	clearAllError(listerror)
	}
handler.help = ["clearallerror"];
handler.tags = ["check"];
handler.command = /^(clearallerror|clearerror)$/i;
handler.owner = true;
module.exports = handler;
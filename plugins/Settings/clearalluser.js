let handler = async (m, { setReply }) => {
 
setReply("Sukses clear all User")
	db.data.users = {}

}
handler.help = ['clearalluser'];
handler.tags = ['settings'];
handler.command = ['clearalluser'];
handler.owner = true

module.exports = handler;
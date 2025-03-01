let handler = async (m, { setReply }) => {
 
setReply("Sukses clear all toxic")
db.data.toxic = []

}
handler.help = ['cleartoxic'];
handler.tags = ['settings'];
handler.command = ['cleartoxic'];

module.exports = handler;
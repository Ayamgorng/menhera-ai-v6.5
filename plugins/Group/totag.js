let handler = async (m, { hanz, text, participants}) => {
	let users = participants.map(u => u.id).filter(v => v !== hanz.user.jid)
    if (!m.quoted) throw `✳️ Reply Pesan`
    hanz.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users } )
}

handler.help = ['totag']
handler.tags = ['group']
handler.command = /^(totag)$/i

handler.admin = true
handler.group = true

module.exports = handler
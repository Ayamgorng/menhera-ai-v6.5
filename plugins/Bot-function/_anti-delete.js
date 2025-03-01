let handler = (m) => m;

handler.before = async function (m, { hanz,isPremium,isOwner,chatUpdate }) {
    const isAntidelete = m.isGroup ? db.data.chats[m.chat].antidelete : false
//ANTI DELETE
if(m.type == 'protocolMessage' && isAntidelete){
    let mess = chatUpdate.messages[0].message.protocolMessage
    let chats = Object.entries(await hanz.chats).find(([user, data]) => data.messages && data.messages[mess.key.id])
    if(chats[1] == undefined) return
    if(chats[1] !== undefined){
    let msg = JSON.parse(JSON.stringify(chats[1].messages[mess.key.id]))
    await hanz.copyNForward(mess.key.remoteJid, msg).catch(e => console.log(e, msg))
    }
    }

};
module.exports = handler;

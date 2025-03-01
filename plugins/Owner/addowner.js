const { Nothing,Failed,Succes,addAutoClear,autoClearChat, checkDataName, createDataId, addDataId, removeDataId, checkDataId, getHit, cmdAdd, expiredCmd } = require("../../lib/totalcmd");

let handler = async (m, {q,conn,isOwner,setReply,args,usedPrefix,command,onlyOwner}) => {
    
    const DataId = db.data.data
    const Input = !m.isGroup? m.numberQuery : m.mentionByTag[0]? m.mentionByTag[0] : m.mentionByReply ? m.mentionByReply : q? m.numberQuery : false
        //if (!isOwner) return onlyOwner()
        //if (!m.isGroup) return setReply(mess.only.group)
    if(!q) return setReply("Masukan nomer target")
        if(checkDataId("owner", Input,  DataId)) return setReply("User sudah menjadi owner")
        if(!checkDataName("owner", Input, DataId)) { await createDataId("owner", DataId) }
        addDataId(Input, "owner", DataId)
        setReply(`Berhasil menambahkan ${Input.split("@")[0]} ke daftar owner`)
       
    
}
handler.help = ["addowner reply nomer"]
handler.tags = ["owner"];
handler.command = ['addowner']
handler.owner = true
module.exports = handler
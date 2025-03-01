let handler = async (m, { hanz,  q, setReply,prefix,command }) => {

  if(!q) return setReply(`Contoh ${prefix+command} lala|lulu`)
      let listData = global.db.data.respon[q]
if(!listData) return setReply(`List ${q} tidak ada di database`)	
if(listData) delete global.db.data.respon[q]
setReply(`Berhasil menghapus respon ${q}`)
 }
  
handler.command = ["delrespon"];
handler.owner = true;

module.exports = handler;

let handler = async (m, { hanz,  q, setReply,prefix,command }) => {

  if(!q) return setReply(`Contoh ${prefix+command} lala|lulu`)
  if(q.length > 100) return setReply("Teks pertama tidak boleh panjang, max 100 huruf")
  let data = q.split("|")[0]
  let respon = q.split("|")[1]

  let listData = global.db.data.respon[data] 	
  if(listData){
    return setReply(`List ${data} sudah ada di database`)
    } else global.db.data.respon[data] = {
    id:m.senderNumber,
    respon:respon			
    } 
  setReply(`Berhasil menambahkan list ${data}`)
  }


handler.command = ["addrespon"];
handler.owner = true;

module.exports = handler;
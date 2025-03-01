const fs = require('fs-extra')

let handler = async (m, {q, hanz, isOwner, setReply, args, usedPrefix, command}) => {
  if (!isOwner && !m.itsMe) return setReply(mess.only.ownerB)
  if (!q) {
    return setReply(`Cara Penggunaan: 
      *${usedPrefix}${command} <teks polling> | <pilihan 1> | <pilihan 2> | ... | <pilihan n>*
      
      Contoh: 
      *${usedPrefix}${command} Siapa yang paling keren? | Saya | Kamu | Mereka*`)
  }
  let getGroups = await hanz.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  
  // Ambil ID grup yang bukan komunitas atau komunitas pengumuman
  let groupsToSend = groups.filter(i => !i.isCommunity && !i.isCommunityAnnounce)

  // Menghitung estimasi waktu untuk broadcast
  setReply(`Mengirim Broadcast Ke ${groupsToSend.length} Grup, Waktu Selesai ${groupsToSend.length * 0.5} detik`)

  // Looping untuk mengirim polling ke setiap grup
  for (let group of groupsToSend) {
    let groupId = group.id

    let a = q.split("|").slice(1) // Ambil pilihan polling
    if (a.length < 2) return setReply("Format polling salah, minimal 2 pilihan!")
    if (a.length > 12) return setReply("Kebanyakan pilihan, maksimal 12 pilihan!")
    if (checkDuplicate(a)) return setReply("Ada pilihan yang duplikat!")

    let cap = `🎉 *Broadcast Polling Survei* 🎉\n
Dari *${m.name}*, berikut adalah survei/polling yang ingin kami lakukan!
Date : ${calender}

📝 *Pertanyaan:* ${q.split("|")[0]}\n
📊 *Pilih salah satu opsi di bawah ini untuk memberikan suara Anda:`

    const pollMessage = {
      name: cap,
      values: a,
      multiselect: false,
      selectableCount: 1
    }

    // Mengirim polling ke grup
    await hanz.sendMessage(groupId, {
      poll: pollMessage
    })
  }

  setReply(`Sukses Mengirim Broadcast Ke ${groupsToSend.length} Grup`)

}

handler.help = ["broadcastpolling"]
handler.tags = ["owner"]
handler.command = ['bcgcpoll']

module.exports = handler

// Fungsi untuk mengecek duplikat dalam array
function checkDuplicate(arr) {
  return new Set(arr).size !== arr.length
}
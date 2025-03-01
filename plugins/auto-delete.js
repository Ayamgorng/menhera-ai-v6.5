// plugins/auto-delete.js
module.exports = {
  name: 'auto-delete',
  async init(conn) {
    setInterval(async () => {
      try {
        const chats = conn.store.chats.all() // Ambil semua chat dari store
        for (const chat of chats) {
          await conn.clearMessages(chat.id) // Hapus pesan di chat
            .then(() => console.log(`Berhasil hapus pesan di ${chat.name || chat.id}`))
            .catch(e => console.error('Gagal hapus pesan:', e))
        }
      } catch (error) {
        console.error('Error auto-delete:', error)
      }
    }, 5 * 60 * 1000) // 5 menit
  }
}

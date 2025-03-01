const path = require('path')
const fs = require('fs')
const dbPath = path.join(__dirname, '../database/database.json')

// Cek apakah file database ada, jika tidak buat file baru dengan objek kosong
let db = {}
if (fs.existsSync(dbPath)) {
  db = require(dbPath)
} else {
  db = { settings: { autodelete: false } }
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

module.exports = {
  name: 'auto-delete',
  timer: null,
  isEnabled: false,

  async init(conn) {
    // Inisialisasi setting jika belum ada
    if (!db.settings) db.settings = {}
    if (typeof db.settings.autodelete === 'undefined') db.settings.autodelete = false

    // Jika autodelete aktif di database, mulai auto delete
    if (db.settings.autodelete) {
      this.startAutoDelete(conn)
    }
  },

  startAutoDelete(conn) {
    this.isEnabled = true
    // Interval 300000 ms = 5 menit
    this.timer = setInterval(async () => {
      try {
        // Ambil semua chat dari store, pastikan conn.store.chats.all() tersedia
        const chats = conn.store?.chats?.all() || []
        for (const chat of chats) {
          // Hapus pesan pada chat dengan ID chat.id
          await conn.clearMessages(chat.id)
            .then(() => console.log(`[AUTO-DELETE] Pesan di ${chat.name || chat.id} telah dihapus`))
            .catch(err => console.error('[AUTO-DELETE] Error menghapus pesan:', err))
        }
      } catch (error) {
        console.error('[AUTO-DELETE] Error:', error)
      }
    }, 300000) // 5 menit
  },

  stopAutoDelete() {
    this.isEnabled = false
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  command: {
    name: 'autodelete',
    tags: 'tools',
    desc: 'Auto delete pesan setiap 5 menit',
    use: '<enable/disable/status>',
    
    async exec({ conn, args, reply }) {
      const [cmd] = args
      if (!db.settings) db.settings = {}
      if (typeof db.settings.autodelete === 'undefined') db.settings.autodelete = false

      switch ((cmd || '').toLowerCase()) {
        case 'enable':
          if (module.exports.isEnabled) return reply('Auto delete sudah aktif!')
          module.exports.startAutoDelete(conn)
          db.settings.autodelete = true
          fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
          reply('✅ Auto delete diaktifkan')
          break

        case 'disable':
          if (!module.exports.isEnabled) return reply('Auto delete sudah nonaktif!')
          module.exports.stopAutoDelete()
          db.settings.autodelete = false
          fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
          reply('❌ Auto delete dimatikan')
          break

        case 'status':
          reply(`Status auto-delete: ${module.exports.isEnabled ? 'AKTIF' : 'NONAKTIF'}`)
          break

        default:
          reply('Penggunaan: .autodelete enable/disable/status')
      }
    }
  }
}

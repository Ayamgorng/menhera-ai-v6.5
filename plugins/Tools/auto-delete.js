// plugins/Tools/auto-delete.js
const path = require('path')
const dbPath = path.join(__dirname, '../database/database.json')
const db = require(dbPath)

module.exports = {
  name: 'auto-delete',
  timer: null,
  isEnabled: false,

  async init(conn) {
    // Initialize settings if not exist
    if (!db.settings) db.settings = {}
    if (typeof db.settings.autodelete === 'undefined') db.settings.autodelete = false
    
    if (db.settings.autodelete) {
      this.startAutoDelete(conn)
    }
  },

  startAutoDelete(conn) {
    this.isEnabled = true
    this.timer = setInterval(async () => {
      try {
        const chats = conn.store.chats.all()
        for (const chat of chats) {
          await conn.clearMessages(chat.id)
            .then(() => console.log(`[AUTO-DELETE] Cleared ${chat.name || chat.id}`))
            .catch(e => console.error('Delete error:', e))
        }
      } catch (error) {
        console.error('Auto-delete error:', error)
      }
    }, 300000)
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
    desc: 'Auto delete messages every 5 minutes',
    use: '<enable/disable/status>',
    
    async exec({ conn, args, reply }) {
      const [cmd] = args
      
      // Initialize settings if not exist
      if (!db.settings) db.settings = {}
      if (typeof db.settings.autodelete === 'undefined') db.settings.autodelete = false

      switch (cmd?.toLowerCase()) {
        case 'enable':
          if (this.plugin.isEnabled) return reply('Auto delete sudah aktif!')
          this.plugin.startAutoDelete(conn)
          db.settings.autodelete = true
          reply('✅ Auto delete diaktifkan')
          break

        case 'disable':
          if (!this.plugin.isEnabled) return reply('Auto delete sudah nonaktif!')
          this.plugin.stopAutoDelete()
          db.settings.autodelete = false
          reply('❌ Auto delete dimatikan')
          break

        case 'status':
          reply(`Status auto-delete: ${this.plugin.isEnabled ? 'AKTIF' : 'NONAKTIF'}`)
          break

        default:
          reply(`Penggunaan: .autodelete enable/disable/status`)
      }
    }
  }
}

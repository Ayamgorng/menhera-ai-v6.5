let handler = async (m, { hanz,setReply }) => {

    
let on = Ehztext(`*[ Silakan di pilih ]*

${gris}settinggroup${gris}

- welcome
- updategempa
- antidelete
- antipromosi
- antivirtex
- antiasing
- antilink
- antilinkgc
- antilinkch
- viewonce
- antiimage
- antisticker
- antivideo
- antiaudio
- antispam
- antibot
- banchat
- unbanchat
- simi

${gris}settingbot${gris}

- setreply
- autobio
- autodetectcmd
- setmenu
- anticall
- anticulik
- autosticker
- autolevel
- autoread
- console

contoh : 
.antilink on untuk mengaktifkan
.antilink off untuk menonaktifkan`)
setReply(on)
}
handler.help = ["on"];
handler.tags = ["group"];
handler.command = ["on"];

module.exports = handler;



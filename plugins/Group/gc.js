let handler = async (m, { q, hanz, text, setReply, command,onlyToko,onlyAdmin,onlyBadmin, usedPrefix }) => {
  if (!m.isGroup) return onlyToko()
  if (!m.isAdmin) return onlyAdmin()
  if (!m.isBotAdmin) return onlyBadmin()

  if (command == "gc" && q == "close") {
    hanz.groupSettingUpdate(m.chat, "announcement");
    setReply(`Group telah di tutup`);
  } else if (command == "gc" && q == "open") {
    hanz.groupSettingUpdate(m.chat, "not_announcement");
    setReply(`Group telah di buka`);
  }  if (command == "close") {
    hanz.groupSettingUpdate(m.chat, "announcement");
    setReply(`Group telah di tutup`);
  } else if (command == "open") {
    hanz.groupSettingUpdate(m.chat, "not_announcement");
    setReply(`Group telah di buka`);
  } else if(command == "gc" && !q) {
    setReply(
      `Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`
    );
  }
};
handler.help = ["gc open/close"];
handler.tags = ["admin"];
handler.command = ["gc", "group"];
handler.group = true;
handler.admin = true;
module.exports = handler;
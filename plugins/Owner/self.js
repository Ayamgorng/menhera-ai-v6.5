let handler = async (m, { hanz, isOwner, q, setReply, command, text,onlyOwner }) => {
  var publik = db.data.settings["settingbot"].publik;

  if (!isOwner) return onlyOwner()
  if (publik == false) return setReply("Udah di mode self kak");
  db.data.settings["settingbot"].publik = false;
  let breh = `Mode self aktif kak`;
  setReply(breh);
};

handler.command = ["self"];
module.exports = handler;
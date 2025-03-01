let handler = async (m, { hanz, isOwner, q, setReply, command, text,onlyOwner }) => {
var publik = db.data.settings["settingbot"].publik;
  if (!isOwner) return onlyOwner();
  if (publik) return setReply("Udah di mode publick kak");
  db.data.settings["settingbot"].publik = true;
  let bab = `Mode public aktif kak`;
  setReply(bab);
};


handler.command = ["public","publik"];
module.exports = handler;
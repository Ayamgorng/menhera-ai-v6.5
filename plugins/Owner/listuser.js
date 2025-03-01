const handler = async (m) => {
  let users = global.db.data.users;  
  if (Object.keys(users).length === 0) {
    return m.reply("Belum ada user yang terdaftar.");
  }
let listUsers = '📋 Daftar Pengguna:\n\n';
for (let id in users) {
    let user = users[id];
    listUsers += `• Nama: ${user.name} \n  ID: ${user.id}\nIP :${user.ip}\nEmail : ${user.email}\n\n`; 
  }
listUsers += `Total Pengguna: ${Object.keys(users).length}`;

  m.reply(listUsers);
};

handler.help = ["listuser"];  
handler.tags = ["admin"];  
handler.command = /^listuser$/i;  

module.exports = handler;
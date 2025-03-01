let handler = async (m, { hanz,setReply}) => {
  try {
    

    // Konfigurasi reward
    const freeExp = 5000;
    const premExp = 10000;
    const freeMoney = 5000;
    const premMoney = 10000;
    const timeout = 86400000; // 24 jam

    // Ambil data pengguna
    let user = global.db.data.users[m.sender];
    if (!user) {
      return setReply("⚠️ Anda belum terdaftar. Silakan gunakan bot terlebih dahulu.");
    }

    // Periksa waktu klaim terakhir
    let lastClaim = user.lastclaim || 0;
    let remainingTime = timeout - (new Date() - lastClaim);
    if (remainingTime > 0) {
      let timeLeft = hanz.msToTime(remainingTime);
      return hanz.reply(
        m.chat,
        `❌ Anda sudah mengklaim hadiah harian hari ini.\nSilakan klaim lagi dalam ${timeLeft}.`,
        m
      );
    }

    // Berikan reward
    let rewardExp = m.isPremium ? premExp : freeExp;
    let rewardMoney = m.isPremium ? premMoney : freeMoney;

    user.exp += rewardExp;
    user.balance += rewardMoney;
    user.lastclaim = new Date().getTime();

    // Kirim balasan sukses
    return hanz.reply(
      m.chat,
      `🎉 Selamat! Anda mendapatkan:\n\n+${rewardExp} Exp\n+Rp.${rewardMoney.toLocaleString()} Balance\n\nKlaim lagi besok!`,
      m
    );
  } catch (err) {
    console.error(err);
    hanz.reply(m.chat, "❌ Terjadi kesalahan saat memproses klaim harian.", m);
  }
};

handler.help = ['claim', 'claimgame'];
handler.tags = ['daily'];
handler.command = /^(claim|claimgame)$/i;
handler.noCmdStore = true
module.exports = handler;

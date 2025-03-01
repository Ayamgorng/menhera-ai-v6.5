const handler = async (m, { hanz, setReply }) => {
  try {
   
    if (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage) {
      const dataVideo = { ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage };
      await hanz.relayMessage(m.chat, dataVideo, {});
    } else {
      setReply('Reply video atau kirim video terlebih dahulu');
    }
  } catch (error) {
    console.error(error);
    setReply('Terjadi kesalahan saat memproses video!');
  }
};

handler.help = ['toptv'];
handler.command = ['toptv'];
handler.tags = ['media'];
handler.noCmdStore = true
handler.onlyGroup = true
handler.description = ["video anda jadi bulat"]

module.exports = handler;

let handler = async (m, { hanz}) => {
  const isQuotedViewOnce = m.mtype === 'extendedTextMessage' && m.content.includes('viewOnceMessage');
  const isViewOnce = m.mtype === 'viewOnceMessage';
const isAntiViewOnce = m.isGroup ? db.data.chats[m.chat].isAntiViewOnce : false;
  if ((isViewOnce || isQuotedViewOnce) && (isAntiViewOnce || m.budy.startsWith("Readviewonce"))) {
    const { downloadContentFromMessage } = (await import('baileys')).default;

    let view;
    if (isQuotedViewOnce) {
      view = m.quoted.message;
    } else {
      view = m.message.viewOnceMessage.message;
    }

    let Type = Object.keys(view)[0];
    let media = await downloadContentFromMessage(view[Type], Type === 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.concat([]);

    for await (const chunk of media) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    if (/video/.test(Type)) {
      hanz.sendFile(m.chat, buffer, 'media.mp4', view[Type].caption || '', m);
    } else if (/image/.test(Type)) {
      hanz.sendFile(m.chat, buffer, 'media.jpg', view[Type].caption || '', m);
    }
  }
};

module.exports = handler;

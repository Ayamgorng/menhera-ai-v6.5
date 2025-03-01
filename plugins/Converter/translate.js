const translate = require('translate-google-api');


const handler = async (m, { hanz, prefix, command, args,setReply }) => {
  let defaultLang = 'en'; 
  let tld = 'cn';
  const toks = `
Contoh:
${prefix + command} <lang> [text]
${prefix + command} id your messages
Daftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages
  `.trim();

  let lang = args[0];
  let text = args.slice(1).join(' ');

  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text;
  let result;
  try {
    result = await translate(`${text}`, { to: lang });
  } catch (e) {
    result = await translate(`${text}`, { to: defaultLang });
    m.reply(toks);
  } finally {
    m.reply(result[0]);
  }
};

handler.help = ['translate', 'trans'];
handler.command = ['translate', 'tr'];
handler.tags = ['convert'];
handler.onlyGroup = false
handler.description = ["penerjemah bahasa"]


module.exports = handler;

const axios = require('axios');
const { GIFBufferToVideoBuffer,fetchJson } = require('../../lib/myfunc'); // Pastikan fungsi ini ada


let handler = async (m, { command, hanz, setReply,sendReact }) => {
  if (command === 'hug') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/hug');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];

      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} hugged themselves!`;
      } else {
        musers = `@${m.sender.split('@')[0]} hugged @${users.split('@')[0]}`;
      }

      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);

      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }

  if (command === 'cry') {
    


    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/cry');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];

      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} cried themselves!`;
      } else {
        musers = `@${m.sender.split('@')[0]} cried for @${users.split('@')[0]}`;
      }

      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);

      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
 if (command === 'kill') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/kill');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];

      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} killed themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} killed @${users.split('@')[0]}`;
      }

      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);

      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
 if (command === 'pat') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/pat');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];

      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} killed themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} killed @${users.split('@')[0]}`;
      }

      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);

      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
    if (command === 'lick') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
    const pat = await fetchJson('https://api.waifu.pics/sfw/lick');
        sendReact('🕚')
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} licked themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} licked @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
          if (command === 'kiss') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
              sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/kiss');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} kissed themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} kissed @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
            if (command === 'bite') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
                sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/bite');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} bit themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} bit @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
              if (command === 'yeet') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
                  sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/yeet');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} yeeted themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} yeeted @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
              if (command === 'bully') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
                  sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/bully');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} bullied themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} bullied @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
   if (command === 'bonk') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
       sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/bonk');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} bonked themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} bonked @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
if (command === 'wink') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
    sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/wink');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} winked themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} winked @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
  if (command === 'poke') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
      sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/poke');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} poked themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} poked @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
    if (command === 'nom') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
        sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/nome');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} nommed themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} nommed @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
if (command === 'slap') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
    sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/slap');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} slapped themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} slapped @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
  if (command === 'smile') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
      sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/smile');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} smiled themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} smiled @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
        if (command === 'wave') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
            sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/wave');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} waved themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} waved @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
        if (command === 'awoo') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
            sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/awoo');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} awooed themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} awooed @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
  if (command === 'blush') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
      sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/blush');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} blushed themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} blushed @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
  if (command === 'smug') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
      sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/smug');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} smugged themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} smugged @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
  if (command === 'glomp') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
      sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/glomp');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} glomped themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} glomped @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
     if (command === 'happy') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
         sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/happy');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} happied themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} happied @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
   if (command === 'dance') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
       sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/dance');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} danced themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} danced @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
   if (command === 'cringe') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
       sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/cringe');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} cringed themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} cringed @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
   if (command === 'cuddle') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
       sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/cuddle');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} cuddled themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} cuddled @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
  if (command === 'highfive') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
      sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/awoo');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} highfived themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} highfived @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
  if (command === 'handhold') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
      sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/handhold');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} handheld themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} handheld @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
    if (command === 'feed') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
        sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/feed');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} fed themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} fed @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
 if (command === 'tickle') {
    if (!m.mentionedJid[0] && !m.quoted) {
      return setReply('Tag atau balas seseorang!');
    }
     sendReact('🕚')
    const pat = await fetchJson('https://api.waifu.pics/sfw/tickle');
    try {
      let messsender = m.sender;
      let musers = '';
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
      let ment = [messsender, users];
      if (users === 'none') {
        musers = `@${m.sender.split('@')[0]} tickled themself!`;
      } else {
        musers = `@${m.sender.split('@')[0]} tickled @${users.split('@')[0]}`;
      }
      const response = await axios.get(pat.url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'utf-8');
      const fetchedgif = await GIFBufferToVideoBuffer(buffer);
      hanz.sendMessage(m.chat, { video: fetchedgif, gifPlayback: true, mentions: ment, caption: musers }, { quoted: m });
    } catch (error) {
      console.log(error);
    }
  }
};

handler.command = ['hug','cry','kill','pat','lick','kiss','bite','yeet','bully','bonk','wink','poke','nom','slap','smile','wave','awoo','blush','smug','glomp','happy','dance','cringe','cuddle','highfive','handhold','feed','tickle']; // Ganti sesuai dengan perintah yang diinginkan
handler.tags = ['fun'];
handler.help = ['hug','cry','kill','pat','lick','kiss','bite','yeet','bully','bonk','wink','poke','nom','slap','smile','wave','awoo','blush','smug','glomp','happy','dance','cringe','cuddle','highfive','handhold','feed','tickle'];
handler.onlyGroup = true
handler.noCmdStore = true
handler.description = ["kumpulan gambar anime"]
module.exports = handler;

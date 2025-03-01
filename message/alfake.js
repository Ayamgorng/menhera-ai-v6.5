const fs = require('fs');
const chalk = require('chalk')

module.exports = async (m,from,sender,pushname,ucapanWaktu,body) => {
const chat = global.db.data[m.chat]

global.ments = (teks) => {return teks.match('@') ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net') : [sender]}

global.fcall = { key: {fromMe: false, participant: `120363162611448409@g.us`, ...(from ? { remoteJid: "status@broadcast"} : {}) },'message': {extendedTextMessage: {text: body}}}
    
global.ftoko = { key: { fromMe: false, participant: `0@s.whatsapp.net`,
   ...(from ? { remoteJid: "https://wa.me/p/8237378353041883/6285795718659" } : {}) },
 message: {
 productMessage: {
 product: {
 productImage: {
mimetype: "image/jpeg",
jpegThumbnail: fs.readFileSync('./stik/quoted.jpg')},
title: `${pushname}`,
description: `${ucapanWaktu} kak`,
currencyCode: "IDR",
priceAmount1000: 25000, 
retailerId: `Rp10`,
productImageCount: 1 },
businessOwnerJid: `https://wa.me/p/8237378353041883/6285795718659` 
  } }};

global.USD = {
key: {
remoteJid: '6281316643491@s.whatsapp.net',
fromMe: false,
id: 'Rangel°᭄ᴮᵒᵗ',
participant: '0@s.whatsapp.net'
},
message: {
requestPaymentMessage: {
currencyCodeIso4217: "USD",
amount1000: 999999999,
requestFrom: '0@s.whatsapp.net',
noteMessage: {
extendedTextMessage: {
text: 'Rangel°᭄ᴮᵒᵗ'
}},
expiryTimestamp: 999999999,
amount: {
value: 91929291929,
offset: 1000,
currencyCode: "USD"
}}}	}
    
global.fvn = { key: { fromMe: false,participant: `6281316643491@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds": "9999","ptt": "true"}}}

    
global.fkontak =  { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `0@s.whatsapp.net` } : {}) }, message: { 'contactMessage': { 'displayName':m.pushname, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;,;;;\nFN:,\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./stik/quoted.jpg')}}}
    
global.ftroli = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "120363162611448409@g.us" } : {})},message: {orderMessage: {itemCount : 200, status: 1,surface : 2,message: `${fake}\n${pushname} kak`,orderTitle: `${ucapanWaktu} kak`,thumbnail: fs.readFileSync('./stik/thumb.jpeg'), sellerJid: `0@s.whatsapp.net`}}}
    
global.floc = { key: {"fromMe": false,"participant": `120363162611448409@g.us`, "remoteJid": "120363162611448409@g.us" },message: { "liveLocationMessage": { "title":body,'jpegThumbnail': fs.readFileSync('./stik/quoted.jpg')}}}
    
global.fimage = {
        key: {
            fromMe: true,
            participant: `0@s.whatsapp.net`,
            ...({ remoteJid: '' }) 
        },
        message: {
            imageMessage: {
                mimetype: "image/jpeg", 
                caption: `${m.pushname} : ${m.body}`, 
                jpegThumbnail: fs.readFileSync('./stik/quoted.jpg') 
            }
        }
    };
    
global.fdoc = { key : { participant : '0@s.whatsapp.net'}, message: { documentMessage: { title: pushname, jpegThumbnail: fs.readFileSync('./stik/quoted.jpg')}}}
global.fsimi = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})}, message: {"imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": 'simi botz', "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}

 }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})

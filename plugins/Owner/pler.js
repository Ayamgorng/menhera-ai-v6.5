const fs = require('fs')
const fetch = require('node-fetch')
let handler = async (m, { hanz, args}) => { 

var teknya = args.join(" ")
 var call = {
 scheduledCallCreationMessage: {
 callType: 1,
 scheduledTimestampMs:  Date.now(),
 title: `${teknya}`
 }
}
hanz.relayMessage(m.chat, call, {})
}
 handler.help = ['pler', 'warcall', 'call', 'reyz', 'tlpn'];
handler.tags = ['warcall-gc'];
handler.command = /^pler$/i;
handler.owner = true
module.exports = handler;
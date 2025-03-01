let handler = async (m, { setReply }) => {
  
  let start = new Date().getTime();
  
  
  let end = new Date().getTime();
  let latensi = (end - start) / 1000;
  setReply(`Speed: ${latensi.toFixed(4)} Second`);
};

handler.help = ['speed']; 
handler.tags = ['info']; 
handler.command = /^speed$/i;

module.exports = handler;

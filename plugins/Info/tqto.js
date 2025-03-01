
        
        
        
const handler = async (m, { hanz,sendThumb, command, prefix }) => {
    
    let teksTqto = `${thanksto(prefix)}`;
    
  
    sendThumb('https://pomf2.lain.la/f/4kynvgsd.jpg', teksTqto, m);
};

// Command setup
handler.help = ['tqto', 'thanksto'];
handler.tags = ['tools'];
handler.command = /^(tqto|thanksto)$/i;

module.exports = handler;

const fs = require("fs");
const fse = require("fs-extra");

let handler = async (m, { hanz,  q, setReply }) => {
  const imagenya = JSON.parse(fs.readFileSync('./json/image.json'));

  
  
  const quoted = m.quoted ? m.quoted : m;

  
  const isQuotedImage = quoted && quoted.mtype === 'imageMessage';
  if (!isQuotedImage) return setReply("Reply to an image.");
  if (!q) return setReply("Please provide a name for the image.");

  try {
  
    let downloadedImage = await hanz.downloadAndSaveMediaMessage(quoted);
    imagenya.push(q);
    await fse.copy(downloadedImage, `./temp/image/${q}.jpg`);
    
   
    fs.writeFileSync('./json/image.json', JSON.stringify(imagenya, null, 2));
    

    fs.unlinkSync(downloadedImage);

    setReply(`Successfully added image with name *${q}*`);
  } catch (error) {
    console.error(error);
    setReply("Failed to add the image.");
  }
};

handler.command = ["addimage"];
handler.owner = true;

module.exports = handler;

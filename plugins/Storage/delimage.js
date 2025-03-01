const fs = require("fs");

let handler = async (m, { q, setReply }) => {
  // Load the existing image data
  const imagenya = JSON.parse(fs.readFileSync('./json/image.json'));

  try {
    // Find and delete the image entry
    let index = imagenya.indexOf(q);
    if (index === -1) return setReply(`Image with name *${q}* not found.`);
    
    imagenya.splice(index, 1);
    fs.writeFileSync('./json/image.json', JSON.stringify(imagenya, null, 2));

    // Delete the image file
    fs.unlinkSync(`./temp/image/${q}.jpg`);
    
    setReply(`Successfully deleted image *${q}*`);
  } catch (error) {
    console.error(error);
    setReply("Error occurred while deleting the image.");
  }
};

handler.command = ["delimage"];
handler.owner = true;

module.exports = handler;

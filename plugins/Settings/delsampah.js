let handler = async (m, { text, q, hanz, isOwner, setReply }) => {
    
 let path = require('path')
const fs = require("fs-extra");


	let directoryPath = path.join();
	fs.readdir(directoryPath, async function (err, files) {
	if (err) {
	console.log('Unable to scan directory: ' + err);
	return setReply('Unable to scan directory: ' + err);
	 } 
	let filteredArray = await files.filter(item => item.endsWith("gif") || item.endsWith("png") || item.endsWith("mp3")  || item.endsWith("mp4") || item.endsWith("jpg") ||item.endsWith("webp") ||item.endsWith("webm") || item.endsWith("opus") || item.endsWith("jpeg"))
	console.log(filteredArray.length); 
	let teks =`Terdeteksi ${filteredArray.length} file Kenangan <3\n\n`
	if(filteredArray.length == 0) return setReply(teks)
	filteredArray.map(function(e, i){
	teks += (i+1)+`. ${e}\n`
	})
	 
	setReply(teks) 
	
//	await sleep(2000)
	setReply("_Menghapus file Kenangan_ ...")
	await filteredArray.forEach(function (file) {
	fs.unlinkSync(file)
	});
	//await sleep(2000)
	setReply("_Berhasil menghapus semua Kenangan_ <3")
	 
	});
 };

handler.help = ["delsampah"];
handler.tags = ["check"];
handler.command = /^(delhome|delsampah)$/i;
handler.owner = true;
module.exports = handler;
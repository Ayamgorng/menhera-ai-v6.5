const axios = require('axios');
const FormData = require('form-data');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../src', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      await fs.promises.writeFile(tmp, buffer)
      spawn('ffmpeg', [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp)
            if (code !== 0) return reject(code)
            resolve(await fs.promises.readFile(out))
            await fs.promises.unlink(out)
          } catch (e) {
            reject(e)
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3')
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension 
 */
function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension 
 */
function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}





async function convertWebpToMp4(filePath) {
  try {
    // Step 1: Upload webp file
    const form = new FormData();
    form.append('new-image', fs.createReadStream(filePath));

    const uploadResponse = axios.post('https://ezgif.com/webp-to-mp4', form, {
      headers: form.getHeaders(),
    }).then(res => res.data);

    // Step 2: Parse the upload response to find the form action URL
    const $ = cheerio.load(uploadResponse);
    const formAction = $('form').attr('action');

    if (!formAction) {
      throw new Error('Failed to get form action URL for conversion.');
    }

    // Step 3: Submit the form for conversion
    const conversionResponse = axios.post(`https://ezgif.com${formAction}`, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.data);

    // Step 4: Parse the conversion response to get the video URL
    const conversionPage = cheerio.load(conversionResponse);
    const videoUrl = conversionPage('a[href$=".mp4"]').attr('href');

    if (!videoUrl) {
      throw new Error('Failed to retrieve the converted video URL.');
    }

    return `https://ezgif.com${videoUrl}`;
  } catch (error) {
    console.error('Error during conversion:', error.message);
    throw error;
  }
}


    
module.exports = {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg,
  convertWebpToMp4
}
  
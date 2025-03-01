


module.exports.settings = async function(m,isNumber) {
  try {
 const settings = global.db.data.settings['settingbot']
if(settings){
//Auto settings
if (!isNumber(settings.status)) setting.status = new Date() * 1
if (!('setmenu' in settings)) settings.setmenu = "web"
if (!('autoBio' in settings)) settings.autoBio = true
if (!('multi' in settings)) settings.multi = true
if (!('prefix' in settings)) settings.prefix = "!"
if (!('autoblockcmd' in settings)) settings.autoblockcmd = false
if (!('autoDetectCmd' in settings)) settings.autoDetectCmd = false
if (!('replyType' in settings)) settings.replyType = "web"
if (!('autoReport' in settings)) settings.autoReport = true
if (!('anticall' in settings)) settings.anticall = false
if (!('anticulik' in settings)) settings.anticulik = false
if (!('autoSticker' in settings)) settings.autoSticker = false
if (!('autoRead' in settings)) settings.autoRead = false
if (!('publik' in settings)) settings.publik = true
if (!("gcOnly" in settings)) settings.gcOnly = false;
} else { global.db.data.settings['settingbot'] = {
status: new Date() * 1, 
setmenu: "web",
autoBio: true,
multi: true,
prefix: "!",
autoblockcmd: false,
autoDetectCmd: false,
replyType: "web",
autoReport: true,
anticulik: false,
anticall: false,
autoSticker: false,
autoRead: true,
publik : true,
gcOnly : false,
}
}
  } catch (e) {
    console.error(e);
  }
};

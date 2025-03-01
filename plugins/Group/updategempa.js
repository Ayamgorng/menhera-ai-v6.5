let handler = async (m, { q, prefix, setReply, command, onlyToko, onlyAdmin, onlyBadmin }) => {
    if (!m.isGroup) return onlyToko();
    if (!m.isAdmin) return onlyAdmin();
    if (!m.isBotAdmin) return onlyBadmin();

    if (!q) return setReply(`*UPDATE GEMPA*\nGunakan perintah: ${prefix + command} on/off`);

    // Fetch the current earthquake update data from the database
    let dataGempa = db.data.others['updateGempa'] || [];  // Initialize as an empty array if undefined

    if (m.isGroup) {
        // Group handling for turning on/off earthquake updates
        if (q.toLowerCase() === "on") {
            if (dataGempa.includes(m.chat)) return setReply("Sudah aktif di group ini.");
            dataGempa.push(m.chat); // Add the group to the earthquake update list
            setReply(`Berhasil menambahkan group ${m.groupName} ke dalam auto update gempa.`);
        } else if (q.toLowerCase() === "off") {
            if (!dataGempa.includes(m.chat)) return setReply("Sudah nonaktif di group ini.");
            dataGempa.splice(dataGempa.indexOf(m.chat), 1); // Remove the group from the update list
            setReply(`Berhasil menonaktifkan group ${m.groupName} dari auto update gempa.`);
        } else {
            return setReply(`Gunakan perintah yang benar, contoh: ${prefix + command} on/off`);
        }
    } else {
        // Handle non-group commands (managing updates by group ID)
        if (!q) return setReply("Masukkan ID grup (idgc).");

        if (dataGempa.includes(m.chat)) return setReply("Sudah aktif untuk grup ini.");
        dataGempa.push(q); // Add the specified group ID to the earthquake update list
        setReply(`Berhasil menambahkan ${q} ke dalam auto update gempa.`);
    }

    // Save the updated data back to the database
    db.data.others['updateGempa'] = dataGempa;
};

handler.help = ['updategempa'];
handler.tags = ['settings'];
handler.command = ['updategempa'];

module.exports = handler;
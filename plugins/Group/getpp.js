let handler = async (m, { setReply, hanz }) => {
    if (!m.isGroup) return setReply("This command can only be used in groups.");
const isQuotedTag = m.type === 'extendedTextMessage' && m.content.includes('mentionedJid')
const isQuotedReply = m.type === 'extendedTextMessage' && m.content.includes('Message')

    if (isQuotedTag || isQuotedReply) {
        // Check if the message has a tagged user or a replied message
        if (!m.message.extendedTextMessage) return setReply('Please reply to a target or tag a user.');

        // Get the user ID from a tagged user, replied message, or by parsing the command argument
        let userId = m.mentionedJid[0] 
                     ? m.mentionedJid[0] 
                     : m.quoted 
                     ? m.quoted.sender 
                     : `${q.replace(/[^0-9]/g, '')}@s.whatsapp.net`;

        // Attempt to get the profile picture URL
        let profilePicUrl;
        try {
            profilePicUrl = await hanz.profilePictureUrl(userId, 'image');
        } catch (err) {
            // Default image if no profile picture is found
            profilePicUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
        }

        // Send the profile picture
        await hanz.sendMessage(m.chat, { image: { url: profilePicUrl } }, { quoted: m });
    } else {
        setReply('Please reply to a target or tag a user.');
    }
};

handler.help = ['getpp'];
handler.tags = ['tools'];
handler.command = ['getpp'];

module.exports = handler;

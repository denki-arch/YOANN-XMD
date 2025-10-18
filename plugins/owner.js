const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    const reply = (text) => conn.sendMessage(from, { text }, { quoted: mek });

    try {
        const ownerNumber = config.OWNER_NUMBER || '0000000000';
        const ownerName = config.OWNER_NAME || 'Owner';

        const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}
END:VCARD
        `.trim();

        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        const caption = `╭━━〔 𝐘𝐎𝐀𝐍𝐍-𝐗𝐌𝐃 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *ʜᴇʀᴇ ɪs ᴛʜᴇ ᴏᴡɴᴇʀ ᴅᴇᴛᴀɪʟs*
┃◈┃• *𝐍𝐚𝐦𝐞* - ${ownerName}
┃◈┃• *𝐍𝐮𝐦𝐛𝐞𝐫* ${ownerNumber}
┃◈┃• *𝐕𝐞𝐫𝐬𝐢𝐨𝐧*: 1.0.0 
┃◈└───────────┈⊷
╰──────────────┈⊷
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ʏᴏᴀɴɴ*`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/mwmtbh.jpg' },
            caption,
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`], 
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419188836934@newsletter',
                    newsletterName: '𝐘𝐎𝐀𝐍𝐍-𝐗𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});

      

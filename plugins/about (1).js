const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    alias: "dev",
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
╭┈───────────────=▢
 ʜɪ 👋 ${pushname}*
╰┈───────────────=▢
╭┈───────────────=▢
│  ◦* *ʙᴏᴛ ɴᴀᴍᴇ : ʏᴏᴀɴɴ-xᴍᴅ
│  ◦* *ᴄʀᴇᴀᴛᴇᴅ ʙʏ : ᴅᴇᴠ ʏᴏᴀɴɴ*
│  ◦* *ʀᴇᴀʟ ɴᴀᴍᴇ : ʏᴏᴀɴɴ*
│  ◦* *ᴘsᴇᴜᴅᴏ : ʏᴏᴀɴɴ*
│  ◦* *ᴀɢᴇ : ɴᴏ ғᴏᴜɴᴅ*
│  ◦* *ᴄɪᴛʏ :  ɴᴏᴛ ғᴏᴜɴᴅ*
│  ◦* *ᴄᴏɴᴛʀʏ : ɴᴏ ғᴏᴜɴᴅ*
╰┈───────────────=▢
`
await conn.sendMessage(from, {
    image: { url: 'https://files.catbox.moe/mwmtbh.jpg' },
    caption: about,
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363419188836934@newsletter', // ou ton JID actuel
            newsletterName: '𝐘𝐎𝐀𝐍𝐍-𝐗𝐌𝐃',
            serverMessageId: 143
        }
    }
}, { quoted: mek })

}catch(e){
console.log(e)
reply(`${e}`)
}
})
  

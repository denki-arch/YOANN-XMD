const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "webinfo",
    alias: ["siteinfo"],
    desc: "Get website info using GTech API",
    category: "tools",
    react: "🌐",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        const url = args[0];
        if (!url) return reply('⚠️ Please provide a website URL.\n\nExample: *.webinfo https://example.com*');

        const apiKey = 'APIKEY'; // Replace with your actual API key
        const apiUrl = `https://gtech-api-xtp1.onrender.com/api/web/info?url=${encodeURIComponent(url)}&apikey=${apiKey}`;

        const { data } = await axios.get(apiUrl);

        if (!data || data.status !== "success" || !data.data) {
            return reply('❌ Website info nahi mil saka. URL ya API key check karein.');
        }

        const info = data.data;

        const caption = `╭─❰ 🌐 𝗪𝗲𝗯𝘀𝗶𝘁𝗲 𝗜𝗻𝗳𝗼 ❱──➤
┃ 🏷️ *ᴛɪᴛʟᴇ:* ${info.title || 'N/A'}
┃ 📃 *ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:* ${info.description || 'N/A'}
┃ 🏢 *ᴘᴜʙʟɪsʜᴇʀ:* ${info.publisher || 'N/A'}
┃ 🗓️ *ᴅᴀᴛᴇ:* ${info.date || 'N/A'}
┃ 🖼️ *ɪᴍᴀɢᴇ sɪᴢᴇ:* ${info.image?.size_pretty || 'N/A'}
┃ 🌍 *ᴜʀʟ:* ${info.url || url}
╰──────────────➤`;

        // Fixed image thumbnail
        const fixedImageUrl = 'https://files.catbox.moe/mwmtbh.jpg';
        const response = await axios.get(fixedImageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        await conn.sendMessage(m.chat, {
            image: buffer,
            caption
        }, { quoted: m });

    } catch (e) {
        console.error("Error in webinfo command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});
    

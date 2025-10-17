const axios = require('axios');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "checkupdate",
    alias: ["changelog", "cupdate", "updateinfo"],
    react: "🚀",
    desc: "Check bot version, system stats, and update info.",
    category: "info",
    filename: __filename,
}, async (conn, m, mdata, { from, sender, pushname, reply }) => {
    try {
        // 📁 Lecture de la version locale
        const localPath = path.join(__dirname, '../data/version.json');
        let currentVersion = "Unknown";
        let currentChangelog = "No changelog available.";

        if (fs.existsSync(localPath)) {
            const localData = JSON.parse(fs.readFileSync(localPath));
            currentVersion = localData.version || currentVersion;
            currentChangelog = localData.changelog || currentChangelog;
        }

        // 🌐 Récupération de la version GitHub
        const githubUrl = 'https://raw.githubusercontent.com/denki-arch/YOANN-XMD/main/data/version.json';
        let latestVersion = "Unknown";
        let latestChangelog = "No changelog available.";

        try {
            const { data: remoteData } = await axios.get(githubUrl);
            latestVersion = remoteData.version || latestVersion;
            latestChangelog = remoteData.changelog || latestChangelog;
        } catch (err) {
            console.error("❌ Failed to fetch latest version:", err);
        }

        // 🧠 Statistiques système et bot
        const pluginsPath = path.join(__dirname, '../plugins');
        const pluginCount = fs.readdirSync(pluginsPath).filter(f => f.endsWith('.js')).length;
        const commandCount = commands.length;
        const uptime = runtime(process.uptime());
        const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRAM = (os.totalmem() / 1024 / 1024).toFixed(2);
        const hostname = os.hostname();
        const lastUpdate = fs.statSync(localPath).mtime.toLocaleString();
        const repoURL = 'https://github.com/Yoann-officia/YOANN-XMD';

        // 🔄 Statut de mise à jour
        let updateNote = '✅ уσυя вσт ιѕ υρ-тσ-∂αтє!';
        if (currentVersion !== latestVersion) {
            updateNote =
                `🚀 ʏᴏᴜʀ ʙᴏᴛ ɪs *ᴏᴜᴛᴅᴀᴛᴇᴅ!*\n\n` +
                `🔹 *ᴄᴜʀʀᴇɴᴛ ᴠᴇʀsɪᴏɴ:* ${currentVersion}\n` +
                `🔹 *ʟᴀᴛᴇsᴛ ᴠᴇʀsɪᴏɴ:* ${latestVersion}\n\n` +
                `ᴜsᴇ *.ᴜᴘᴅᴀᴛᴇ* ᴛᴏ ᴜᴘᴅᴀᴛᴇ.`;
        }

        const greeting = new Date().getHours() < 12 ? "🌞 ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ" : "🌙 ɢᴏᴏᴅ ɴɪɢʜᴛ";

        // ✉️ Construction du message
        const caption =
            `${greeting}, ${pushname}!\n\n` +
            `📌 *ʙᴏᴛ ɴᴀᴍᴇ:* YOANN-XMD\n` +
            `🔖 *ᴄᴜʀʀᴇɴᴛ ᴠᴇʀsɪᴏɴ:* ${currentVersion}\n` +
            `📢 *ʟᴀᴛᴇsᴛ ᴠᴇʀsɪᴏɴ:* ${latestVersion}\n` +
            `📂 *ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs:* ${pluginCount}\n` +
            `🧩 *ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs:* ${commandCount}\n\n` +
            `💾 *sʏsᴛᴇᴍ ɪɴғᴏ:*\n` +
            `⏳ *ᴜᴘᴛɪᴍᴇ:* ${uptime}\n` +
            `📟 *ʀᴀᴍ ᴜsᴀɢᴇ:* ${usedRAM} MB / ${totalRAM} MB\n` +
            `🖥️ *ʜᴏsᴛ ɴᴀᴍᴇ:* ${hostname}\n` +
            `📅 *ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇ:* ${lastUpdate}\n\n` +
            `📝 *ᴄʜᴀɴɢᴇʟᴏɢ:*\n${latestChangelog}\n\n` +
            `⭐ *ɢɪᴛʜᴜʙ ʀᴇᴘᴏ:* ${repoURL}\n\n` +
            `${updateNote}`;

        // 📤 Envoi du message avec image
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/mwmtbh.jpg' },
            caption,
            contextInfo: {
                mentionedJid: [mdata.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419188836934@newsletter',
                    newsletterName: '𝐘𝐎𝐀𝐍𝐍-𝐗𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });

    } catch (err) {
        console.error("❌ An error occurred in .checkupdate:", err);
        reply("❌ An error occurred while checking the bot version.");
    }
});
  

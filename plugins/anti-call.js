const { cmd } = require('../command');
const config = require('../config');


cmd({
    pattern: "anti-call",
    react: "🫟",
    alias: ["anticall"],
    desc: "Enable or disable welcome messages for new members",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ANTI_CALL = "true";
        return reply("*✅ ᴀɴᴛɪ-ᴄᴀʟʟ ʜᴀs ʙᴇᴇɴ ᴇɴᴀʙʟᴇᴅ*");
    } else if (status === "off") {
        config.ANTI_CALL = "false";
        return reply("*❌ ᴀɴᴛ-ᴄᴀʟʟ ʜᴀs ʙᴇᴇɴ ᴅɪsᴀʙʟᴇᴅ*");
    } else {
        return reply(`*🏷️ ᴇxᴀᴍᴘʟᴇ : ᴀɴᴛɪ-ᴄᴀʟʟ σɴ/σff*`);
    }
});
          

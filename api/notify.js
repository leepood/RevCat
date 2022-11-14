import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

async function sendWXMsg(content) {
    const { WX_WEB_URL } = process.env;
    if (!WX_WEB_URL) {
        throw new Error("企业微信URL尚未配置");
    }
    await axios.post(WX_WEB_URL, { msgtype: 'text', text: { content } },
        { headers: { 'content-type': 'application/json' } });
}

async function sendTGMsg(content) {
    const { TG_API_BOT_TOKEN, TG_CHAT_ID } = process.env;
    if (!TG_API_BOT_TOKEN || !TG_CHAT_ID) {
        throw new Error("TG尚未正确配置");
    }
    // send here
    const bot = new TelegramBot(botToken);
    await bot.sendMessage(messageGroupId, content, { parse_mode: 'Markdown' });
}


export default async (req, res) => {
    let { content, t } = req.query;

    if (!content) {
        res.status(200).json({ code: -1, msg: "消息内容不能为空" });
        return;
    }

    t = t || "all";
    try {
        switch (t) {
            case "wx":
                await sendWXMsg(content);
                break;
            case "tg":
                await sendTGMsg(content);
                break;
            case "all":
                await sendWXMsg(content);
                await sendTGMsg(content);
                break;
            default:
                return res.status(200).json({ code: -1, msg: "unknown type" });
        }
        return res.status(200).json({ code: 0 });
    }
    catch (error) {
        return res.status(200).json({ code: -1, msg: error.msg });
    }
}
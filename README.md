# RevCat

RevCat,中文招财猫，用于企业微信，Telegram推送，基于Vercel Serverless API，部署非常方便。

## 如何设置

### 微信推送

1. 下载企业微信
2. 新建群，并创建群机器人，创建后会有一串**Webhook**地址
3. Vercel 设置环境变量 `WX_WEB_URL` 为上一步获取的地址


### TG推送
1. 创建Bot获取Bot API Token
2. 登录网页端的telegram，打开 `https://api.telegram.org/botToken/getUpdates`后与你创建的机器人对话，会得到一串json数据，记录其中的chatid
3. Vercel中设置环境变量 `TG_API_BOT_TOKEN`,`TG_CHAT_ID` 为上两部记录的值


## 如何部署

1. 注册好Vercel账号，点击 [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fleepood%2FRevCat%2Ftree%2Fmaster)，按照提示即可 

2. Fork此仓库，在您的Vercel中关联，手动部署

## 如何使用

部署成功后vercel会给你分配url，形如`https://abababab.vercel.app`,当然，你也可以绑定自己的域名。在需要推送消息的地方GET请求`https://abababab.vercel.app/api/notify?t=[wx|tg|all]&content=[content]` 即可。其中:
1. `t`表示推送的平台，可选。取值为`wx`/`tg`/`all`。
2. `content`为推送的消息内容，对于`tg`而言，支持简单的`markdown`格式



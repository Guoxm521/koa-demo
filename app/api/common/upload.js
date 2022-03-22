const Router = require('koa-router')
const Sequelize = require('sequelize')
const { sequelize } = require("@core/db.js")
const database = require("@config/database.js")
const { Buffer } = require("buffer");
const OSS = require("ali-oss");
const moment = require("moment");
const router = new Router()
const Resolve = require('@app/lib/helper')
let resolve = new Resolve()


const config = {
    accessKeyId: database.aliOss.accessKeyId,
    accessKeySecret: database.aliOss.accessKeySecret,
    bucket: database.aliOss.bucket,
    callbackUrl: "image-result",
    dir: database.aliOss.dir,
};
router.get('/ossparams', async (ctx, next) => {
    //  跨域才设置
    ctx.set('Access-Control-Allow-Oigin', '*');
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET');
    // config.callbackUrl = getCallBack(ctx)
    config.callbackUrl = 'http://42.193.230.81:3001/oss'
    const client = new OSS(config);
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const policy = {
        expiration: date.toISOString(), // 请求有效期
        conditions: [
            ["content-length-range", 0, 1048576000], // 设置上传文件的大小限制
            // { bucket: client.options.bucket } // 限制可上传的bucket
        ],
    };
    //签名
    const formData = await client.calculatePostSignature(policy);
    //bucket域名
    const host = `http://${ config.bucket }.${ (await client.getBucketLocation()).location }.aliyuncs.com`.toString();
    //回调
    const callback = {
        callbackUrl: config.callbackUrl,
        callbackBody:
            "bucket=${bucket}&filename=${object}&size=${size}&mimeType=${mimeType}&height=${imageInfo.height}&width=${imageInfo.width}&host=" + host,
        callbackBodyType: "application/x-www-form-urlencoded",
    };
    console.log(callback)
    //返回参数
    const params = {
        expire: moment().add(1, "days").unix().toString(),
        policy: formData.policy,
        signature: formData.Signature,
        accessid: formData.OSSAccessKeyId,
        host,
        callback: Buffer.from(JSON.stringify(callback)).toString("base64"),
        dir: config.dir,
    };
    ctx.body = resolve.json(params);
})
// 上传图片回调地址
router.post('/image-result', async (ctx) => {
    //公钥地址
    const pubKeyAddr = Buffer.from(
        req.headers["x-oss-pub-key-url"],
        "base64"
    ).toString("ascii");
    //判断
    if (
        !pubKeyAddr.startsWith("https://gosspublic.alicdn.com/") &&
        !pubKeyAddr.startsWith("https://gosspublic.alicdn.com/")
    ) {
        System.out.println("pub key addr must be oss addrss");
        ctx.body = resolve.json({ Status: "verify not ok" });

    }
    ctx.body = resolve.json({ Status: "Ok" });
})


function getCallBack(ctx) {
    let host = ctx.request.header.host
    let url = ctx.request.url
    let prefixurl = url.split('ossparams')
    return `${ host }${ prefixurl }image-result`
}
module.exports = router
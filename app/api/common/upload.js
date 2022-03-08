const Router = require('koa-router')
const Sequelize = require('sequelize')
const { sequelize } = require("@core/db.js")
const database = require("@config/database.js")
const { Buffer } = require("buffer");
const OSS = require("ali-oss");
const router = new Router()


const config = {
    accessKeyId: database.aliOss.accessKeyId,
    accessKeySecret: database.aliOss.accessKeySecret,
    bucket: database.aliOss.bucket,
    callbackUrl: "url",
    dir: database.aliOss.dir,
};
router.get('/', async (ctx, next) => {
    ctx.body = 123
})
// 上传图片回调地址
router.post('/12', async (ctx) => {
    ctx.body = 'demo/12'
})
module.exports = router
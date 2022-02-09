const Router = require('koa-router')
const { Auth } = require("@middlewares/auth")

const demo = require('./demo')
const blobCategory = require('./blobCategory')
const blobAdmin = require('./blobAdmin')
const ceShi = require("./ceShi")


let router = new Router()


router.use('/api/demo', new Auth().m, demo.routes())
// 博客分类
router.use('/blob/category', blobCategory.routes())
router.use('/blob/admin', blobAdmin.routes())
router.use('/blob/ceshi', ceShi.routes())

async function c1(ctx, next) {
    console.log('1')
    await next()
}


module.exports = router
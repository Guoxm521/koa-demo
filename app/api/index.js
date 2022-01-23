const Router = require('koa-router')
const { Auth } = require("@middlewares/auth")


const demo = require('./demo')
const blobCategory = require('./blobCategory')
const blobAdmin = require('./blobAdmin')


let router = new Router()


router.use('/api/demo', new Auth().m, c1, c2, c3, demo.routes())
// 博客分类
router.use('/blob/category', blobCategory.routes())
router.use('/blob/admin', blobAdmin.routes())

async function c1(ctx, next) {
    console.log('1')
    await next()
}
async function c2(ctx, next) {
    console.log('2')
    await next()
}
async function c3(ctx, next) {
    console.log('3')
    await next()
}

module.exports = router
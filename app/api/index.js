const Router = require('koa-router')
const { Auth } = require("@middlewares/auth")
const demo = require('./demo')
const blobCategory = require('./blobCategory')
const blobAdmin = require('./blobAdmin')
const ceShi = require("./ceShi")
let router = new Router()


router.use('/api/demo', c1, demo.routes())


const categoryAuthMiddle = {
    whiteList: ['/list', '/detail'],
    prefix: '/blob/category'
}
router.use(categoryAuthMiddle.prefix, new Auth(categoryAuthMiddle).m, blobCategory.routes())


const adminAuthMiddle = {
    whiteList: ['/login', '/register'],
    prefix: '/blob/admin'
}
router.use(adminAuthMiddle.prefix, new Auth(adminAuthMiddle).m, blobAdmin.routes())


router.use('/blob/ceshi', c1, ceShi.routes())

async function c1(ctx, next) {
    console.log(ctx.url)
    await next()
}


module.exports = router
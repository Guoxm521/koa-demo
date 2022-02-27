const Router = require('koa-router')
const { Auth } = require("@middlewares/auth")
const demo = require('./demo')
const blobCategory = require('./blobCategory')
const blobAdmin = require('./blobAdmin')
const ceShi = require("./ceShi")
const poetry = require('./poetry')
let router = new Router()


router.use('/api/demo', c1, demo.routes())

// 分类
const categoryAuthMiddle = {
    whiteList: [],
    prefix: '/blob/category'
}
router.use(categoryAuthMiddle.prefix, new Auth(categoryAuthMiddle).m, blobCategory.routes())

// 管理员
const adminAuthMiddle = {
    whiteList: ['/login', '/register'],
    prefix: '/blob/admin'
}
router.use(adminAuthMiddle.prefix, new Auth(adminAuthMiddle).m, blobAdmin.routes())


// 诗词
const poetryAuthMiddle = {
    whiteList: [],
    prefix: '/poetry'
}
router.use(poetryAuthMiddle.prefix, new Auth(poetryAuthMiddle).m, poetry.routes())


router.use('/blob/ceshi', c1, ceShi.routes())

async function c1(ctx, next) {
    console.log(ctx.url)
    await next()
}


module.exports = router
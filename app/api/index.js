const Router = require('koa-router')
const { Auth } = require("@middlewares/auth")
const demo = require('./demo')
const blobCategory = require('./blobCategory')
const blogTag = require('./blogTag')
const blobAdmin = require('./blobAdmin')
const blog = require('./blog')
const poetry = require('./poetry')
const upload = require('./common/upload')
let router = new Router()


router.use('/api/demo', c1, demo.routes())

// 分类
const categoryAuthMiddle = {
    whiteList: [],
    prefix: '/blob/category'
}
router.use(categoryAuthMiddle.prefix, new Auth(categoryAuthMiddle).m, blobCategory.routes())

// 标签
const blogTagAuthMiddle = {
    whiteList: ['/list'],
    prefix: '/blob/tags'
}
router.use(blogTagAuthMiddle.prefix, new Auth(blogTagAuthMiddle).m, blogTag.routes())

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

// 博客内容
const blogMiddle = {
    whiteList: [],
    prefix: '/blog/main'
}
router.use(blogMiddle.prefix, new Auth(blogMiddle).m, blog.routes())

// 图片上传
router.use('/common/upload', c1, upload.routes())

async function c1(ctx, next) {
    console.log(ctx.url)
    await next()
}


module.exports = router
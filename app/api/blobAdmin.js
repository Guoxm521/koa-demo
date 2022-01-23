const Router = require('koa-router')
const router = new Router()

// 注册
router.get("/register", async (ctx) => {
    ctx.response.body = '注册'
})

// 登录
router.get("/login", async (ctx) => {
    ctx.response.body = '登录'
})

// 获取信息
router.get("/auth", async (ctx) => {
    ctx.response.body = '信息'
})

module.exports = router
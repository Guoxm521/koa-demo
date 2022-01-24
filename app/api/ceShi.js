const Router = require('koa-router')
const router = new Router()
const { CeShiValidator } = require('@validators/ceShi');

// 新增
router.get("/add", async (ctx) => {
    ctx.response.body = '新增'
})

// 删除
router.get("/delete", async (ctx) => {
    ctx.response.body = '删除'
})

// 修改
router.get("/update", async (ctx) => {
    ctx.response.body = '修改'
})

// 列表
router.get("/list", async (ctx) => {
    const v = new CeShiValidator()
    console.log(v)
    ctx.response.body = '列表'
})

// 详情
router.get("/detai", async (ctx) => {
    ctx.response.body = '详情'
})

module.exports = router
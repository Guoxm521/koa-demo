const Router = require('koa-router')
const Sequelize = require('sequelize')
const { PoetryAllDao } = require('@dao/poetry')
const { PoetryCategoryDao } = require('@dao/poetryCategory')
const Resolve = require('@app/lib/helper')
let resolve = new Resolve()

const router = new Router({
    prefix: '/api/poetry'
})

// 全部
router.get('/', async (ctx) => {
    let [err, data] = await PoetryAllDao.list(ctx.query)
    if (!err) {
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.json(err, 'error', 400686)
    }

})

// 分类
router.get('/category', async (ctx) => {
    let [err, data] = await PoetryCategoryDao.list()
    if (!err) {
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.json(err, 'error', 400686)
    }

})

router.get('/categoryCount', async (ctx) => {
    let [err, data] = await PoetryCategoryDao.listCount(ctx.query)
    if (!err) {
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.json(err, 'error', 400686)
    }

})



//分类top
router.get('/dynastyTop', async (ctx) => {
    let [err, data] = await PoetryCategoryDao.dynastyTop(ctx.query)
    if (!err) {
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.json(err, 'error', 400686)
    }
})

module.exports = router
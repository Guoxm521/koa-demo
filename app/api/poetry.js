const Router = require('koa-router')
const Sequelize = require('sequelize')
const { PoetryAllDao } = require('@dao/poetry')
const Resolve = require('@app/lib/helper')
let resolve = new Resolve()

const router = new Router({
    prefix: '/api/poetry'
})

router.get('/', async (ctx) => {
    console.log(ctx.query)
    let [err, data] = await PoetryAllDao.list(ctx.query)
    if (!err) {
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.json(err, 'error', 400686)
    }

})

module.exports = router
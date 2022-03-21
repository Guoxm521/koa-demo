const Router = require('koa-router')
const PoetryAll = require("@models/PoetryAll")
const Sequelize = require('sequelize')
const { sequelize } = require("@core/db.js")
const BlogAdmin = require('@models/BlogAdmin')
const redis = require("@core/redis.js")
const { setValue, getValue } = require('@app/lib/redisUtils.js')
const router = new Router()

router.post('/', async (ctx, next) => {
    const project = await PoetryAll.findAll({
        attributes: ['dynasty', [Sequelize.fn('COUNT', Sequelize.col('dynasty')), 'n_hats'],],
        group: 'dynasty',
        // raw: true
    });
    ctx.body = 123
})

router.post('/12', async (ctx) => {
    // // let result = await redis.set('arrList', '我是测测试的redis值')
    // let result = await redis.get('arrList')
    // // await redis.expire('arrList',5)
    // console.log('result', result)

    // let res = await setValue('arrList', '测试数据')
    // let c = await redis.expireat('arrList', 3213)
    let res = await getValue('arrList')
    console.log(res)
    ctx.body = res
})

router.get('/haha', async (ctx) => {
    let sql = 'select * from gxm_poetry_song limit 1,5';
    const [metadata] = await sequelize.query(sql,);
    ctx.body = {
        metadata
    }
})

module.exports = router
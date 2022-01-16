const Router = require('koa-router')
const PoetryAll = require("@models/PoetryAll")
const Sequelize = require('sequelize')
const router = new Router({
    prefix: '/api/demo'
})

router.get('/', async (ctx) => {
    const project = await PoetryAll.findAll({
        attributes: ['dynasty', [Sequelize.fn('COUNT', Sequelize.col('dynasty')), 'n_hats'],],
        group: 'dynasty',
        // raw: true
    });
    console.log(project)
    ctx.body = 123
})


router.get('/12', async (ctx) => {
    ctx.body = 'demo/12'
})

module.exports = router
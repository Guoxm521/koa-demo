const Router = require('koa-router')
const PoetryAll = require("@models/PoetryAll")
const Sequelize = require('sequelize')
const { sequelize } = require("@core/db.js")
const router = new Router({
    prefix: '/api/demo'
})

router.get('/', async (ctx) => {
    const project = await PoetryAll.findAll({
        attributes: ['dynasty', [Sequelize.fn('COUNT', Sequelize.col('dynasty')), 'n_hats'],],
        group: 'dynasty',
        // raw: true
    });
    ctx.body = 123
})

router.get('/12', async (ctx) => {
    ctx.body = 'demo/12'
})

router.get('/haha', async (ctx) => {
    let sql = 'select * from gxm_poetry_song limit 1,5';
    const [metadata] = await sequelize.query(sql,);
    ctx.body = {
        metadata
    }
})

module.exports = router
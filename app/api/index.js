const Router = require('koa-router')
const demo = require('./demo')
let router = new Router()
const { Auth } = require("@middlewares/auth")

router.use('/api/demo', new Auth().m, demo.routes())



module.exports = router
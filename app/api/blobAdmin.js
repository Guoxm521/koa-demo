const Router = require('koa-router')
const router = new Router()
const { AdminValidator } = require('@validators/blobAdmin');
const { BlogAdminDao } = require("@dao/blobAdmin")
const { LoginManager } = require('@app/service/login')
const Resolve = require('@app/lib/helper')
const { Auth } = require("@middlewares/auth")
let resolve = new Resolve()

// 注册
router.post("/register", async (ctx) => {
    const v = await new AdminValidator(['email', 'password1', 'password2', 'nickname']).validate(ctx)
    const [err, data] = await BlogAdminDao.create({
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname'),
    })
    if (!err) {
        ctx.response.status = 200;
        ctx.body = resolve.json(data);

    } else {
        ctx.body = resolve.fail(err);
    }
})

// 登录
router.post("/login", async (ctx) => {
    const v = await new AdminValidator(['email', 'password']).validate(ctx)
    let [err, data] = await LoginManager.adminLogin({
        email: v.get('body.email'),
        password: v.get('body.password'),
    })
    if (!err) {
        ctx.response.status = 200;
        ctx.body = resolve.json(data);
    } else {
        ctx.body = err;
    }
})

// 获取信息
router.get("/auth", async (ctx) => {
    ctx.response.body = '信息'
})

module.exports = router
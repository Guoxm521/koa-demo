const Router = require('koa-router')
const { BlogTagDao } = require('@dao/blogTag')
const { BlogTagValidator } = require('@validators/blogTag');
const router = new Router()
const Resolve = require('@app/lib/helper')
let resolve = new Resolve()

// 新增
router.post("/add", async (ctx) => {
    const v = await new BlogTagValidator(['name']).validate(ctx)
    let form = {
        name: v.get('body.name'),
        status: v.get('body.status'),
    }
    const [err, data] = await BlogTagDao.create(form)
    if (!err) {
        ctx.response.status = 200;
        ctx.body = resolve.json(data);

    } else {
        ctx.body = resolve.fail(err);
    }
})

// 删除
router.get("/delete", async (ctx) => {
    const v = await new BlogTagValidator(['id']).validate(ctx);
    const id = v.get('query.id')
    const [err, data] = await BlogTagDao.delete(id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = resolve.json({}, '标签删除成功');
    } else {
        ctx.body = resolve.fail(err);
    }
})

// 修改
router.post("/update", async (ctx) => {
    let hasStatus = Object.hasOwn(ctx.request.body, 'status')
    let array = hasStatus ? ['id', 'status'] : ['id']
    const v = await new BlogTagValidator(array).validate(ctx)
    let list = ['id', 'name', 'status']
    let params = {}
    list.map(e => {
        params[e] = v.get(`body.${ e }`)
    })
    const [err, data] = await BlogTagDao.update(params);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = resolve.json('标签更新成功');
    } else {
        ctx.body = resolve.fail(err);
    }
})

// 列表
router.get("/list", async (ctx) => {
    const [err, data] = await BlogTagDao.list(ctx.query)
    if (!err) {
        // 返回结果
        ctx.response.status = 200;
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.json(err)
    }
})

// 详情
router.get("/detai", async (ctx) => {
    ctx.response.body = '详情'
})

module.exports = router
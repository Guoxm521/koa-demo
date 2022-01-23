const Router = require('koa-router')
const { BlogCategoryDao } = require('@dao/blobCategory')
const Resolve = require('@app/lib/helper')
let resolve = new Resolve()
const { CategoryValidator, PostCategoryValidator, DelCategoryValidator } = require('@validators/blobCategory');

const router = new Router()
// 新增
router.post('/add', async (ctx, next) => {
    const v = await new CategoryValidator().validate(ctx);
    let form = {
        name: v.get('body.name'),
        status: v.get('body.status'),
        sort_order: v.get('body.sort_order'),
        parent_id: v.get('body.parent_id'),
    }
    const [err, data] = await BlogCategoryDao.create(form)
    if (!err) {
        // 返回结果
        ctx.response.status = 200;
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.json(err)
    }
})

// 删除分类
router.post('/delete', async (ctx) => {
    const v = await new DelCategoryValidator().validate(ctx);
    const id = v.get('body.id')
    // 删除分类
    const [err, data] = await BlogCategoryDao.destroy(id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = resolve.json({}, '删除分类成功');
    } else {
        ctx.body = resolve.fail(err);
    }
})

// 更新
router.post('/update', async (ctx) => {
    const v = await new PostCategoryValidator().validate(ctx);
    const form = {
        id: v.get('body.id'),
        status: v.get('body.status'),
        name: v.get('body.name'),
        sort_order: v.get('body.sort_order'),
        parent_id: v.get('body.parent_id'),
    }
    const [err, data] = await BlogCategoryDao.update(form);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = resolve.json('更新分类成功');
    } else {
        ctx.body = resolve.fail(err);
    }
})

// 列表
router.get("/list", async (ctx) => {
    const [err, data] = await BlogCategoryDao.list(ctx.query)
    if (!err) {
        // 返回结果
        ctx.response.status = 200;
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.fail(err)
    }
})

// 详情
router.get("/detail", async (ctx) => {
    const v = await new PostCategoryValidator(['id']).validate(ctx);
    const [err, data] = await BlogCategoryDao.detail({ id: v.get('query.id') })
    if (!err) {
        // 返回结果
        ctx.response.status = 200;
        ctx.body = resolve.json(data)
    } else {
        ctx.body = resolve.fail(err)
    }
})



module.exports = router
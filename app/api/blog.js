const Router = require("koa-router");
const { BlogDao } = require("@dao/blog");
const { BlogValidator } = require("@validators/blog");
const router = new Router();
const Resolve = require("@app/lib/helper");
let resolve = new Resolve();
// 新增
router.post("/add", async (ctx) => {
  let hasStatus = Object.hasOwn(ctx.request.body, "status");
  let status = ctx.request.body.status;
  let rules = [];
  if (status === 1) {
    rules = ["title", "des", "tag", "category", "status", "cover", "content"];
  } else if (status === 2) {
    rules = ["status"];
  }
  const v = await new BlogValidator(rules).validate(ctx);
  let list = ["title", "des", "category", "cover", "tag", "content", "status"];
  let params = {};
  list.map((e) => {
    params[e] = v.get(`body.${e}`);
  });
  const [err, data] = await BlogDao.create(params);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = resolve.json(data);
  } else {
    ctx.body = resolve.fail(err);
  }
});

// 删除
router.post("/delete", async (ctx) => {
  const v = await new BlogValidator(["id"]).validate(ctx);
  const id = v.get("body.id");
  const [err, data] = await BlogDao.delete(id);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = resolve.json({}, "文章删除成功");
  } else {
    ctx.body = resolve.fail(err);
  }
});

// 修改
router.post("/update", async (ctx) => {
  let hasStatus = Object.hasOwn(ctx.request.body, "status");
  let array = hasStatus ? ["id"] : ["id"];
  // console.log(ctx.request.body)
  const v = await new BlogValidator(array).validate(ctx);
  let list = [
    "id",
    "title",
    "des",
    "category",
    "cover",
    "tag",
    "content",
    "status",
  ];
  let params = {};
  list.map((e) => {
    params[e] = v.get(`body.${e}`);
  });
  const [err, data] = await BlogDao.update(params);
  if (!err) {
    ctx.response.status = 200;
    ctx.body = resolve.json("文章更新成功");
  } else {
    ctx.body = resolve.fail(err);
  }
});

// 列表
router.get("/list", async (ctx) => {
  const [err, data] = await BlogDao.list(ctx.query);
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = resolve.json(data);
  } else {
    ctx.body = resolve.json(err);
  }
});

// 详情
router.get("/detai", async (ctx) => {
  const v = await new BlogValidator(["id"]).validate(ctx);
  const [err, data] = await BlogDao.detail({ id: v.get("query.id") });
  if (!err) {
    // 返回结果
    ctx.response.status = 200;
    ctx.body = resolve.json(data);
  } else {
    ctx.body = resolve.fail(err);
  }
});

module.exports = router;

const Koa = require('koa');
const logger = require('koa-logger')
const config = require('./config/config')
require('module-alias/register')
const app = new Koa();
const routerIndex = require('@api/index')
const poetry_router = require('@api/poetry')
const catchError = require("@middlewares/exception")
const Router = require('koa-router')

// 中间件
app.use(catchError)
app.use(routerIndex.routes()).use(routerIndex.allowedMethods())

app.use(poetry_router.routes())




app.listen(config.port);
console.log(`Koa is listening in http://localhost:${ config.port }`)
const Koa = require('koa');
const logger = require('koa-logger')
const parser = require('koa-body')
const cors = require('@koa/cors');
const config = require('./config/config')
require('module-alias/register')
const app = new Koa();

const routerIndex = require('@api/index')
const poetry_router = require('@api/poetry')
const catchError = require("@middlewares/exception")
const Router = require('koa-router')
const httpException = require("@core/httpException")
global.errs = httpException
global.config = config

// 中间件
app.use(cors())
app.use(catchError)
app.use(parser({
    multipart: true,
}))
app.use(routerIndex.routes()).use(routerIndex.allowedMethods())
app.use(poetry_router.routes())


app.listen(config.port);
console.log(`Koa is listening in http://localhost:${ config.port }`)
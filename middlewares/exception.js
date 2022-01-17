const Resolve = require('@app/lib/helper')

let resolve = new Resolve()
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(error)
        ctx.response.body = resolve.json({}, '服务器异常', 10086)
    }
    if (parseInt(ctx.status) === 404) {
        ctx.response.body = resolve.json({}, '未找到接口', ctx.status)
    }
}

module.exports = catchError

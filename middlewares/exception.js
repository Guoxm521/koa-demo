const Resolve = require('@app/lib/helper')
const { HttpException } = require('@core/httpException')

let resolve = new Resolve()
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException;

        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                code: error.errorCode,
                request: `${ ctx.method } ${ ctx.path }`
            }
            ctx.response.status = error.code

        } else {
            console.log(error)
            ctx.body = {
                msg: "未知错误！",
                code: 9999,
                request: `${ ctx.method } ${ ctx.path }`
            }
            ctx.response.status = 500
        }

    }
    if (parseInt(ctx.status) === 404) {
        return ctx.response.body = resolve.json({}, '未找到接口', ctx.status)
    }
}


module.exports = catchError

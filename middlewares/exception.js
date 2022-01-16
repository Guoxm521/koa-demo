const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.response.body = {
            code: '00000',
            message: '服务器异常',
            desc: error.message
        }
    }
    if (parseInt(ctx.status) === 404) {
        ctx.response.body = {
            code: ctx.status,
            message: '未找到接口'
        }
    }
}

module.exports = catchError

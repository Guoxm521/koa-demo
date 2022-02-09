class Auth {
    get m() {
        return async (ctx, next) => {
            console.log("中间件")
            await next()
        }
    }

}

class HttpException extends Error {
    constructor(msg = '服务器异常dsadasdasd', errorCode = 10000, code = 400) {
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

module.exports = {
    Auth
}

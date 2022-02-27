const jwt = require('jsonwebtoken')

// 默认验证全部接口   白名单之外的不验证
class Auth {
    constructor(obj = {}) {
        this.level = obj.level || 1
        this.prefix = obj.prefix || ''
        this.whiteList = obj.whiteList || []
    }

    get m() {
        return this.verify
    }

    get verify() {
        return async (ctx, next) => {
            let flag = this.verifyWhiteList(ctx)
            if (flag) {
                await next()
            } else {
                let authToken = ctx.header['authorization']
                let errMsg = "无效的token";
                if (!authToken) {
                    errMsg = "需要携带token值";
                    throw new global.errs.Forbidden(errMsg, 4001);
                }
                try {
                    var decode = jwt.verify(authToken, global.config.security.secretKey)
                } catch (error) {
                    if (error.name === 'TokenExpiredError') {
                        errMsg = "token已过期"
                    }
                    throw new global.errs.Forbidden(errMsg, 4002);
                }
                ctx.auth = {
                    uid: decode.uid
                }
                await next()
            }

        }
    }

    // 验证白名单
    verifyWhiteList(ctx) {
        let nowUrl = this.prefix ? ctx.path.split(this.prefix)[1] : ctx.path
        let isPass = false
        if (this.whiteList && this.whiteList.length > 0) {
            let index = this.whiteList.findIndex(e => { return e == nowUrl })
            if (index !== -1) {
                isPass = true
            }
        }
        return isPass
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

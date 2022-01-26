const { BlogAdminDao } = require('@dao/blobAdmin')
const { generateToken } = require('@core/util')
class LoginManager {
    static async adminLogin(params) {
        const { email, password } = params
        // 验证账号密码是否正确
        const [err, admin] = await BlogAdminDao.verify({ email, password });
        generateToken()
        if (!err) {
            return [null, admin]
        } else {
            return [err, null]
        }
    }
}

module.exports = {
    LoginManager
}

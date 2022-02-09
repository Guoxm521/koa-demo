const { BlogAdminDao } = require('@dao/blobAdmin')
const { generateToken } = require('@core/util')
class LoginManager {
    static async adminLogin(params) {
        const { email, password } = params
        const [err, admin] = await BlogAdminDao.verify({ email, password });
        if (!err) {
            let token = generateToken(admin.id)
            return [null, {
                token,
                email: admin.email,
                nickname: admin.nickname,
            }]
        } else {
            return [err, null]
        }
    }
}

module.exports = {
    LoginManager
}

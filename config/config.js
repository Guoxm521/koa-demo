const database = require("./dataBase")
module.exports = {
    environment: 'dev',
    port: 3000,
    database: {
        dbName: 'gxm_poetry',
        host: database.host,
        port: database.port,
        user: database.user,
        password: database.password
    },
    security: {
        secretKey: "guoXiaoMing",
        // 过期时间 1小时
        expiresIn: 60 * 60
    }
}
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
        // 过期时间 7天
        expiresIn: 60 * 60 * 24 * 7
        // expiresIn: 30
    }
}
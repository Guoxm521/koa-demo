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
}
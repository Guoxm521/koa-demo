const Redis = require('ioredis')
const database = require('@config/database.js')
const redis = new Redis({
    port: database.redis.port,
    host: database.redis.host
})

module.exports = redis
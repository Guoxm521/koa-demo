const redis = require("@core/redis.js")
const database = require('@config/database.js')
const expire = database.redis.expire

async function setValue(key, value) {
    try {
        await redis.set(key, value)
        await redis.expire(key, expire)
        return true
    } catch (error) {
        throw error
    }
}
async function getValue(key) {
    try {
        return await redis.get(key)
    } catch (error) {
        throw error
    }
}

module.exports = {
    setValue,
    getValue
}
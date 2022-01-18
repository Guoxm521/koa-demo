const { Op } = require('sequelize')
const PoetryCategory = require('@models/PoetryCategory')



// 分类接口
class PoetryCategoryDao {
    static async list(params = {}) {
        const { id, dynasty_id, dynasty } = params;
        let filter = {}
        if (id) { filter.id = id }
        if (dynasty) { filter.id = dynasty }
        if (dynasty_id) { filter.dynasty_id = dynasty_id }
        try {
            const list = await PoetryCategory.findAll({ raw: true })
            let data = {
                list: list
            }
            return [null, data]
        } catch (error) {
            return [error.message, null]
        }
    }
}

module.exports = {
    PoetryCategoryDao
}
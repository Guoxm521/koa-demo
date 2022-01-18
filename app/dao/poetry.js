const { Op } = require('sequelize')
const PoetryAll = require('@models/PoetryAll')
const Resolve = require('@app/lib/helper')


class PoetryAllDao {
    // 列表
    static async list(params = {}) {
        const { id, dynasty_id, title, author, dynasty, content, page_size = 10, page = 1 } = params;
        let filter = {}
        if (id) { filter.id = id }
        if (dynasty) { filter.id = dynasty }
        if (author) { filter.author = author }
        if (dynasty_id) { filter.dynasty_id = dynasty_id }
        if (title) {
            filter.title = {
                [Op.like]: `%${ title }%`
            };
        }
        if (content) {
            filter.content = {
                [Op.like]: `%${ content }%`
            };
        }
        try {
            const { count, rows } = await PoetryAll.findAndCountAll({
                limit: +page_size,
                offset: (page - 1) * page_size,
                where: filter
            })
            let data = {
                count,
                list: rows,
                page,
                page_size
            }
            return [null, data]
        } catch (error) {
            return [error.message, null]
        }
    }

}

module.exports = {
    PoetryAllDao
}
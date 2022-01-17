const { Op } = require('sequelize')
const PoetryAll = require('@models/PoetryAll')
const Resolve = require('@app/lib/helper')
let resolve = new Resolve()


class PoetryAllDao {
    static async list(params = {}) {
        const { id, title, author, dynasty, content, page_size = 10, status, page = 1 } = params;
        let filter = {}
        if (id) { filter.id = id }
        if (dynasty) { filter.id = dynasty }
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
            return [error, null]
        }
    }
}

module.exports = {
    PoetryAllDao
}
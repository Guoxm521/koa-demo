const Sequelize = require('sequelize')
const PoetryCategory = require('@models/PoetryCategory')
const PoetryAll = require('@models/PoetryAll')
const { setValue, getValue } = require('@app/lib/redisUtils.js')

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

    // 朝代统计
    static async listCount(params = {}) {
        let { order } = params
        let order_method = null
        if (order == 1) {
            order_method = Sequelize.literal('count ASC')
        } else if (order == 2) {
            order_method = Sequelize.literal('count DESC')
        } else {
            order_method = ''
        }
        try {
            let redisRes = await getValue('listCount')
            let data = {}
            if (redisRes) {
                let newList = JSON.parse(redisRes)
                data.list = newList
                return [null, data]
            }
            const list = await PoetryAll.findAll({
                attributes: [
                    'dynasty_id',
                    'dynasty',
                    [Sequelize.fn('COUNT', Sequelize.col('author')), 'count'],
                ],
                group: ['dynasty', 'dynasty_id'],
                order: order_method ? [order_method] : []
            })
            await setValue('listCount', JSON.stringify(list))
            data.list = list
            return [null, data]
        } catch (error) {
            return [error.message, null]
        }
    }

    // 各朝诗歌top
    static async dynastyTop(params = {}) {
        try {
            let { level, type } = params
            if (!level) level = 2
            if (!type) type = 1  //1  按朝代统计  2  总数前10
            let data = {}
            // 各朝前5
            if (type === 1) {
                let redisRes = await getValue('dynastyTop1')
                if (redisRes) {
                    let newList = JSON.parse(redisRes)
                    data.list = newList
                    return [null, data]
                }
            }
            // 前100
            if (type == 2) {
                let redisRes = await getValue('dynastyTop2')
                if (redisRes) {
                    let newList = JSON.parse(redisRes)
                    data.list = newList
                    return [null, data]
                }
            }


            const authorList = await PoetryAll.findAll({
                attributes: [
                    'author',
                    'dynasty_id',
                    [Sequelize.fn('COUNT', Sequelize.col('author')), 'count'],
                ],
                group: ['author', 'dynasty_id'],
                order: ['dynasty_id', Sequelize.literal('count DESC')]
            })
            let list = []
            let allAuthorList = []
            if (type === 1) {
                list = await PoetryCategory.findAll({ raw: true })
                const authorCategoryList = {}
                authorList.map(item => {
                    authorCategoryList[item.dynasty_id] = authorCategoryList[item.dynasty_id] || [];
                    authorCategoryList[item.dynasty_id].push(item);
                })
                list.map(e => {
                    e.top_list = authorCategoryList[e.dynasty_id].slice(0, level)
                })
            } else {
                allAuthorList = authorList.slice(0, level)
            }
            if (type == 1) {
                await setValue('dynastyTop1', JSON.stringify(list))
            } else if (type == 2) {
                await setValue('dynastyTop2', JSON.stringify(allAuthorList))
            }
            data.list = type === 1 ? list : allAuthorList
            return [null, data]
        } catch (error) {
            return [error.message, null]
        }
    }

    static async handleDynastyTop() {

    }
}

module.exports = {
    PoetryCategoryDao
}
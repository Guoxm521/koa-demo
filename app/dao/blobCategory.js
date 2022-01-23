const Sequelize = require('sequelize')
const BlogCategory = require('@models/BlogCategory')



class BlogCategoryDao {
    // 创建分类
    static async create(params = {}) {
        const {
            name,
            sort_order = 1,
            parent_id = 0,
        } = params
        const hasCategory = await BlogCategory.findOne({
            where: { name }
        });

        if (hasCategory) {
            throw new global.errs.Existing('分类已存在');
        }

        const category = new BlogCategory();
        category.name = name
        category.sort_order = sort_order
        category.parent_id = parent_id
        category.c_time = category.u_time = new Date().getTime()

        try {
            const res = await category.save();
            const data = {
                name: res.name,
                key: res.key,
                parent_id: res.parent_id,
                msg: '创建成功'
            }
            return [null, data]

        } catch (err) {
            return [err, null]
        }
    }

    // 删除分类
    static async destroy(id) {
        const category = await BlogCategory.findOne({
            where: {
                id
            }
        });
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类');
        }
        try {
            const res = await BlogCategory.destroy({
                where: {
                    id
                }
            })
            return [null, res]

        } catch (err) {
            return [err, null]
        }
    }

    // 更新分类
    static async update(params) {
        const {
            id,
            name,
            sort_order,
            status,
            parent_id
        } = params
        const category = await BlogCategory.findByPk(id);
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类');
        }
        category.name = name;
        category.status = status;
        category.sort_order = sort_order;
        category.parent_id = parent_id || 0;
        category.u_time = new Date().getTime()

        try {
            const res = await category.save();
            return [null, res]
        } catch (err) {
            return [err, null]
        }
    }

    // 获取列表
    static async list(query = {}) {
        const { id, name, status, parent_id, page_size = 10, page = 1 } = query;
        let params = {}
        if (status) params.status = status
        if (id) params.id = id
        if (parent_id) params.parent_id = parent_id
        if (name) {
            params.name = {
                [Op.like]: `%${ name }%`
            };
        }
        try {
            const { count, rows } = await BlogCategory.findAndCountAll({
                where: params,
                limit: +page_size,
                offset: (page - 1) * page_size,
                order: [
                    ['c_time', 'DESC']
                ]
            });
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

    // 获取详情
    static async detail(query = {}) {
        const { id } = query;
        let params = {}
        if (id) params.id = id
        try {
            const detail = await BlogCategory.findOne({
                where: params,
                order: [
                    ['c_time', 'DESC']
                ]
            });
            let data = detail
            return [null, data]
        } catch (error) {
            return [error.message, null]
        }

    }
}

module.exports = {
    BlogCategoryDao
}
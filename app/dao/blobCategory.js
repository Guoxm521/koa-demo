const Sequelize = require('sequelize')
const BlogCategory = require('@models/BlogCategory')
const { handleTree } = require("@app/lib/utils")


class BlogCategoryDao {
    // 创建分类
    static async create(params = {}) {
        const {
            name,
            sort_order = 1,
            parent_id = 0,
            status = 1
        } = params
        if (parent_id) {
            const hasParent = await BlogCategory.findOne({
                where: { id: parent_id }
            });
            if (!hasParent) {
                throw new global.errs.Existing('父级分类不存在');
            }
        }
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
        category.status = status
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
        if (category.status === 1) {
            throw new global.errs.Existing('该分类已启用，无法删除');
        }
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类');
        }

        const hasChild = await BlogCategory.findOne({
            where: { parent_id: id }
        });
        if (hasChild) {
            throw new global.errs.Existing('该分类下存在子分类');
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
            const res = await BlogCategory.update(category, {
                where: {
                    id: id
                }
            });
            return [null, res]
        } catch (err) {
            return [err, null]
        }
    }

    // 获取列表
    static async list(query = {}) {
        const { id, name, status, parent_id, type } = query;
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
                order: [
                    ['sort_order', 'ASC',],
                    ['c_time', 'ASC',]
                ]
            });
            let arr = type == 1 ? rows : handleTree(rows)
            let data = {
                count,
                list: arr
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
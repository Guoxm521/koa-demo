const Sequelize = require('sequelize')
const BlogTag = require('@models/BlogTag')
const { Op } = require('sequelize')
class BlogTagDao {
    // 创建
    static async create(params = {}) {
        const {
            name,
            status = 1
        } = params
        const hasBlogTag = await BlogTag.findOne({
            where: { name }
        });

        if (hasBlogTag) {
            throw new global.errs.Existing('标签已存在');
        }

        const blogTag = new BlogTag();
        blogTag.name = name
        blogTag.status = status
        blogTag.c_time = blogTag.u_time = new Date().getTime()

        try {
            const res = await blogTag.save();
            const data = {
                name: res.name,
                status: res.status,
                msg: '创建成功'
            }
            return [null, data]

        } catch (err) {
            return [err, null]
        }
    }

    //删除
    static async delete(id) {
        const blogTag = await BlogTag.findOne({
            where: {
                id
            }
        });
        if (!blogTag) {
            throw new global.errs.NotFound('标签不存在');
        }
        if (blogTag && blogTag.status === 1) {
            throw new global.errs.Existing('该标签已使用，无法删除');
        }
        try {
            const res = await blogTag.destroy({
                where: {
                    id
                }
            })
            return [null, res]
        } catch (err) {
            return [err, null]
        }
    }

    // 修改
    static async update(params = {}) {
        const {
            id,
            name,
            status
        } = params
        const blogTag = await BlogTag.findByPk(id);
        if (!blogTag) {
            throw new global.errs.NotFound('没有找到相关的标签');
        }
        for (const item in params) {
            if (item && item !== 'id') {
                blogTag[item] = params[item]
            }
        }
        blogTag.u_time = new Date().getTime()
        try {
            const res = await BlogTag.update(blogTag, {
                where: {
                    id: id
                }
            });
            return [null, res]
        } catch (err) {
            return [err, null]
        }
    }

    // 列表
    static async list(query = {}) {
        let { id, name, status, page_size, page = 1 } = query
        let params = {}
        if (status) params.status = status
        if (id) params.id = id
        if (name) {
            params.name = {
                [Op.like]: `%${ name }%`
            };
        }
        const queryParams = {
            order: [
                ['c_time', 'ASC',]
            ]
        }
        if (page_size) {
            queryParams.limit = +page_size
            queryParams.offset = (page - 1) * page_size
        }
        if (params) {
            queryParams.where = params
        }
        const { count, rows } = await BlogTag.findAndCountAll(queryParams)
        let data = {
            count,
            list: rows,
            page,
            page_size: page_size ? page_size : ""
        }
        return [null, data]
    }
}

module.exports = {
    BlogTagDao
}
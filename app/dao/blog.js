const Sequelize = require("sequelize");
const Blog = require("@models/Blog");
const { Op } = require("sequelize");

class BlogDao {
  // 创建
  static async create(params = {}) {
    let paramsLength = Object.keys(params).length;
    if (paramsLength.length === 0) {
      throw new global.errs.NotFound("参数不存在");
    }
    const blog = new Blog();
    for (const item in params) {
      if (params[item] && params[item] !== "") {
        blog[item] = params[item];
      }
    }
    if (blog.status === null || blog.status === undefined) {
      blog.status = 2;
    }
    blog.c_time = blog.u_time = new Date().getTime();
    try {
      const res = await blog.save();
      const data = res;
      return [null, data];
    } catch (err) {
      return [err, null];
    }
  }

  //删除
  static async delete(id) {
    const blog = await Blog.findOne({
      where: {
        id,
      },
    });
    if (!blog) {
      throw new global.errs.NotFound("文章不存在");
    }
    if (blog && blog.status === 1) {
      throw new global.errs.Existing("该文章发布，无法删除");
    }
    try {
      const res = await Blog.destroy({
        where: {
          id,
        },
      });
      return [null, res];
    } catch (err) {
      return [err, null];
    }
  }

  // 修改
  static async update(params = {}) {
    const { id, title, des, category, cover, tag, content, status } = params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new global.errs.NotFound("没有找到相关的文章");
    }
    for (const item in params) {
      if ((params[item] && item !== "id") || params[item] === 0) {
        blog[item] = params[item];
      }
    }
    blog.u_time = new Date().getTime();
    try {
      const res = await Blog.update(blog, {
        where: {
          id: id,
        },
      });
      return [null, res];
    } catch (err) {
      return [err, null];
    }
  }

  // 查询
  static async detail(query = {}) {
    const { id } = query;
    let params = {};
    if (id) params.id = id;
    try {
      const detail = await Blog.findOne({
        where: params,
      });
      let data = detail;
      return [null, data];
    } catch (error) {
      return [error.message, null];
    }
  }

  // 列表
  static async list(query = {}) {
    let { id, title, category, tag, status, page_size = 10, page = 1 } = query;
    let params = {};
    if (status) params.status = status;
    if (status !== 0 && !status) params.status = { [Op.ne]: 2 };
    if (id) params.id = id;
    if (title) {
      params.title = {
        [Op.like]: `%${title}%`,
      };
    }

    const { count, rows } = await Blog.findAndCountAll({
      limit: +page_size,
      offset: (page - 1) * page_size,
      where: params,
      order: [
        ["status", "DESC"],
        ["u_time", "DESC"],
      ],
    });
    let data = {
      count,
      list: rows,
      page,
      page_size,
    };
    return [null, data];
  }
}

module.exports = {
  BlogDao,
};

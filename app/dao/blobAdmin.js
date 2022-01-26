const Sequelize = require('sequelize')
const BlogAdmin = require('@models/BlogAdmin')
const bcryptjs = require("bcryptjs")


class BlogAdminDao {
    // 创建
    static async create(params) {
        const { email, password, nickname } = params
        const hasAdmin = await BlogAdmin.findOne({
            where: {
                email,
            }
        });
        if (hasAdmin) {
            throw new global.errs.Existing('管理员已存在');
        }
        const admin = new BlogAdmin();
        admin.nickname = nickname
        admin.email = email
        admin.password = password
        admin.c_time = admin.u_time = new Date().getTime()
        try {
            const res = await admin.save();
            const data = {
                email: res.email,
                nickname: res.nickname
            }
            return [null, data]
        } catch (err) {
            return [err, null]
        }
    }

    //验证密码
    static async verify(params) {
        const { email, password } = params
        try {
            const hasAdmin = await BlogAdmin.findOne({
                where: {
                    email,
                }
            });
            if (!hasAdmin) {
                throw new global.errs.Existing('账号不存在');
            }
            const correct = bcryptjs.compareSync(password, hasAdmin.password);
            if (!correct) {
                throw new global.errs.AuthFailed('账号不存在或者密码不正确')
            }
            return [null, hasAdmin]

        } catch (error) {
            return [error, null]
        }
    }

    // 修改密码
    static async change() {

    }

    // 查询管理员信息
    static async detail(id) {

    }
}

module.exports = {
    BlogAdminDao
}
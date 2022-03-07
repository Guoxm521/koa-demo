const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')
const bcryptjs = require('bcryptjs')

class BlogAdmin extends Model {

}

BlogAdmin.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '分类主键ID'
    },
    email: {
        type: DataTypes.STRING(50),
        unique: 'admin_email_unique',
        allowNull: false,
        comment: '登录邮箱'
    },
    status: {
        type: DataTypes.INET(2),
        allowNull: false,
        defaultValue: 1,
        comment: "类别状态,0-隐藏,1-正常",
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '登录密码',
        set(val) {
            const salt = bcryptjs.genSaltSync(10);
            const psw = bcryptjs.hashSync(val, salt);
            this.setDataValue("password", psw);
        },
    },
    nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '管理员昵称'
    },
    c_time: {
        type: DataTypes.STRING(13),
        allowNull: true,
        defaultValue: 0,
        comment: '创建时间戳',

    },
    u_time: {
        type: DataTypes.STRING(13),
        allowNull: true,
        defaultValue: 0,
        comment: '更新时间戳',
    },
}, {
    sequelize,
    modelName: 'BlogAdmin',
    tableName: 'gxm_blog_admin',
})
// BlogAdmin.sync()
module.exports = BlogAdmin
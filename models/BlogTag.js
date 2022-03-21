const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')

class BlogTagModel extends Model {

}

BlogTagModel.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '分类主键ID'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '分类名称'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: "类别状态,0-隐藏,1-正常",
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
    modelName: 'BlogTagModel',
    tableName: 'gxm_blog_tags',
})
module.exports = BlogTagModel
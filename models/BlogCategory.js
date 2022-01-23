const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')
const moment = require('moment');

class BlogCategory extends Model {

}

BlogCategory.init({
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
    sort_order: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 1,
        comment: "排序编号",
    },
    parent_id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 0,
        comment: '父类别id,id=0代表根节点'
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
    modelName: 'BlogCategory',
    tableName: 'gxm_blog_category',
})
// BlogCategory.sync({ force: true })
module.exports = BlogCategory
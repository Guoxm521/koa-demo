const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')

class BlogModel extends Model {

}

BlogModel.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '分类主键ID'
    },
    title: {
        type: DataTypes.STRING(80),
        allowNull: true,
        comment: '标题'
    },
    des: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: '描述'
    },
    category: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        comment: '分类'
    },
    cover: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '封面'
    },
    tag: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: '标签'
    },
    content: {
        type: DataTypes.TEXT(),
        allowNull: true,
        comment: '内容'
    },
    status: {
        type: DataTypes.INET(2),
        allowNull: false,
        defaultValue: 2,
        comment: "类别状态,0-隐藏,1-正常,2-草稿",
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
    modelName: 'BlogModel',
    tableName: 'gxm_blog',
})
module.exports = BlogModel
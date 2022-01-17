const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')

class PoetryAll extends Model {

}

PoetryAll.init({
    id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
    },
    author: {
        type: DataTypes.STRING(25),
    },
    dynasty: {
        type: DataTypes.STRING(10),
    },
    content: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'PoetryAll',
    tableName: 'gxm_poetry_all',

    // tableName: 'demo'
})

module.exports = PoetryAll
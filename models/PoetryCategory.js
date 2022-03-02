const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')

class PoetryCategory extends Model {

}

PoetryCategory.init({
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
    },
    dynasty: {
        type: DataTypes.STRING(255),
    },
    dynasty_id: {
        type: DataTypes.STRING(25),
    },
    time:{
        type:DataTypes.CHAR(32)
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'PoetryCategory',
    tableName: 'gxm_poetry_category',
})

module.exports = PoetryCategory
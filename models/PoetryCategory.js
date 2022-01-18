const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')

class PoetryCategory extends Model {

}

PoetryCategory.init({
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true
    },
    dynastry: {
        type: DataTypes.STRING(255),
    },
    dynastry_id: {
        type: DataTypes.STRING(25),
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'PoetryCategory',
    tableName: 'gxm_poetry_category',
})

module.exports = PoetryCategory
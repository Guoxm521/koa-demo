const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')

class CeShiModel extends Model {

}

CeShiModel.init({

}, {
    sequelize,
    modelName: 'CeShiModel',
    tableName: '',
})
// CeShiModel.sync()
module.exports = CeShiModel
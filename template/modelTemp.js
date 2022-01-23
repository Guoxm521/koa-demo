const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')

class TempModel extends Model {

}

TempModel.init({

}, {
    sequelize,
    modelName: 'TempModel',
    tableName: '',
})
// TempModel.sync()
module.exports = TempModel
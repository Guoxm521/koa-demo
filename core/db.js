const Sequelize = require('sequelize')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database


const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    define: {
        timestamps: false
    },
    // logging: false
})


sequelize.authenticate().then(res => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})


module.exports = {
    sequelize
}

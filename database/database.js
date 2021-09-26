const Sequelize = require('sequelize');

const connection = new Sequelize ('guiaperguntas', 'root', 'Clarinh4*',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;
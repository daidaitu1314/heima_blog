var Sequelize = require('sequelize');
var sequelize = new Sequelize('mytest', 'root', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

module.exports = sequelize;
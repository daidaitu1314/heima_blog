var Sequelize = require('sequelize');
var Db = require('./baseDb');

var GuestUser = Db.define('guestuser', {
  id: { // 主键id
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  username: { // 用户名
    allowNull: false,
    type: Sequelize.STRING
  },
  password: { // 用户密码
    allowNull: false,
    type: Sequelize.STRING
  },
  nickname: Sequelize.STRING // 昵称
});

module.exports = GuestUser;
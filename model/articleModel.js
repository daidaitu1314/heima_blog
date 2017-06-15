var Db = require('./baseDb');
var Sequelize = require('sequelize');
var UserModel = require('./UserModel');

var Article = Db.define('article', {
  id: {
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING
  },
  content: {
    allowNull: false,
    type: Sequelize.TEXT
  },
  authorId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// 设置实体之间的关联关系
// 其中 foreignKey 表示当前表中的 外键
// targetKey 表示关联表中的 主键
Article.belongsTo(UserModel, {
  foreignKey: 'authorId',
  targetKey: 'id'
});

module.exports = Article;
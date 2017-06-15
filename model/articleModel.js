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
    allowNull: false,
    references: { // 设置外键引用
      model: UserModel, // 引用的Model
      key: 'id' // 引用的 key
    }
  }
});

// 设置实体之间的关联
Article.belongsTo(UserModel, { foreignKey: 'authorId', targetKey: 'id' });

module.exports = Article;
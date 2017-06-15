var ArticleModel = require('../model/articleModel');
var UserModel = require('../model/UserModel');

module.exports = {
  getIndexPage(req, res) { // 获取首页
    ArticleModel.sync().then(() => {
      // 查询所有的文章数据
      ArticleModel.findAll({
        include:[{model:UserModel}] // 通过在查询的时候，指定 include 选项，从而将关联表中的数据也加载进来【重要】
      }).then(results => {
        var info = { islogin: req.session.islogin, user: req.session.user, articles: results };
        res.render('index.ejs', info);
      });
    });
  }
}
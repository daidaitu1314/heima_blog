var ArticleModel = require('../model/articleModel');
var marked = require('marked');

module.exports = {
  getArticleAddPage(req, res) { // 获取添加文章的页面
    // 如果没有登录则直接跳转到登录页面
    if (!req.session.islogin) {
      res.redirect('/login');
    }
    res.render('./article/add.ejs', { islogin: req.session.islogin, user: req.session.user });
  },
  addArticle(req, res) { // 添加文章
    var article = req.body;
    article.authorId = req.session.user.id;
    ArticleModel.sync().then(() => {
      return ArticleModel.create(article);
    }).then(result => {
      if (result.dataValues) {
        res.json({
          err_code: 0,
          id: result.dataValues.id // 将文章Id发送到客户端
        });
      } else {
        res.json({
          err_code: 1,
          msg: '保存文章失败！请稍后再试！'
        });
      }
    });
  },
  showArticleInfo(req, res) { // 展示文章详细信息
    var id = req.query.id;
    ArticleModel.sync().then(() => {
      return ArticleModel.findOne({
        where: {
          id: id
        }
      });
    }).then(result => {
      result.dataValues.content = marked(result.dataValues.content);
      console.log(result);
      res.render('./article/info.ejs', {
        islogin: req.session.islogin || false,
        user: req.session.user,
        article: result.dataValues
      });
    });
  },
  getArticleEditPage(req, res) { // 编辑文章
    if (!req.session.islogin) {
      res.redirect('/login');
    }
    var id = req.query.id;
    ArticleModel.sync().then(() => {
      return ArticleModel.findOne({
        where: {
          id: id
        }
      });
    }).then(result => {
      if (result.dataValues) {
        res.render('./article/edit.ejs', { islogin: req.session.islogin, user: req.session.user, article: result });
      }
    });
  },
  editArticle(req, res) { // 编辑文章信息
    var article = req.body;
    ArticleModel.sync().then(() => {
      ArticleModel.update(article, {
        where: {
          id: article.id
        }
      }).then(result => {
        if (result[0] === 1) {
          res.json({
            err_code: 0
          });
        }else {
          res.json({
            err_code:1,
            msg:'更新文章失败，请稍后再试！'
          });
        }
      });
    });
  }
}
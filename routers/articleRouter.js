var express = require('express');
var router = express.Router();
var ArticleModel = require('../controller/articleCtrl');

router.get('/article/add', ArticleModel.getArticleAddPage)
  .post('/article/add', ArticleModel.addArticle)
  .get('/article/info', ArticleModel.showArticleInfo)
  .get('/article/edit', ArticleModel.getArticleEditPage)
  .post('/article/edit', ArticleModel.editArticle);

module.exports = router;
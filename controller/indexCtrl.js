var ArticleModel = require('../model/articleModel');
var UserModel = require('../model/UserModel');

module.exports = {
  getIndexPage(req, res) { // 获取首页
    // 定义每页显示的数据条数
    var pageSize = 2;
    // 从请求对象上获取当前请求的页码
    var page = req.query.page || 1;

    ArticleModel.sync().then(() => {
      // 查询文章数据，并且获取总数据条数
      ArticleModel.findAndCountAll({
        order: [
          ['createdAt', 'desc']
        ],
        offset: (page - 1) * pageSize, // 起始位置
        limit: pageSize, // 取几条数据
        include: [{ model: UserModel }] // 通过在查询的时候，指定 include 选项，从而将关联表中的数据也加载进来【重要】
      }).then((results) => {
        console.log(results);
        // 组织 ejs 模板渲染时候的数据
        var info = {
          islogin: req.session.islogin,
          user: req.session.user,
          articles: results.rows,
          totalPage: Math.ceil(results.count / pageSize),
          nowPage: page
        };
        res.render('index.ejs', info);
      });
    });
  }
}
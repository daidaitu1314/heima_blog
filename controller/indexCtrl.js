module.exports = {
  getIndexPage(req, res) { // 获取首页
    var info = { islogin: req.session.islogin, user: req.session.user };
    res.render('index.ejs', info);
  }
}
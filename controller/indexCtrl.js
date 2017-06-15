module.exports = {
  getIndexPage(req, res) { // 获取首页
    res.render('index.ejs', { islogin: req.session.islogin });
  }
}
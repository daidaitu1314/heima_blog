var UserModel = require('../model/UserModel');

module.exports = {
  getIndexPage(req, res) { // 获取首页
    res.render('index.ejs');
  },
  getRegisterPage(req, res) {
    res.render('./user/register.ejs');
  },
  regUser(req, res) { // 注册新用户
    UserModel.sync().then(() => {
      UserModel.findOne({
        where: {
          username: req.body.username
        }
      }).then((result) => {
        if (result === null) {
          return UserModel.create(req.body);
        } else {
          return false;
        }
      }).then((result) => {
        if (result === false) {
          res.json({
            err_code: 1,
            msg: '此用户已被注册！'
          });
        } else {
          res.json({
            err_code: 0,
            msg: '注册成功'
          });
        }
      });
    });
  },
  showLoginPage(req, res) { // 展示登录页面
    res.render('./user/login.ejs');
  },
  userLogin(req, res) { // 用户登录
    var userinfo = req.body;
    UserModel.findOne({
      where: {
        username: userinfo.username,
        password: userinfo.password
      }
    }).then((result) => {
      if (result === null) {
        res.json({
          err_code: 1,
          msg: '登录失败！用户不存在！'
        });
      } else {
        res.json({
          err_code: 0,
          msg: '登录成功！'
        });
      }
    });
  }
}
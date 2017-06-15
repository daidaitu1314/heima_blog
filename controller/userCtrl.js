var UserModel = require('../model/UserModel');
var md5 = require('blueimp-md5');
var common = require('../common');

module.exports = {
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
          // 对注册密码进行加密处理
          req.body.password = md5(req.body.password, common.passwordSalt);
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
        password: md5(userinfo.password, common.passwordSalt)
      }
    }).then((result) => {
      if (result === null) {
        res.json({
          err_code: 1,
          msg: '登录失败！用户不存在！'
        });
      } else {
        // console.log(result.dataValues);
        // 将登录的用户保存到session中
        req.session.user = result.dataValues;
        // 设置是否登录为true
        req.session.islogin = true;
        res.json({
          err_code: 0,
          msg: '登录成功！'
        });
      }
    });
  },
  userLogout(req, res) { // 注销登录
    req.session.destroy(function (err) {
      if (err) throw err;
      console.log('用户退出成功！');
      res.redirect('/');
    });
  }
}
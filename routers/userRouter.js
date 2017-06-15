var express = require('express');
var router = express.Router();
var UserCtrl = require('../controller/userCtrl');

router
  .get('/reg', UserCtrl.getRegisterPage)
  .post('/reguser', UserCtrl.regUser)
  .get('/login', UserCtrl.showLoginPage)
  .post('/login', UserCtrl.userLogin);

module.exports = router;
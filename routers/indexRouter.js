var express = require('express');
var router = express.Router();
var IndexCtrl = require('../controller/indexCtrl');

router.get('/', IndexCtrl.getIndexPage);

module.exports = router;
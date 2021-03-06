var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

// 导入 session 模块
var session = require('express-session');

// 导入模板引擎
var ejs = require('ejs');
ejs.delimiter = '?';

// 导入路由
/*var indexRouter = require('./routers/indexRouter');
var userRouter = require('./routers/userRouter');*/

var app = express();
// 设置静态资源请求路径
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// 设置模板引擎
app.engine('ejs', ejs.renderFile);

// 使用解析body数据的中间件
app.use(bodyParser.urlencoded({ extended: false }));

// 启用 session 中间件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 注册路由中间件
/*app.use(indexRouter);
app.use(userRouter);*/

// 循环读取路由组件，并注册
fs.readdir(path.join(__dirname, './routers'), (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    app.use(require(path.join(__dirname, './routers', file)));
  });
});

app.listen(3000, function () {
  console.log('Server running at http://127.0.0.1:3000!');
});
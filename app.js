var path = require('path');
var express = require('express');
// 导入模板引擎
var ejs = require('ejs');
ejs.delimiter = '?';

var app = express();
// 设置静态资源请求路径
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
// 设置模板引擎
app.engine('ejs', ejs.renderFile);
var indexRouter = require('./routers/indexRouter');
app.use(indexRouter);

app.listen(3000, function () {
  console.log('Server running at http://127.0.0.1:3000!');
});
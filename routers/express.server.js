var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var morgan = require('morgan');
var ut = require('../util/common.common.js');
var logger = require("../util/common.logger.js").logger('express');
var appCfg = require('../app.config.js');
var ejs = require("ejs");

var app = express();

app.set('views', appCfg.dir_root + '/views');
app.set('view engine', 'ejs');

// 以下是express 的各种中间件配置，注意各中间件的顺序
// 处理res路径下的http请求时，所有文件作为静态文件返回
app.use(appCfg.url_root + '/res', express.static(path.join(__dirname, '../res')));
// body parser -- for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 动态页面和服务的响应路由
var router = require('./express.router.js');
app.use(appCfg.url_root, router);

// 最后的请求处理函数：所有未被处理的请求在这里回复
app.use(function (req, res) {

  req.errorMsg = '您请求的页面不存在，是不是地址写错了？';

  res.status(404).render('page-error', req);
});

module.exports = app;

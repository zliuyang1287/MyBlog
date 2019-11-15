// 以下均是根据个人理解做出注释，欢迎分享交流

// 次数主要是用于引入所需依赖，包括安装在modules下的依赖，也包括自己写的模块
// 安装的依赖
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 自己编写的模块
// 引入路由
var route = require('./routes/route');
// 引入json格式化工具
var JsonFormat = require('./util/JsonFormat').JsonFormat;

// 创建一个express实例
var app = express();

// // 设置模板 其中__dirname为全局变量，表示当前正在执行的脚本所在的目录
// // 设置模版文件所在路径，也就是试图文件，都放在views层
// app.set('views', path.join(__dirname, 'views'));
// // 设置模版引擎，比如jade、ejs
// app.set('view engine', 'ejs');

// 加载一系列中间件，来自上面加载的不同模块
// 日志中间件
app.use(logger('dev'));
// json解析中间件
app.use(express.json());
// 解析urlencoded请求体的中间件
app.use(express.urlencoded({ extended: false }));
// cookie解析中间件
app.use(cookieParser());
// 其实这些不用记住，比如下面的参照20行就知道这是把public设置为静态文件夹
app.use(express.static(path.join(__dirname, 'public')));

// 设置路由，用于不同的页面之间的切换判断
route(app);

// 捕捉404错误信息并给出404提示，可以自定义提示信息
app.use(function(req, res, next) {
  JsonFormat.rtnError(res,'404 NOT FOUNT');
});

// 异常或错误信息处理
app.use(function(err, req, res, next) {
  JsonFormat.rtnError(res,err.message);
});

// 将配置好的express实例暴露出来供其他的系统调用
module.exports = app;

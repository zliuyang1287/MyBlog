// 路由总配置
// 引入用户路由
var user = require('./UserRoute');
var json = require('../util/JsonFormat');
var route = function(app){
    app.use(function(req,res,next){
        json.rtnError(res,'用户未登录');
    });
    // 以user开头，后面的增删改查动作放到UserRoute，直接以add，delete体现出来，不用addUser，deleteUser之类
    app.use('/user', user);
}


module.exports = route;
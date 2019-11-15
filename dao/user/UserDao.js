// 实现与MySQL交互
// 获取json格式化工具类
var json = require('../../util/JsonFormat');
// 获取编写好的sql语句
var sql = require('./User');
// 引入封装好的数据库操作工具
var db = require('../../util/DbUtils');
// 暴露方法给路由处调动
module.exports = {
	//增加
	add: function (req, res, next) {
		// 获取前台页面传过来的参数
		// ps:res和rsp有哪些属性可以去菜鸟教程的express部分查看，或者我在文末附上
		var param = req.query || req.search;
		// 处理判断参数传递的正确与否
		if(param.account==null || param.name==null || param.password==null){
			json.rtnError(res,'账号、密码、用户名都必须填写！');
			return;
		}
		// 条件正确执行插入
		db.executeSql(res,sql.insert,[param.account,param.password,param.name,new Date()]);
	},
	delete: function (req, res, next) {
		var id =req.query.id;
		if(id==null){
			json.rtnError(res,'未获取到要删除的信息！');
			return;
		}
		// 转为int因为这里数据库的id类型是int，否则默认是string类型,会导致报错
		db.executeSql(res,sql.delete,parseInt(id));
	},
	update: function (req, res, next) {
		// 根据id更新账户名、姓名信息
		var param = req.query;
		if(param.account == null || param.id == null || param.name == null) {
			json(res, '更新失败！账户、用户名、用户id均不可为空！');
			return;
		}
		db.executeSql(res,sql.update, [param.account, param.name, parseInt(param.id)]);
	},
	queryById: function (req, res, next) {
		var id = req.query.id; 
		if (id==null) {
			json.rtnError(res,"未获取到要查询的用户id！");
			return;
		}
		db.queryData(res,sql.queryById,parseInt(id));
	},
	queryAll: function (req, res, next) {
		db.queryData(res,sql.queryAll, null);
	},
	updatePsd: function (req, res, next) {
		var param = req.query || req.search;
		if (param.id == null || param.password == null) {
			json.rtnError(res,"密码修改失败!");
			return;
		}
		db.executeSql(res,sql.updatePsd,[param.password,parseInt(param.id)]);
	}
};
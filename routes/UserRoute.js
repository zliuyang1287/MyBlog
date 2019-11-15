var express = require('express');
var router = express.Router();
// 引入数据库的访问方法，类比Java这里就是注入Service
var userDao = require('../dao/user/UserDao');

//配置路由
// post就是post请求
router.post('/add', function(req, res, next) {
  // 调用userDao中的add方法
	userDao.add(req, res, next);
});
// get请求,习惯上数据添加修改都用post，查询删除用get
router.get('/delete', function(req, res, next) {
	userDao.delete(req, res, next);
});
router.post('/update', function(req, res, next) {
	userDao.update(req, res, next);
});
router.post('/updatePsd', function(req, res, next) {
	userDao.updatePsd(req, res, next);
});
router.get('/queryById', function(req, res, next) {
	userDao.queryById(req, res, next);
});
router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});
module.exports = router;
// 封装返回消息
var rtnSuccess = function (res) {
    var obj = { "code": 0, "msg": "操作成功" }
    res.json(obj);
};
var rtnError = function (res, message) {
    var obj = { "code": 1, "msg": message }
    res.json(obj);
};
var rtnObj = function (res, data) {
    var obj = { "code": 1, "msg": "操作成功", "data": data }
    res.json(obj);
};


module.exports = { rtnError, rtnObj, rtnSuccess };
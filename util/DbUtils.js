// 获取连接池
var pool = require('../conf/DbConf');
// 获取json格式化工具类
var json = require('./JsonFormat');
// 执行增删改通用方法
var executeSql = function (res, sql, param) {
    pool.getConnection(function (err, connection) {
        // 捕捉链接错误信息并返回
        if (err) {
            json.rtnError(res, "数据库连接失败:" + err.message);
            return;
        }
        // 执行sql语句，这里是插入一条信息query一共有三个参数，第一个是sql语句。第二个是参数数组，一定要和数据库的
        // 数据类型相对应，也要跟sql语句的占位符相对应。第三个是回调函数，err代表访问是否出错，result代表本次访问的回执信息
        connection.query(sql, param, function (err, result) {
            // 插入失败，返回错误信息
            if (err) {
                json.rtnError(res, err.message);
                return;
            }
            // 插入成功返回操作成功，result可以自己打印看一下，当只做查询时返回查询到的数据，其他诸如增删改操作返回的是一个
            // 对象，其中affectedRows就是受影响的行数，其余的属性可以自行打印看看
            if (result.affectedRows > 0) {
                json.rtnSuccess(res);
            }
            // 释放连接，访问数据库完成一定要及时干掉此次连接请求，不然一会你的数据库就崩死了 
            connection.release();
        });
    });
};

// 数据查询通用方法，param为null表示无参数查询
var queryData = function (res, sql, param) {
    pool.getConnection(function (err, connection) {
        if (err) {
            json.rtnError(res, "数据库连接失败:" + err.message);
            return;
        }
        if (param != null) {
            connection.query(sql, param, function (err, result) {
                if (err) {
                    json.rtnError(res, err.message);
                    return;
                }
                if (result) {
                    // 返回查询结果
                    json.rtnObj(res, result);
                }
            });
        } else {
            connection.query(sql, function (err, result) {
                if (err) {
                    json.rtnError(res, err.message);
                    return;
                }
                if (result) {
                    // 返回查询结果
                    json.rtnObj(res, result);
                }

            });
        }
        // 释放连接
        connection.release();
    });
};
// 提供给dao用
module.exports = { executeSql, queryData };
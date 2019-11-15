// conf/db.js
// MySQL数据库联接配置
var mysql = require('mysql');

var dbconf = {
    // 主机名
    host: '127.0.0.1',
    // 数据库用户名
    user: 'root',
    // 数据库密码
    password: '123456',
    // 链接的数据库
    database: 'blog',
    // 链接的端口
    port: 3306
}

// 创建数据库连接池
var pool = mysql.createPool(dbconf);

// 将连接池提供给它用
module.exports = pool;
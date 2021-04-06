//建立操作数据库的sql
let user = {
	insert:'INSERT INTO USER_INFO(ACCOUNT,PASSWORD,NAME,CREATE_DATE) VALUES(?,?,?,?)',
	update:'UPDATE USER_INFO SET ACCOUNT=?, NAME=? WHERE ID=?',
	delete: 'DELETE FROM USER_INFO WHERE ID=?',
	queryById: 'SELECT * FROM USER_INFO WHERE ID=?',
    queryAll: 'SELECT * FROM USER_INFO',
    updatePsd:'UPDATE USER_INFO SET PASSWORD=? WHERE ID=?'
};

module.exports = user;
var user = {
    insert: 'insert into user(name,age) values (?,?)',
    update: 'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    queryAll: 'select  * from user'
};

module.exports = user;
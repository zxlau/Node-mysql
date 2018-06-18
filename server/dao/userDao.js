var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

//连接池
var pool = mysql.createPool($util.extend({}, $conf.mysql));

//向前台返回JSON方法的简单封装
var jsonWrite = function (res,ret) {
    if(typeof ret === 'undefined'){
        res.json({
            code: '1',
            msg: '操作失败'
        });
    }else{
        res.json(ret);
    }
};

module.exports = {
    add: function(req,res,next){
        pool.getConnection(function(err,connection){
            //获取前端传过来的参数
            var params=null;
            if(JSON.stringify(req.body)==="{}"){
                if(JSON.stringify(req.query)==="{}"){
                    params = req.params;
                }else{
                    params = req.query;
                }
            }else{
                params = req.body;
            }
            //判断数据库是否存在相同的用户
            // connection.query($sql.queryAll,function(err,result){
            //     jsonWrite(res,result);
            //     connection.release();
            // })
            // return;

            //建立连接，向表中插入值
            connection.query($sql.insert, [params.name,params.age],function(err,result){
                if(result){
                    result = {
                        code: 200,
                        msg: '增加成功'
                    }
                }

                jsonWrite(res,result);

                //释放
                connection.release();
            })
        })
    },
    delete: function(req,res,next){
        pool.getConnection(function(err,connection){
            var id = +req.query.id;
            connection.query($sql.delete,id,function(err,result){
                if(result.affectedRows > 0){
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                }else{
                    result = void 0;
                }
                jsonWrite(res,result);
                connection.release();
            })
        })
    },
    update: function(req,res,next){
        var params = req.query;
        if(params.name == null || params.age == null || params.id ==null){
            jsonWrite(res,undefined);
            return;
        }
        pool.getConnection(function(err,connection){
            connection.query($sql.update,[params.name,params.age,+params.id],function(err,result){
                if(result.affectedRows > 0){
                    res.render('suc',{
                        result: result
                    })
                }else{
                    res.render('fail',{
                        result: result
                    })
                }
                connection.release();
            });
        })
    },
    queryById: function(req,res,next){
        var id = +req.query.id; //转整数
        pool.getConnection(function(err,connection){
            connection.query($sql.queryById, id, function(err,result) {
                jsonWrite(res, result);
                connection.release();
            })
        })
    },
    queryAll: function(req,res,next){
        pool.getConnection(function(err,connection){
            connection.query($sql.queryAll,function(err,result){
                jsonWrite(res,result);
                connection.release();
            })
        })
    }
}
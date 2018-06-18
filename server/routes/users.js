var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//增加用户
router.get('/addUser',function(req, res, next){
  console.log(req.body || req.query || req.params);
  res.setHeader('Access-Control-Allow-Origin','*');
  userDao.add(req, res, next);
});
router.post('/addUser',function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin','*');
  console.log(req.body);
  userDao.add(req, res, next);
});
//查询所有
router.get('/queryAll', function(req,res,next){
  userDao.queryAll(req,res,next);
});

router.get('/query', function(req,res,next){
  userDao.query(req,res,next);
});

router.get('/deleteUser', function(req,res,next){
  userDao.delete(req,res,next);
});

router.get('/updateUser', function(req,res,next){
  userDao.update(req,res,next);
});



module.exports = router;

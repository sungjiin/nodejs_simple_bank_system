var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var conn = require('C:\\Users\\Ka\\Desktop\\mid_project\\database\\mysql.js')();
var con = conn.init();
const ctrllogin = require('./view/no_session/menu.js')

router.use(bodyParser.urlencoded({extended:false}));


//회원가입------------------------------------------
router.get('/new', ctrllogin.join)
router.post('/new', function(req, res){
  var username = req.body.username;
  var userid = req.body.userid;
  var userpw = req.body.userpw;
  conn.join(con, userid, userpw, username, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      res.send(data);
    }
  })
})

//로그인------------------------------------------
router.get('/login', ctrllogin.login)
router.post('/login', function(req, res){
  var userid = req.body.id;
  var userpw = req.body.pw;
  var user = {
    id: userid,
    pw: userpw,
    name: userid
  };
  conn.login(con, user, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      if(data == true){
        req.session.displayName = userid;
        res.send('<script type = "text/javascript">self.location = "/main";alert("간단한 은행에 오신것을 환영합니다.");</script>')
      }
      else{
        res.send(data);
      }
    }
  })
});
module.exports = router;

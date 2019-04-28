var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var conn = require('C:\\Users\\Ka\\Desktop\\mid_project\\database\\mysql.js')();
var con = conn.init();
const ctrlmenu = require('./view/session/menu.js')

router.use(bodyParser.urlencoded({extended:false}));

var plz_login = '<script type = "text/javascript">self.location = "/main";alert("로그인을 하셔야 합니다.");</script>'
//조회-------------------------------------------------
router.get('/balance', function(req, res, next){
  if(req.session.displayName){
    next();
  }
  else{
    res.send(plz_login);
  }
})
router.get('/balance', ctrlmenu.balance)
//셀렉트 박스의 값을 포스트해와서 표를 만듬
router.post('/balance', function(req, res){
  var sel = req.body.select;
  conn.set_trans(con, sel, function(err, data){
    if(err){
      console.log(err)
    }
    else{
      res.send(data)
    }
  })
})



//입금-------------------------------------------------
router.get('/deposit', function(req, res, next){
  if(req.session.displayName){
    next();
  }
  else{
    res.send(plz_login)
  }
})
router.get('/deposit', ctrlmenu.deposit)
router.post('/deposit', function(req, res){
  var mon = req.body.money;
  var sel = req.body.select;
  mon = Number(mon);
  conn.get_bal(con, sel,mon, function(err, data){
    console.log(data)
    console.log(data[0].accN)
    res.send('<script type = "text/javascript">self.location = "/main/menu";alert("성공적으로 입금 하였습니다.");</script>')
  })

})

//송금-------------------------------------------------
router.get('/transfer', function(req, res, next){
  if(req.session.displayName){
    next();
  }
  else{
    res.send(plz_login)
  }
})
router.get('/transfer', ctrlmenu.transfer)
router.post('/transfer', function(req, res){
  var mon = req.body.money;
  var sel = req.body.select;
  var who = req.body.whe;
  mon = Number(mon);
  conn.get_t1(con, sel, mon, who, function(err, t1){
    if(err){
      console.log(err);
    }
    else{
      conn.get_t2(con, sel, mon, who, function(err, t2){
        if(err){
          console.log(err)
        }
        else{
          console.log(t1)
          console.log(t2)
          res.send('<script type = "text/javascript">self.location = "/main/menu";alert("성공적으로 송금 하였습니다.");</script>')
        }
      })
    }
  })
})

//출금-------------------------------------------------
router.get('/withdraw', function(req, res, next){
  if(req.session.displayName){
    next();
  }
  else{
    res.send(plz_login)
  }
})
router.get('/withdraw', ctrlmenu.withdraw)
router.post('/withdraw', function(req, res){
  var mon = req.body.money;
  var sel = req.body.select;
  mon = Number(mon);
  conn.get_with(con, sel,mon, function(err, data){
    console.log(data[0].accN)
    res.send('<script type = "text/javascript">self.location = "/main/menu";alert("성공적으로 출금 하였습니다.");</script>')
  })
})


module.exports = router;

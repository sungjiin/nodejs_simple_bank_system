var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');

const ctrlmenu = require('./view/session/menu.js')
const ctrllogin = require('./view/no_session/menu.js')

var FileStore = require('session-file-store')(session);
var plz_login = '<script type = "text/javascript">self.location = "/main/login";alert("로그인을 하셔야 합니다.");</script>'

router.use(session({
  secret: '12312dajfj23rj2po4$#@!',
  resave: false,
  saveUninitialized: true
  //store: new FileStore()
}))

router.use(bodyParser.urlencoded({extended:false}));


//메인페이지----------------------------------------
router.get('/', function(req, res, next){
  if(req.session.displayName){
    res.redirect('/main/suc/') // 세션이 있을 경우 페이지 변화
  }
  else{
    res.redirect('/main/login'); //세션이 없을 경우 로그인 페이지로 이동
  }
})

//로그인페이지
router.get('/login', ctrllogin.login);

//세션이 있을경우의 메뉴 페이지
router.get('/menu', function(req, res, next){
  if(!req.session.displayName){  //세션이 없으면 로그인 페이지로 이동하면서 알람 작동
    res.send(plz_login)

  }else{
    next();
  }
})
router.get('/menu', ctrlmenu.menu);

router.get('/suc', ctrlmenu.main);

//로그아웃을 누르면 로그인 페이지로 이동하면서 세션 삭제
router.get('/logout', function(req, res, next){
  delete req.session.displayName;//세션 삭제
  res.redirect('/main/login');
});

//계좌만들기
router.get('/createacc', ctrlmenu.createacc);


router.use('/', require('./no_session.js'))
router.use('/menu', require('./ex_session.js'))


module.exports = router;

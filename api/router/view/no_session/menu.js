
//회원 가입 페이지
exports.join = (req, res)=>{
  return res.send(join);
}

var join = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Join</title>
  </head>
  <body>
  <form action = "/main/new" method="post">
    <h1>회원 가입</h1>
    <p><input type="text" name="userid" placeholder="아이디 입력"></input>
    </p><input type="password" name="userpw" placeholder="비밀번호 입력"></input>
      <p><input type="text" name="username" placeholder="이름 입력"></input>
      </p><input type = "submit" value = "회원가입"></input>
    </form>
  </body>
</html>`
//===============================================================================

//로그인 페이지
exports.login = (req, res)=>{
  return res.send(login);
}
var login = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>BANKSYSTEM</title>
  </head>
  <body>
  <form action = "/main/login" method="post">
    <h1>간단한 은행 시스템(세션 없음)</h1>
    <p><input type = "text" name="id" placeholder="아이디 입력">
    </p><input type = "password" name="pw" placeholder="비밀번호 입력">
    <p><input type = "submit" value = "로그인"></input>
      <button type="button" name="btnJoin" onclick = "gonew()">회원가입</button>
    </form>

  </body>
  <script type="text/javascript">
    function gonew(){
      location.href = "/main/new";
    }

   </script>
</html>`
//===============================================================================

//세션이 없을 경우 메인 페이지
exports.no_session = (req, res)=>{
  return res.send(no_sess);
}
var no_sess = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>BANKSYSTEM</title>
  </head>
  <body>
  <form action = "/main/login" method="post">
    <h1>간단한 은행 시스템(세션 없음)</h1>
    <p><input type = "text" name="id" placeholder="아이디 입력">
    </p><input type = "password" name="pw" placeholder="비밀번호 입력">
    <p><input type = "submit" value = "로그인"></input>
      <button type="button" name="btnJoin" onclick = "gonew()">회원가입</button>
    </form>

  </body>
  <script type="text/javascript">
    function gonew(){
      location.href = "/main/new";
    }

   </script>
</html>`
//===============================================================================

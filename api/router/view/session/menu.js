var conn = require('C:\\Users\\Ka\\Desktop\\mid_project\\database\\mysql.js')();
var mysql = require('mysql');
var con = conn.init();

//조회 및 거래내역 확인 페이지
exports.balance = (req, res)=>{/*
  conn.itch(con, req.session.displayName, function(err, data){
    if(err){
      console.log(err)
    }
    else{
      console.log(data);
      return res.send(account_check(data))
    }
  })*/
  conn.List(con, req.session.displayName, function(err, data){
    if(err){
      console.log(err)
    }
    else{
      return res.send(bal(data));
    }
  })
}
function bal(data){
  return `
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <script>
      function changebox(){
        javascript:document.location.reload();
      }
    </script>
    <body>
    <form action = "/main/menu/balance" method="post">
      <h1>결제 내역 및 잔액 조회</h1>
      ${data} <input type = "submit" value = "조회"></input>
      <style>

`}
//==============================================================

//입금 페이지
exports.deposit = (req, res)=>{
  conn.List(con, req.session.displayName, function(err, data){
    if(err){
      console.log(err)
    }
    else{
      return res.send(depo(data));

    }
  })
}
function depo(data){
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
    <form action = "/main/menu/deposit" method="post">
      <h1>입금</h1>
      <p>어떤 계좌?${data}
      <p><input type="text" name="money" placeholder="얼마를?"></p>
      <p><input type="submit" name="submit" value="입금"></p>
    </form>
    </body>
  </html>
`
}
//==============================================================

//출금 페이지
exports.withdraw = (req, res)=>{
  conn.List(con, req.session.displayName, function(err, data){
    if(err){
      console.log(err)
    }
    else{
      return res.send(wit(data));

    }
  })
}
function wit(data){
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
    <form action = "/main/menu/withdraw" method="post">
      <h1>출금</h1>
      <p>어떤 계좌?${data}</p>

        <p><input type="text" name="money" placeholder="얼마 출금?"></p>
        <p><input type = "submit" value = "출금"</p>
    </form>
    </body>
  </html>`
}
//==============================================================

//송금 페이지
exports.transfer = (req, res)=>{
  conn.List(con, req.session.displayName, function(err, data){
    if(err){
      console.log(err)
    }
    else{
      return res.send(tran(data));

    }
  })
}
function tran(data){
  return `<!DOCTYPE html>
  <html >
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
    <form action = "/main/menu/transfer" method="post">
      <h1>송금</h1>
      <p>어떤 계좌?${data}</p>
      <p><input type="text" name="money" placeholder="얼마를?">
      </p><p><input type="text" name="whe" placeholder="어떤 계좌에?"></p>
      <p><input type="submit" name="submit" value="송금"></p>
    </form>
    </body>
  </html>`
}
//==============================================================

//세션이 있을 경우 메인 페이지
exports.main = (req, res)=>{
  return res.send(s_main())
}
function s_main(){
  return `<!DOCTYPE html>
  <html >
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      <h1>메인(세션 있음)</h1>
      <p><a href="/main/menu">메뉴</a>
      </p>  <a href = "/main/createacc">계좌 만들기</a>
      <p>  <a href="/main/logout">로그아웃</a>
    </body>

  </html>`
}
//==============================================================

//메뉴 페이지
exports.menu = (req, res)=>{
  return res.send(menu());
}
function menu(){
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>메뉴</h1>
    <p><a href="menu/balance">계좌 내역 조회(잔액 조회)</a></p>
    <p><a href="menu/deposit">입금</a></p>
    <p><a href="menu/withdraw">출금</a></p>
    <p><a href="menu/transfer">송금</a></p>
  </body>
</html>`
}
//==============================================================

//계좌 생셩 페이지
exports.createacc = (req, res)=>{
  conn.create_acc(con, req.session.displayName, function(err, data){
    if(err){
      console.log(err)
    }
    else{
      return res.send(data);
    }
  })
}

var mysql = require('mysql');
var session = require('express-session');
const express = require('express')
const app = express();


module.exports = function(){
  return{
    init: function(){
      return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '181515',
        database: 'bank'
      })
    },
    //계좌 생성 컨트롤러
    create_acc: function(conn, userid, callback){
      var balance = 0;
      conn.query('insert into account(balance,id)values("'+balance+'","'+userid+'")',function(error,result,fields){
        if(error){
          console.log(error);
          callback(null, error);

        }else{
          callback(null, '<script type = "text/javascript">self.location = "/main";alert("성공적으로 계좌를 만들었습니다.");</script>')
        }
      })
    },
    //===============================================================================

    //로그인 컨트롤러
    login: function(conn, user, callback){
      conn.query('select* from User where id="'+user.id+'"',function(error,result,fields){
        if(error){
          console.log(error)
        }
        else if(user.id !=""||user.pw!=""){
          if(result.length==0){
            callback(null, '<script type = "text/javascript">self.location = "/main";alert("존재하는 아이디가 없습니다.");</script>')
          }
          else if(result[0].password==user.pw){
              callback(null, true)
          }
          else{
            callback(null, '<script type = "text/javascript">self.location = "/main";alert("비밀번호를 확인하세요");</script>')
          }
        }
        else{
          callback(null, '<script type = "text/javascript">self.location = "/main";alert("아이디와 비밀번호를 입력해 주세요.");</script>')
        }
      })
    },
    //===============================================================================

    //회원 가입 컨트롤러
    join1: function(conn,userid, userpw, username, callback){
      var user = [username, userid, userpw];
      var no = /[~!@#$%^&*()_+|<>?:{}]/;
      if(username != ''&&userid!=''&&userpw!=''){
        if(no.test(username)||no.test(userid)||no.test(userpw)){
          result = '<script type = "text/javascript">self.location = "/main/new";alert("특수문자는 사용할 수 없습니다.");</script>'
          callback(null, result);
        }else{
          conn.query('insert into User(name,id,password)values(?, ?, ?)', user,function(error,result,fields){
            if(!error){
              result = '<script type = "text/javascript">self.location = "/main";alert("성공적으로 회원가입을 하였습니다.");</script>'
              callback(null, result);
            }else{
              result = '<script type = "text/javascript">self.location = "/main/new";alert("중복된 아이디가 있습니다.");</script>'
              console.log(error)
              callback(null, result);
            }
          })
        }
      }else{
        result = '<script type = "text/javascript">self.location = "/main/new";alert("정보를 정확히 입력하십시오.");</script>'
        callback(null, result);
      }
    },//===============================================================================


    //입금 컨트롤러
    get_bal: function(conn, accN,money, callback){
      conn.query('select * from account where accN like("'+accN+'")', function(error, result, field){
        if(error){
          console.log(error)
        }
        else{
          result[0].balance = result[0].balance + money
          conn.query('update account set balance =? where accN=?',[result[0].balance, result[0].accN], function(error, data, field){
            if(error){
              console.log(error);
            }
            else{
              conn.query('insert into F_trans(userid, useaccN,money, trans, inaccN)values(?,? ,?,?,?)',[result[0].id, accN,money, "입금", accN], function(error, tr, field){
                if(error){
                  console.log(error);
                }
                console.log(result)
                callback(null, result);
              })

            }
          })
        }
      })
    },
    //===============================================================================

    //출금 컨트롤러
    get_with: function(conn, accN,money, callback){
      var resu;
      conn.query('select * from account where accN like("'+accN+'")', function(error, result, field){
        if(error){
          console.log(error)
        }
        else{
          if(result[0].balance < money){
            console.log('adsasd')
            resu = '<script type = "text/javascript">self.location = "/main/menu";alert("잔액이 없습니다.");</script>'
            callback(null, resu);
          }
          else{
            result[0].balance = result[0].balance - money
            conn.query('update account set balance =? where accN=?',[result[0].balance, result[0].accN], function(error, data, field){
              if(error){
                console.log(error);
              }
              else{
                console.log(result[0].balance)
                conn.query('insert into F_trans(userid, useaccN,outaccN, money, trans)values(?,?,?,?,?)',[result[0].id,accN, accN, -1*money, "출금"], function(error, tr, field){
                  if(error){
                    console.log(error);
                  }
                  resu = '<script type = "text/javascript">self.location = "/main/menu";alert("성공적으로 출금 하였습니다.");</script>'
                  callback(null,resu);
                })

              }
            })
          }
        }
      });
    },
    //===============================================================================

    //get_t1과 get_t2는 송금 컨트롤러 입니다.
    get_t1: function(conn, myaccN,money, youraccN,callback){
      conn.query('select * from account where accN like("'+myaccN+'")', function(error, result, field){
        if(error){
          console.log(error)
        }else if(myaccN==youraccN){
          callback(null, '<script type = "text/javascript">self.location = "/main/menu";alert("본인에게는 송금할 수 없습니다..");</script>');
        }
        else{
          if(result[0].balance < money){
            callback(null, '<script type = "text/javascript">self.location = "/main/menu";alert("잔액이 없습니다.");</script>');
          }
          else{
            result[0].balance = result[0].balance - money
            conn.query('update account set balance =? where accN=?',[result[0].balance, result[0].accN], function(error, data, field){
              if(error){
                console.log(error);
              }
              else{
                conn.query('select * from account where accN like("'+youraccN+'")', function(error, result, field){
                  if(error){
                    console.log(error)
                  }

                  else{
                    result[0].balance = result[0].balance + money
                    conn.query('update account set balance =? where accN=?',[result[0].balance, result[0].accN], function(error, data, field){
                      if(error){
                        console.log(error);
                      }
                      else{
                        conn.query('insert into F_trans(userid,useaccN ,outaccN, money, trans, inaccN)values(?,?,?,?,?,?)',[result[0].id, result[0].accN,myaccN, money, "송금", youraccN], function(error, tr, field){
                          if(error){
                            console.log(error);
                          }
                        })

                      }
                    })
                  }
                })
                conn.query('insert into F_trans(userid,useaccN,outaccN, money, trans, inaccN)values(?,?,?,?,?,?)',[result[0].id,result[0].accN, result[0].accN, -1*money, "송금", youraccN], function(error, tr, field){
                  if(error){
                    console.log(error);
                  }
                  callback(null,'<script type = "text/javascript">self.location = "/main/menu";alert("송금이 완료됐습니다.");</script>');
                })

              }
            })
          }
        }
      });
    },
    //===============================================================================

    //계좌 조회 페이지의 셀렉트 박스를 동적으로 생성하는 함수
    List: function(conn, displayName, callback){
      var array;
      conn.query('select * from account where id like ("'+displayName+'")', function(err, result, fields){
        array = new Array();
        for(var i = 0; i<result.length; i++){
          array.push(result[i].accN);
        }
        var list = '<select class = "number" name = "select">'

        var i = 0;
        while(i < array.length){
          list = list + `<option name = "${array[i]}">${array[i]}</option>`;
          i = i+1;
        };
        list = list+'</select>';
        callback(null, list);
      });
    },
    //===============================================================================

    //계좌의 거래내역을 표로써 동적으로 생성함
    set_trans: function(conn, useaccN, callback){

      conn.query('select * from F_trans where useaccN like ("'+useaccN+'")', function(err, data){
        if(err){
          console.log(error)
        }
        else{
          conn.query('select * from account where accN like ("'+useaccN+'")', function(err, result){
            var tr = `
            <html>
              <head>
                <meta charset="utf-8">
                <title></title>
              </head>
              <body>
                <h1>${useaccN}계좌 거래 내역</h1> <h2>잔액 :${result[0].balance}</h2>
                <style>

                table{border-collapse:collapse; width: 100%}
                th, td{border:1px solid gray;}
                </style>
                <table>
                  <thead>
                    <th>돈 보낸 계좌</th>
                    <th>액수</th>
                    <th>돈 받는 계좌</th>
                    <th>거래</th>
                    <th>날짜</th>
                  </thead>
                <tbody>`
            for(i = 0; i<data.length; i++){
              tr = tr+`<tr><td>${data[i].outaccN}</td><td>${data[i].money}</td><td>${data[i].inaccN}</td><td>${data[i].trans}</td><td>${data[i].date}</td></tr>`

            }
            tr = tr+`</tbody>
            </table>
          </from>
          </body>
        </html>`
            callback(null, tr);
          })

        }
      })

    }
    //===============================================================================
  }
}

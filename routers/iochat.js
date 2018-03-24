var express = require("express");
var session = require("express-session")
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hocnhom_tt"
});
con.connect(function(err){
  if(err) {
    console.log("error to connect db");
    return ;
  }
  else{
    console.log("connect successfully");
  }
});
module.exports = (io)=>{

  io.on("connection", (socket)=>{
    console.log("user connect: "+socket.id);
    socket.on("disconnect", ()=>{
      console.log("user ngat ket noi ");
    });
    socket.on("MessageChat", (data)=>{
      io.sockets.emit("ServerMessageChat", data);
      let sql = "insert into user_chat_user(id_user_a, id_user_b, message) "+
                "values('"+data.id_myself+"', '"+data.id_partner+"', '"+data.contentChat+"')";
      con.query(sql, (err)=>{
        if(err){
          console.log("error to insert message to db");
          return ;
        }else{

        }
      })
    });
    socket.on("MessageExchange", (data)=>{
      io.sockets.emit("ServerMessageExchange", data);
      let sqlMs = "insert into user_exchanged_info(id_user_a, id_user_b, question_answer)"+
                  "values('"+data.my_id+"', '"+data.mem_id+"', '"+data.content_ex+"')";
      con.query(sqlMs, (err)=>{
        if(err) {
          console.log("err to insert data to user_exchanged_info table");
          return ;
        }else {

        }
      });
    });

    socket.on("ClientDiscussHandle", (data)=>{
      io.sockets.emit("ServerDiscussHanle", data);
      let sqlDis="INSERT INTO user_exercise(id_user, id_exercise, discuss)"+
              "VALUES('"+data.id_user+"', '"+data.id_exercise+"', '"+data.discuss+"')";
      console.log(sqlDis);
      con.query(sqlDis, (err)=>{
        if(err){
          console.log("Error to insert discuss to database");
          return ;
        }else{

        }
      })
    });
  })
};

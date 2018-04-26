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
    socket.on("tao-room", (data)=>{
      let chatRoom;
      if(data.my_id > data.mem_id){
        chatRoom = data.my_id+data.mem_id;
      }else{
        chatRoom = data.mem_id+data.my_id;
      }
      console.log("chatRoom: "+chatRoom);
      socket.join(chatRoom);
      socket.Phong=chatRoom;

    });
    socket.on("message-room", (data)=>{
      let messageRoom;
      if(data.myID > data.friendID){
        messageRoom = data.myID+data.friendID;
      }else{
        messageRoom = data.friendID+data.myID;
      }

      socket.join("MessageRoom"+messageRoom);
      socket.Messages = "MessageRoom"+messageRoom;
    });
    socket.on("discuss-room", (data)=>{
      socket.join(data.discuss_room_id);
      socket.DissRoom = data.discuss_room_id;
    });
    socket.on("group-room-client", (data)=>{
      socket.join("GroupRoom"+data.id_group);
      socket.GroupRoom = "GroupRoom"+data.id_group;

    });
    socket.on("home-addfriend-room", (data)=>{
      let notifi_room;
      if(data.id_friend > data.id_user){
        notifi_room = data.id_friend+""+data.id_user;
      }else {
        notifi_room = data.id_user+""+data.id_friend;
      }
      socket.join("HomeNotifi"+notifi_room);
      socket.HomeNotifiRoom = "HomeNotifi"+notifi_room;
      console.log("HomeNotifi"+notifi_room);
    });
    socket.on("home-addfriend", (data)=>{
      console.log("Oke nhe, add friend");
      io.sockets.in(socket.HomeNotifiRoom).emit("ServerHomeNotifi", data);
    });
    socket.on("schedule-client", (data)=>{
      console.log("Vao duoc khong m --------------");
      io.sockets.in(socket.GroupRoom).emit("ServerSchedule", data);
    });
    socket.on("MessageChat", (data)=>{
      io.sockets.in(socket.Messages).emit("ServerMessageChat", data);
      let sql = "insert into user_chat_user(id_user_a, id_user_b, message) "+
                "values('"+data.id_myself+"', '"+data.id_partner+"', '"+data.contentChat+"')";
      con.query(sql, (err)=>{
        if(err){
          console.log("error to insert message to db");
          return ;
        }else{

        }
      });
    });

    socket.on("MessageExchange", (data)=>{
      io.sockets.in(socket.Phong).emit("ServerMessageExchange", data);
      let sqlMs = "insert into user_exchanged_info(id_user_a, id_user_b, question_answer)"+
                  "values('"+data.my_id+"', '"+data.mem_id+"', '"+data.content_ex+"')";
      con.query(sqlMs, (err)=>{
        if(err) {
          console.log("err to insert data to user_exchanged_info table");
          return ;
        }else {  }
      });
    });

    socket.on("ClientDiscussHandle", (data)=>{
      io.sockets.in(socket.DissRoom).emit("ServerDiscussHanle", data);
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

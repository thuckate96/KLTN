var express = require("express");
var router = express.Router();
var session = require("express-session");
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

router.post("/partnerInfo", (req, res)=>{
  let id_partner = req.body.partner_id;
  console.log(id_partner);
  con.query("select id, fullname from user where id = '"+id_partner+"'",
   (err, infoPartner)=>{
     if(err){
       console.log("error to list partner info child box chat");
       return ;
     }else {
       let sql = "SELECT uei.*, u.fullname "+
                "FROM user_exchanged_info uei JOIN user u "+
                "ON uei.id_user_a = u.id "+
                "WHERE (id_user_a='"+session.id+"' AND id_user_b = '"+id_partner+"') "+
                "or (id_user_a='"+id_partner+"' AND id_user_b='"+session.id+"') "+
                " order by uei.id asc";
        con.query(sql, (err, listExchangeInfo)=>{
          if(err){
            console.log(" error to list exchange info ");
            return ;
          }else{
            res.json({
              
              infoPartner: infoPartner[0],
              listExchangeInfo: listExchangeInfo
            });
          }
        });
     }
   });
})
router.post("/friendChat", (req, res)=>{
  con.query("DROP VIEW IF EXISTS hocnhom_tt.friend_chat ", (err)=>{
    if(err){
      console.log("err to drop view friend chat");
      return ;
    }else{
      let val_search = req.body.val_search;
      let sqlViewFriendChat = " create view friend_chat as "+
            "SELECT distinct u.id, u.fullname, uif.status "+
            " FROM user u JOIN user_is_friend uif "+
            " ON u.id = uif.id_user_a "+
            " WHERE status =2 and u.fullname like '%"+val_search+"%' "+
            " and u.id != "+session.id+" and uif.id_user_b = "+session.id+" "+
            " UNION "+
            " SELECT distinct u.id, u.fullname, uif.status "+
            " FROM user u JOIN user_is_friend uif "+
            " ON u.id = uif.id_user_b "+
            " WHERE status =2 and u.fullname like '%"+val_search+"%' "+
            " and u.id != "+session.id+" AND id_user_a= "+session.id+" ";
      con.query(sqlViewFriendChat, (err)=>{
        if(err){
          console.log("error to create view friend chat");
          return ;
        }else {
          let sqlResult = "SELECT * FROM friend_chat";
          con.query(sqlResult, (err, listFriendChat)=>{
            if(err) {
              console.log("error to select list friend chat");
              return ;
            }else{

              res.json({
                status: "success",
                listFriendChat: listFriendChat
              })
            }
          })
        }
      })
    }
  })
});
router.post("/infoFriendBoxChat", (req, res)=>{
  let sqlMessage = "SELECT ucu.*, u.fullname "+
                  "FROM user_chat_user ucu  JOIN user u "+
                  "on ucu.id_user_a = u.id "+
                  "WHERE (ucu.id_user_a = '"+session.id+"' "+
                  " AND ucu.id_user_b = '"+req.body.id_friend_chat+"') "+
                  " OR (ucu.id_user_b = '"+session.id+"' "+
                  " AND ucu.id_user_a = '"+req.body.id_friend_chat+"') order by ucu.id asc";
  con.query(sqlMessage, (err, listMessage)=>{
    if(err){
      console.log("error to list Message chat");
      return ;
    }else {
      let sqlPartner = "select id, fullname from user where id='"+req.body.id_friend_chat+"'";
      con.query(sqlPartner, (err, infoPartner)=>{
        if(err){
          console.log("error to listinfo partner");
          return ;
        }else {
          res.json({
            listMessage: listMessage,
            infoPartner: infoPartner[0],
            id_myself: session.id
          })
        }
      });
    }
  });
})
router.get("/", (req, res)=>{
  if(session.email){
    con.query("DROP VIEW IF EXISTS hocnhom_tt.friend_box_chat ", (err)=>{
      if(err){
        console.log("error to drop view friend_box_chat ");
        return ;
      }else {
        let sqlCreateViewFriendBoxChat = "create view friend_box_chat as "+
        " SELECT distinct u.id, u.fullname, uif.status  "+
        " FROM user u JOIN user_is_friend uif  "+
        " ON u.id = uif.id_user_a  "+
        " WHERE status =2 and uif.id_user_b = "+session.id+" "+
        " UNION "+
        " SELECT distinct u.id, u.fullname, uif.status "+
        " FROM user u JOIN user_is_friend uif "+
        " ON u.id = uif.id_user_b "+
        " WHERE status =2   AND id_user_a= "+session.id+" ";
        con.query(sqlCreateViewFriendBoxChat, (err)=>{
          if(err){
            console.log("error to create view friend box chat ");
            return ;
          }else {

            let sqlListFriendBoxChat = "select * FROM friend_box_chat ";
            con.query(sqlListFriendBoxChat, (err, listFriendBoxChat)=>{
              if(err){
                console.log("err to list friend box chat");
                return ;
              }else {
                res.render("message", {
                  id_user: session.id,
                  name: session.fullname,
                  listFriendBoxChat: listFriendBoxChat
                });
              }
            })
          }
        })
      }
    })
  }else{
    res.redirect("/");
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var session = require("express-session");

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


router.post("/register/handle", (req, res)=>{
  var email = req.body.email;
  var fullname = req.body.fullname;
  var password = req.body.pass;
  var address = req.body.address;

  var sql = "INSERT INTO user(fullname, email, password, address)"+
  "VALUES('"+fullname+"','"+email+"','"+password+"', '"+address+"')";
  con.query(sql, function(err){
    if(err) throw err;
    console.log("add new user successfully!");

    res.redirect("/login");
  });
});

router.post("/login/handle", (req, res)=>{
  var email = req.body.email;
  var password = req.body.pass;

  var sql = "SELECT * FROM user WHERE email='"+email+"' AND password='"+password+"'";
  con.query(sql, function(error, result){
    if(error)throw error;

    if(result.length > 0){
      session.fullname = result[0].fullname;
      session.id = result[0].id;
      session.email = email;

      res.end("done");
      console.log(session.email);
    }else{

      res.end("error");
      // res.redirect("/login");
    }

  });
});

router.post("/addNewGroup", (req, res)=>{
  let name_group = req.body.name_group;
  let type_gr = req.body.type_gr;
  let sql = "INSERT INTO groups(group_name, id_user, is_public) "+
            "VALUES( '"+name_group+"', '"+session.id+"', '"+type_gr+"')";
  con.query(sql, (err)=>{
    if(err){
      console.log("Error to insert groups");
      return ;
    }else {
      res.end("success");
    }
  })
});
// router.post("/addGroup", (req, res)=>{
//   if(session.email){
//     var groupName = req.body.gName;
//     var id_user = session.id;
//     let sqlGroup = "INSERT INTO groups(group_name, id_user)VALUES('"+groupName+"', '"+id_user+"')";
//     con.query(sqlGroup, (err)=>{
//       if(err) throw err;
//       else res.end("add-group-success");
//     });
//   }else res.end("error");
// });

router.post("/group/addToppic", (req, res)=>{
  var name_toppic = req.body.name_toppic;
  var toppic_type = req.body.toppic_type;
  var id_user = req.body.id_user;
  var id_group = req.body.id_group;

  let sql = "INSERT INTO topic(topic_name, is_public, id_group, id_user)"+
            "VALUES('"+name_toppic+"', '"+toppic_type+"', '"+id_group+"', '"+id_user+"')";
  con.query(sql, (err)=>{
    if(err)throw err;
    else {
      res.end("success");
    }
  })
});

router.get("/", (req, res) => {

  if(session.email){


    let sqlQueryGroup = "SELECT * "+
                        "FROM groups "+
                        "WHERE id_user = '"+session.id+"' "+
                        "UNION "+
                        "SELECT g.* "+
                        "FROM `user_group` ug "+
                        "JOIN groups g "+
                        "ON ug.id_group = g.id "+
                        "WHERE ug.id_user = '"+session.id+"' AND ug.status = 2";
    con.query(sqlQueryGroup, (err, listGroup)=>{
      if(err){
        console.log("err to list group");
        return ;
      }else{
        res.render("home",
        {
          name: session.fullname,
          idUser: session.id,
          listGroup: listGroup
        });
      }
    });
  }else {
    res.render("home",
    {
      name: session.fullname,
      idUser: null,
      listGroup: ""
    });
  }

});


// render to page --------------------------------------------------------
router.get("/group", (req, res)=>{
  var id_group = req.query.id;

  con.query("SELECT u.id, u.fullname, g.group_name FROM groups g join user u"+
      " on g.id_user = u.id WHERE g.id='"+id_group+"'",
      (err, result)=>{
        if(err) throw err;
        else {
          if(session.email){
            // id_user='"+session.id+"'
            con.query("SELECT * FROM topic WHERE    id_group='"+id_group+"'",
              (err, listTopic)=>{
                let sqlExer = "SELECT * FROM exercise";
                con.query(sqlExer, (err, listExer)=>{
                  let sqlComment = "SELECT ue.*, u.fullname FROM user_exercise ue join user u "+
                  "on ue.id_user = u.id order by ue.id";
                  con.query(sqlComment, (err, listComm)=>{
                    let sqlMemg="SELECT ug.id_user, ug.id_group, u.id, u.fullname"+
                    " FROM user_group ug JOIN user u ON ug.id_user = u.id WHERE ug.id_group='"+id_group+"'"+
                    " AND ug.status=2";
                    con.query(sqlMemg, (err, listMemg)=>{
                      if(err) throw err;
                      let sqlUNG="SELECT * FROM groups WHERE id='"+id_group+"' AND id_user='"+session.id+"'";
                      con.query(sqlUNG, (err, resultUNG)=>{
                        if(err) throw err;
                        var kq = (resultUNG.length>0)? "true" : "false";
                        res.render("group",
                          {
                            name: session.fullname,
                            id_user: session.id,
                            id_group: id_group,
                            addMinGr: result[0].fullname,
                            idAdmin: result[0].id,
                            group_name: result[0].group_name,
                            listTopic: listTopic,
                            listExer: listExer,
                            listComm: listComm,
                            resultUNG: kq,
                            listMemg: listMemg
                          });
                      });
                    });


                  });

                });

              });

          } else res.redirect("/");
        }
  });
});
router.post("/searchMemGroup", (req, res)=>{
  con.query("DROP VIEW IF EXISTS hocnhom_tt.user_relation_group", (err)=>{
    if(err){
      console.log("err to create view user relation group ");
      return ;
    }else {
      let sqlViewUsrInGr = "CREATE VIEW user_relation_group AS "+
                      "SELECT id, id_user, id_group, status "+
                      "FROM `user_group` WHERE id_group = '"+req.body.id_gr+"' ";
      con.query(sqlViewUsrInGr, (err)=>{
        if(err){
          console.log("error to create view User Relation groups");
          return ;
        }else{
          let sqlSearchGr = "SELECT u.id, u.fullname, urg.id as id_user_group, urg.status, "+
                  " urg.id_group FROM user u "+
                  "LEFT JOIN user_relation_group urg "+
                  "ON u.id = urg.id_user "+
                  "WHERE u.id != '"+session.id+"' AND "+
                  " u.fullname like '%"+req.body.val_req_search+"%' ";
          con.query(sqlSearchGr, (err, listSearchMemGr)=>{
            if(err) {
              throw err;
              console.log("error to get list group search");
              return ;
            }else{
              res.json({
                status: "success",
                listSearchMemGr: listSearchMemGr
              });
            }
          });
        }
      })
    }
  });


  // let sqlSearchMemGr = "SELECT u.id,u.fullname, ug.status, ug.id_group, ug.id  id_user_group "+
  // "  FROM user u left join user_group ug"+
  // " on u.id = ug.id_user"+
  // " WHERE u.fullname like '%"+req.body.val_req_search+"%'"+
  // " AND u.id != '"+session.id+"'";
  //
  // con.query(sqlSearchMemGr, (err, listSearchMemGr)=>{
  //   if(err) throw err;
  //   res.json({
  //     status: "success",
  //     listSearchMemGr: listSearchMemGr
  //   });
  // });
});
router.post("/acceptUser", (req, res)=>{
  let id_user_group = req.body.id_user_group;

  let sql="UPDATE user_group SET status=2 WHERE id='"+id_user_group+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  })
});
router.post("/inviteUser", (req, res)=>{
  let id_group = req.body.id_gr_invite;
  let id_user = req.body.id_invite;
  let sql = "INSERT INTO user_group(id_user, id_group, status)"+
  "VALUES('"+id_user+"', '"+id_group+"', 3)";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  })
});
router.post("/addExercise",(req, res)=>{
  var exercise_name = req.body.name_exercise;
  var id_toppic = req.body.id_toppic;
  let sql = "INSERT INTO exercise(exercise_name, id_toppic)"+
            "VALUES('"+exercise_name+"','"+id_toppic+"')";
  con.query(sql,(err)=>{
    if(err)throw err;
    else{

      res.json({status: "success"});
    }
  });
});






//Tiep tuc bang cac lenh duoi day
 //888888888888888888888*******************************888888888888888888888
 //
 //


//888888888888888888888888

//

router.post("/search", (req, res)=>{
  var val_search = req.body.val_search;
  con.query("DROP VIEW IF EXISTS hocnhom_tt.user_in_gr", (err)=>{
    if(err){
      console.log("err to create view user_in_gr ");
      return ;
    }else {
      let sqlViewUsrInGr = "CREATE VIEW user_in_gr AS "+
                      "SELECT id, id_user, id_group, status "+
                      "FROM `user_group` WHERE id_user = '"+session.id+"' ";
      con.query(sqlViewUsrInGr, (err)=>{
        if(err){
          console.log("error to create view User In groups");
          return ;
        }else{
          let sqlSearchGr = "SELECT g.id, g.group_name, g.is_public, uig.status "+
                  "FROM groups g "+
                  "LEFT JOIN user_in_gr uig "+
                  "ON g.id = uig.id_group "+
                  "WHERE g.is_public = 1 AND g.id_user != '"+session.id+"' AND "+
                  " g.group_name like '%"+val_search+"%' ";
          con.query(sqlSearchGr, (err, resultGroup)=>{
            if(err) {
              console.log("error to get list group search");
              return ;
            }else{
              con.query("DROP VIEW IF EXISTS hocnhom_tt.friend_state_user ", (err)=>{
                if(err){
                  console.log("Error to drop view friend_state_user");
                  return ;

                }else {
                  let sqlViewFriend_State_user =  "CREATE VIEW friend_state_user as "+
                  "SELECT id, id_user_a,  id_user_b, status "+
                  "FROM user_is_friend "+
                  "WHERE id_user_a = '"+session.id+"' "+
                  "UNION "+
                  "SELECT id, id_user_b as id_user_a, id_user_a as id_user_b, "+
                  "IF(status=1, 3, 2) as status "+
                  "FROM user_is_friend "+
                  "WHERE id_user_b = '"+session.id+"' ";
                  con.query(sqlViewFriend_State_user, (err)=>{
                    if(err){
                      console.log("Error to create view friend_state_user ");
                      return ;
                    }else{
                      let sqlUser = "SELECT u.id, fsu.id as id_update,  u.fullname, "+
                      " fsu.status, fsu.id_user_b from user  u "+
                      "LEFT JOIN friend_state_user fsu "+
                      "ON u.id = fsu.id_user_b "+
                      "WHERE u.fullname like '%"+val_search+"%' ";
                      con.query(sqlUser, (err, resultUser)=>{
                        if(err){
                          console.log("error to get result user search");
                          return ;
                        }else {
                          res.json(
                            {
                              listUserSearch: resultUser,
                              listGroupSearch: resultGroup
                            });
                        }
                      });
                    }
                  })
                }
              });
            }
          });
        }
      })
    }
  });
  // let sql = "SELECT * FROM groups WHERE group_name LIKE '%"+val_search+"%' AND is_public=1";

});
router.post("/addFriend", (req, res)=>{
  let id_friend = req.body.id_friend;
  let sql = "INSERT INTO user_is_friend(id_user_a, id_user_b, status) "+
            " VALUES('"+session.id+"', '"+id_friend+"', 1)";
  con.query(sql, (err)=>{
    if(err){
      console.log("error to add new friend");
      return ;
    }else {
      res.end("success");
    }
  })
});
router.post("/acceptFriend", (req, res)=>{
  let id_update = req.body.id_update;
  let sql = "UPDATE user_is_friend SET status=2 WHERE id='"+id_update+"'";
  con.query(sql, (err)=>{
    if(err){
      console.log("Error to accept friend");
      return ;
    }else{
      res.end("success");
    }
  });
});
router.post("/joinGroup", (req, res)=>{
  var gid_join = req.body.gid_join;
  let sql = "INSERT INTO user_group(id_user, id_group, status)"+
      "VALUES('"+session.id+"', '"+gid_join+"', '"+1+"')";
  con.query(sql, (err)=>{
    if(err)throw err;
    res.end("success");
  })
});
router.get("/profile", (req, res)=>{
  if(session.email){
    let sqlMember = "SELECT g.id_user, g.id as id_group, ug.status, g.is_public,"+
          " g.group_name, ug.id as id_user_group FROM groups g join user_group ug on "+
          "g.id = ug.id_group WHERE ug.status=2 AND ug.id_user='"+session.id+"'";
    let sqlAdm = "SELECT * FROM groups WHERE id_user='"+session.id+"'";
    con.query(sqlMember, (err, listMem)=>{
      if(err) throw err;
      con.query(sqlAdm, (err, listAdm)=>{
        let sqlGrMem="SELECT ug.id, ug.id_user, ug.id_group, ug.status, u.fullname FROM "+
        "user_group ug join user u on ug.id_user=u.id";
        con.query(sqlGrMem, (err, listGrMem)=>{
          if(err) throw err;


          con.query(" DROP VIEW IF EXISTS hocnhom_tt.friend_ship ", (err)=>{
            if(err){
              console.log("not drop view friend_ship");
              return ;
            }else{
              let sqlViewListFriend=" create view friend_ship as "+
              " SELECT uif.id as id_friend_ship, uif.id_user_b as friend_id, uif.status "+
              " FROM user_is_friend uif WHERE id_user_a ='"+session.id+"'"+
              " UNION "+
              " SELECT uif.id as id_friend_ship, uif.id_user_a as friend_id, uif.status "+
              " FROM user_is_friend uif WHERE id_user_b ='"+session.id+"'";
              con.query(sqlViewListFriend, (err)=>{
                if(err) {
                  console.log("error to create view friend_ship");
                  return ;
                }else{
                  let sqlListFriend = "SELECT fs.id_friend_ship, u.id, "+
                  " u.fullname FROM user u join friend_ship fs"+
                  " on u.id = fs.friend_id WHERE fs.status=2";
                  con.query(sqlListFriend, (err, myFriend)=>{
                    if(err) {
                      console.log("not query list friend ");
                      return ;
                    }else{
                      let sqlProfileUser=" SELECT id, fullname, birthday,"+
                      " address, jobs, hobbies, favorite_motto "+
                      " FROM user WHERE id='"+session.id+"'";
                      con.query(sqlProfileUser, (err, listInfoProfile)=>{
                        if(err){
                          console.log("err to list profile");
                          return ;
                        }else {
                          res.render("profile",
                          {
                            name: session.fullname,
                            listMem: listMem,
                            listAdm: listAdm,
                            listGrMem: listGrMem,
                            myFriend: myFriend,
                            listInfoProfile: listInfoProfile[0]
                          });
                        }
                      })

                    }
                  })
                }
              })
            }
          })
        })

      })
    })

  }else
    res.redirect("/");
});

for(let i=0; i< 6; i++){
  router.post("/editProfile"+i, (req, res)=>{
    let val_edit = req.body.val_edit;
    let sql = "UPDATE user ";
    if(i==0)
     sql += " SET fullname='"+val_edit+"' WHERE id='"+session.id+"'";
    else if(i == 1)
      sql += " SET birthday='"+val_edit+"' WHERE id='"+session.id+"'";
    else if(i==2)
      sql += " SET address='"+val_edit+"' WHERE id='"+session.id+"'";
    else if(i ==3)
      sql += " SET jobs='"+val_edit+"' WHERE id='"+session.id+"'";
    else if(i == 4)
      sql += " SET hobbies='"+val_edit+"' WHERE id='"+session.id+"'";
    else if(i==5)
      sql += " SET favorite_motto='"+val_edit+"' WHERE id='"+session.id+"'";
    else
      sql="";
    console.log(sql);
    con.query(sql, (err)=>{
      if(err){
        console.log("err to update info");
        return ;
      }else{
        res.end("success");
      }
    })
  });
}

router.post("/undoFriend", (req, res)=>{
  let sql = "delete from user_is_friend WHERE id = '"+req.body.id_undo+"'";
  con.query(sql, (err)=>{
    if(err) {
      console.log("error to delete friend");
      return ;
    }else {
      res.end("success");
    }
  });
})
router.post("/searchFriend", (req, res)=>{
  let val_search_friend = req.body.val_search_friend;
  con.query(" DROP VIEW IF EXISTS hocnhom_tt.friend_list ", (err)=>{
    if(err) {

      console.log("loi drop");
      return ;
    }
    else{
      let sqlViewFriendShip = " create view friend_list as "+
      " SELECT id, id_user_b as id_friend, status FROM user_is_friend WHERE id_user_a='"+session.id+"'"+
      " UNION "+
      " SELECT id, id_user_a as id_friend, IF(status=1,3,2) as status"+
      " FROM user_is_friend WHERE id_user_b='"+session.id+"'";
      con.query(sqlViewFriendShip, (err)=>{
        if(err) throw err;
        else{
          let sqlSearchFriend = " SELECT fl.id as id_friend_search, "+
          " fl.id_friend, u.id, u.fullname, fl.status "+
          " FROM user u left join friend_list fl"+
          " ON u.id = fl.id_friend"+
          " WHERE u.fullname like'%"+val_search_friend+"%' AND u.id !='"+session.id+"'";
          con.query(sqlSearchFriend, (err, listSearchFriend)=>{
            if(err) throw err;
            else{
              res.json({
                status: "success",
                listSearchFriend: listSearchFriend
              });
            }
          })
        }
      })
    }
  })


});
router.post("/makeFriendReq", (req, res)=>{
  let sql = "INSERT INTO user_is_friend(id_user_a, id_user_b, status)"+
            "VALUES('"+session.id+"', '"+req.body.id_friend_request+"', 1)";
  con.query(sql, (err)=>{
    if(err){
      console.log("err to make friend");
      return ;
    }else{
      res.end("success");
    }
  })
});
router.post("/acceptFriendPR", (req, res)=>{
  let id_acceptF = req.body.id_acceptF;
  console.log("Cai gi day: "+id_acceptF);
  let sql = "UPDATE user_is_friend SET status=2 WHERE id='"+id_acceptF+"'";
  con.query(sql, (err)=>{
    if(err) {
      console.log("error to update acces friend");
      return ;
    }else{
      res.end("success");
    }
  });
});

router.post("/cancelGroupAdm", (req, res)=>{
  let id_group_cancel= req.body.id_group_cancel;
  let sql = "DELETE FROM groups WHERE id='"+id_group_cancel+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  })
});
router.post("/profileOutGroup", (req, res)=>{
  let id_cancel = req.body.id_cancel;
  let sql = "DELETE FROM user_group WHERE id='"+id_cancel+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  });
});
router.post("/cancelInvite", (req, res)=>{
  let id_user_group_cancel = req.body.id_user_group_cancel;
  console.log(id_user_group_cancel);
  let sql = "DELETE FROM user_group WHERE id='"+id_user_group_cancel+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  });
});
router.post("/accessMember", (req, res)=>{
  let sql = "UPDATE user_group SET status=2 WHERE id='"+req.body.idAcc+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  })
});
router.post("/removeMember", (req, res)=>{
  let sql = "DELETE FROM user_group WHERE id='"+req.body.idAcc+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  })
});
router.get("/login", (req, res)=>{
  res.render("login", {name: session.fullname});
});
router.get("/register", (req, res)=>{
  res.render("register", {name: session.fullname});
});

router.get("/logout", (req, res)=>{

  req.session.destroy((err)=>{
    if(err) throw err;
    else{
      delete session.fullname;
      session.fullname = null;
      delete session.id;
      session.id = null;
      session.email = null;

      res.redirect("/login");
    }
  });
});
module.exports = router;

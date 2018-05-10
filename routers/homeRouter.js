var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var session = require("express-session");
var assert = require("assert");
var multer = require("multer");

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/fileupload');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+file.originalname);
  }
});


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

router.post("/activity", (req, res)=>{
  let id_group = req.body.id_group;
  let sql = "select name, exercise_name, toppic_name, activity "+
  "from show_activity "+
  "where group_id = '"+id_group+"'"+
  " order by id DESC limit 6";
  con.query(sql, (err, listActivity)=>{
    if(err) {
      console.log("Error lits activity");
      return ;
    }else {
      console.log(listActivity);
      res.json({
        listActivity: listActivity
      });
    }
  })
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
      req.session.fullname = result[0].fullname;
      req.session.uid = result[0].id;
      console.log("id la: "+req.session.uid+" id cua nguoi: "+result[0].id);
      req.session.email = email;

      res.end("done");
      console.log("email session: "+req.session.email);
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
            "VALUES( '"+name_group+"', '"+req.session.uid+"', '"+type_gr+"')";
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
//   if(req.session.email){
//     var groupName = req.body.gName;
//     var id_user = req.session.uid;
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
      let activity = "Thêm chủ đề mới";
      let sqlActivity = "INSERT INTO show_activity(name, group_id, activity)"+
      " VALUES('"+req.session.fullname+"', '"+id_group+"', '"+activity+"')";
      con.query(sqlActivity, (err)=>{
        if(err){
          console.log("Error to insert activity add toppic ");
          return ;
        }else{
          res.json({
            message: "success",
            name: req.session.fullname,
            activity: activity
          });
        }
      })

    }
  })
});

router.get("/", (req, res) => {

  if(req.session.email){

    let sqlQueryGroup = "SELECT * "+
                        "FROM groups "+
                        "WHERE id_user = '"+req.session.uid+"' "+
                        "UNION "+
                        "SELECT g.* "+
                        "FROM `user_group` ug "+
                        "JOIN groups g "+
                        "ON ug.id_group = g.id "+
                        "WHERE ug.id_user = '"+req.session.uid+"' AND ug.status = 2";
    con.query(sqlQueryGroup, (err, listGroup)=>{
      if(err){
        console.log("err to list group");
        return ;
      }else{
        let sqlNotification = "select * from notification where id_b = '"+req.session.uid+"'";
        con.query(sqlNotification, (err, listNotification)=>{
          if(err) throw err;
          else {
            res.render("home",
            {
              name: req.session.fullname,
              idUser: req.session.uid,
              listGroup: listGroup,
              listNotification: listNotification
            });
          }
        });
      }
    });
  }else {
    res.render("home",
    {
      name: req.session.fullname,
      idUser: null,
      listGroup: "",
      listNotification: ""
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
          if(req.session.email){
            // id_user='"+req.session.uid+"'
            con.query("SELECT * FROM topic WHERE    id_group='"+id_group+"'",
              (err, listTopic)=>{
                let sqlExer = "SELECT * FROM exercise";
                con.query(sqlExer, (err, listExer)=>{
                  let sqlComment = "SELECT ue.id, ue.id_user, ue.id_exercise,"+
                  "ue.discuss, time(ue.create_at) as time, "+
                  " u.fullname FROM user_exercise ue join user u "+
                  "on ue.id_user = u.id order by ue.id";
                  con.query(sqlComment, (err, listComm)=>{
                    let sqlMemg="SELECT ug.id_user, ug.id_group, u.id, u.fullname"+
                    " FROM user_group ug JOIN user u ON ug.id_user = u.id WHERE ug.id_group='"+id_group+"'"+
                    " AND ug.status=2";
                    con.query(sqlMemg, (err, listMemg)=>{
                      if(err) throw err;



                      let sqlMemWork = "SELECT u.id, u.fullname from user u JOIN user_group ug "+
                                      "on u.id = ug.id_user "+
                                      "WHERE ug.id_group = '"+id_group+"' "+
                                      "UNION "+
                                      "select id, fullname from user "+
                                      "where id = (select id_user from groups "+
                                                  "where id = '"+id_group+"')";
                      con.query(sqlMemWork, (err, listMemWork)=>{
                        if(err) {
                          console.log("error to log list Memwork");
                          return ;
                        }else {

                          let sqlUNG="SELECT * FROM groups WHERE id='"+id_group+"' "+
                          " AND id_user='"+req.session.uid+"'";
                          con.query(sqlUNG, (err, resultUNG)=>{
                            if(err) throw err;
                            var kq = (resultUNG.length>0)? "true" : "false";
                            res.render("group",
                              {
                                name: req.session.fullname,
                                id_user: req.session.uid,
                                id_group: id_group,
                                addMinGr: result[0].fullname,
                                idAdmin: result[0].id,
                                group_name: result[0].group_name,
                                listTopic: listTopic,
                                listExer: listExer,
                                listComm: listComm,
                                resultUNG: kq,
                                listMemg: listMemg,
                                listMemWork: listMemg
                              });
                          });
                        }
                      })
                    });
                  });

                });

              });

          } else res.redirect("/");
        }
  });
});
router.post("/removeFileAtt", (req, res)=>{
  let sql = "delete from file_attack where id='"+req.body.id_rm+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  });
});
router.post("/addwork", (req, res)=>{
  let work_name = req.body.work_name;
  let work_mem = req.body.work_mem;
  let work_time = req.body.work_time;
  let id_exer = req.body.id_exer;

  let sql = "insert into exer_work(work_info, id_user, time_bound, id_exer, id_admin)"+
            " values('"+work_name+"', '"+work_mem+"',"+
            "'"+work_time+"', '"+id_exer+"', '"+req.session.uid+"')";
  con.query(sql, (err)=>{
    if(err) {
      console.log("err to insert intio exer_work");
      return ;
    }else {
      let activity = "Thêm công việc mới";
      let sqlActivity = "INSERT INTO show_activity(name, toppic_name,"+
      " exercise_name, group_id, activity)"+
      " VALUES('"+req.session.fullname+"', '"+req.body.toppic_name+
       "', '"+req.body.exercise_name+"', '"+req.body.id_group+"', '"+activity+"')";
      con.query(sqlActivity, (err)=>{
        if(err){
          console.log("Error to insert activity add schedule ");
          return ;
        }else{
          res.json({
            status: "success",
            name: req.session.fullname ,
            toppic_name:  req.body.toppic_name,
            exercise_name: req.body.exercise_name,
            activity: activity
          })

        }
      })

    }
  })
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
                  "WHERE u.id != '"+req.session.uid+"' AND "+
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
  // " AND u.id != '"+req.session.uid+"'";
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
  let id_friend = req.body.id_invite;
  let group_name = req.body.name_of_group;
  let info_notifi = req.session.fullname+" chấp nhận yêu cầu tham gia nhóm "+group_name;
  let sql="UPDATE user_group SET status=2 WHERE id='"+id_user_group+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else{
      let sqlNotifi = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+req.session.uid+"', '"+id_friend+"', '"+info_notifi+"')";
      con.query(sqlNotifi, (err)=>{
        if(err)throw err;
      })
      res.end("success");
    }
  })
});
router.post("/inviteUser", (req, res)=>{
  let id_group = req.body.id_gr_invite;
  let id_user = req.body.id_invite;
  let group_name = req.body.name_of_group;
  let sql = "INSERT INTO user_group(id_user, id_group, status)"+
  "VALUES('"+id_user+"', '"+id_group+"', 3)";
  con.query(sql, (err)=>{
    if(err) throw err;
    else {
      let info_notifi = req.session.fullname+" mời bạn tham gia nhóm "+group_name;
      let sqlNotifi = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+req.session.uid+"', '"+id_user+"', '"+info_notifi+"')";
      con.query(sqlNotifi, (err)=>{
        if(err) throw err;
      })
      res.end("success");
    }
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
      let activity = "Thêm bài tập mới";
      let sqlActivity = "INSERT INTO show_activity(name, toppic_name, group_id, activity)"+
      " VALUES('"+req.session.fullname+"', '"+req.body.toppic_name+"', '"+req.body.id_group+"', '"+activity+"')";
      con.query(sqlActivity, (err)=>{
        if(err){
          console.log("Error to insert activity add toppic ");
          return ;
        }else{
          res.json({
            status: "success",
            name: req.session.fullname,
            toppic_name: req.body.toppic_name,
            activity: activity
          });
        }
      })
    }
  });
});

router.post("/updateNameExercise", (req, res)=>{
  let new_exer_name  = req.body.new_exer_name;
  let id_exer_edit = req.body.id_exer_edit;
  let sql = "update exercise set exercise_name = '"+new_exer_name+"'"+
  " WHERE id = '"+id_exer_edit+"'";
  con.query(sql, (err)=>{
    if(err){
      console.log("error to update new exercise name");
      return ;
    }else {
      res.end("success");
    }
  })
});

router.post("/getSchedule", (req, res)=>{
  let sql = "SELECT * FROM exer_schedule WHERE id_exercise = '"+req.body.id_exer+"'";
  con.query(sql, (err, listSchedule)=>{
    if(err){
      console.log("Error to get list schedule");
      return ;
    }else {
      let sqlListWork = "select u.fullname, ew.* from exer_work ew"+
      " join user u on ew.id_user = u.id "+
      "where ew.id_exer = '"+req.body.id_exer+"'";
      con.query(sqlListWork, (err, listWork)=>{
        if(err) throw err;
        else{
          let sqlListValuation = "select u.fullname, ev.* from exer_valuation ev join user  u "+
          "on ev.id_user = u.id where ev.id_exer = '"+req.body.id_exer+"'";
          con.query(sqlListValuation, (err, listValuation)=>{
            if(err){
              console.log("error to get list valuation");
              return ;
            }else {
              let sqlListFile = "select * from file_attack "+
              " where id_exer='"+req.body.id_exer+"'";
              con.query(sqlListFile, (err, listFile)=>{
                if(err){
                  console.log("error to list file attach");
                  return ;
                }else {
                  let sqlDisAttack="select ufa.id, ufa.id_exer, ufa.id_user,"+
                            "ufa.file_path, ufa.file_name, u.fullname,"+
                            "ufa.file_tail, time(ufa.create_at) time "+
                            "from user_file_attach ufa join user u "+
                            "on ufa.id_user=u.id  where  ufa.id_exer ='"+req.body.id_exer+"'";
                  con.query(sqlDisAttack, (err, listDisFile)=>{
                    if(err){
                      console.log("error to list file in comment");
                      return ;
                    }else {
                      res.json(
                        {
                          my_id: req.session.uid,
                          data: listSchedule,
                          listWork: listWork,
                          listValuation: listValuation,
                          listFile: listFile,
                          listDisFile: listDisFile
                        });
                    }
                  })

                }
              });

            }
          })

        }
      });


    }
  });
});
router.post("/unRemind", (req, res)=>{
  let id_exer = req.body.id_exer;
  let sql = "update exercise set remind='' where id='"+id_exer+"'";
  con.query(sql, (err)=>{
    if(err)throw err;
    else res.end("success");
  })
})
router.post("/remindMember", (req, res)=>{
  let remind = req.body.remind;
  let id_exer = req.body.id_exer;
  let sql = "update exercise set remind='"+remind+"' where id='"+id_exer+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else res.end("success");
  })
});
router.post("/unHonors", (req, res)=>{
  let sql="update exercise set honors='' where id='"+req.body.id_exer+"'";
  con.query(sql, (err)=>{
    if(err)throw err;
    else {
      res.end("success");
    }
  })
})
router.post("/honorsMember", (req, res)=>{
  console.log("oke");
  let id_exer = req.body.id_exer;
  let honors = req.body.honors;
  let sql = "update exercise set honors='"+honors+"' where id='"+id_exer+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else {
      res.end("success");
    }
  })
});
router.post("/delWork", (req, res)=>{
  let sql = "delete from exer_work where id = '"+req.body.id_del_work+"'";
  con.query(sql, (err)=>{
    if(err) {
      console.log("err to delete work ");
      return ;
    }else{
      res.end("success");
    }
  })
})

router.post("/reportReq", (req, res)=>{

  let sql = "update exer_work set done='"+req.body.req_val+"' "+
  " where id='"+req.body.id_up+"'";
  con.query(sql, (err)=>{
    if(err) {
      console.log("err to update report to exer_work");
      return ;
    }else {
      res.end("success");
    }
  });
})


router.post("/delSchedule", (req, res)=>{
  let sql = "delete from exer_schedule where id = '"+req.body.id_del+"'";
  con.query(sql, (err)=>{
    if(err) {
      console.log("error to delete schedule");
      return ;
    }else {
      res.end("success");
    }
  });
})


var storeFileDis = multer.diskStorage({
  destination: (req, file, callback)=>{
    callback(null, "public/fileupload");
  },
  filename: (req, file, callback)=>{
    callback(null, Date.now()+file.originalname);
  }
})
router.post("/fileDiscuss", (req, res)=>{
  var upload = multer({storage: storeFileDis}).array("file_dis", 2);
  upload(req, res, (err)=>{

    if(err){
      console.log("err");
      res.json({
        status: "error",
        path_file: "",
        file_name: "",
        tail_file: ""
      })
      return ;
    }else{
      console.log(req.files);
      console.log("body: "+req.body.id_exer);
      let pathF = req.files[0].path.split("/");
      let pathR = pathF[1]+"/"+pathF[2];
      let endPath = pathF[2].split(".");
      let tailPath = endPath[endPath.length-1];

      console.log("file path: "+pathR);
      console.log("file name: "+pathF[2]);
      console.log("tail path: "+tailPath);
      console.log("id user: "+req.session.uid);
      console.log("id exer: "+req.body.id_exer);
      let sql = "insert into user_file_attach(id_exer, id_user, file_path, file_name, file_tail)"+
      " values('"+req.body.id_exer+"', '"+req.session.uid+"', '"+pathR+"' "+
      ", '"+pathF[2]+"', '"+tailPath+"')";
      con.query(sql, (err)=>{
        if(err) {
          console.log("error to insert to user_file_attach");
          return ;
        }else{
          res.json({
            status: "success",
            path_file: pathR,
            file_name: pathF[2],
            tail_file: tailPath,
            fullname: req.session.fullname
          })
        }
      })

    }
  })
});
router.post("/uploadattachment",(req, res)=>{
  var upload = multer({ storage : storage}).array("file_up", 2);

    upload(req,res,function(err) {
        console.log(req.body);
        if(err) {
          res.json({
            status : "err",
            path_file: "",
            tail_path: "",
            name_path: ""
          })
        }
        let pathF = req.files[0].path.split("/");
        let pathR = pathF[1]+"/"+pathF[2];
        let endPath = pathF[2].split(".");
        let tailPath = endPath[endPath.length-1];


        let sql = "insert into file_attack(file_path, file_name, id_user, id_exer, tail_path)"+
        " values('"+pathR+"', '"+pathF[2]+"', '"+req.session.uid+"',"+
        "  '"+req.body.id_exer+"', '"+tailPath+"')";
        con.query(sql, (err)=>{
          if(err){
            throw err;
            console.log("error to insert to file attachment");
            return ;
          }else {
            res.json({
              status: "success",
              path_file: pathR,
              tail_path: tailPath,
              name_path: pathF[2]
            })
          }
        })

    });
});
router.post("/advaluation", (req, res)=>{
  let comment = req.body.comment;
  let rank = req.body.rank;
  let id_user = req.body.id_user;
  let id_exer = req.body.id_exer;
  let sql = "insert into exer_valuation(comment, id_user, rank, id_exer, id_adm) "+
  " values('"+comment+"', '"+id_user+"', '"+rank+"', '"+id_exer+"', '"+req.session.uid+"')";
  con.query(sql, (err)=>{
    if(err) throw err;
    else {
      let activity = "Thêm nhận xét mới";
      let sqlActivity = "INSERT INTO show_activity(name, toppic_name,"+
      " exercise_name, group_id, activity)"+
      " VALUES('"+req.session.fullname+"', '"+req.body.toppic_name+
       "', '"+req.body.exercise_name+"', '"+req.body.id_group+"', '"+activity+"')";
      con.query(sqlActivity, (err)=>{
        if(err){
          console.log("Error to insert activity add schedule ");
          return ;
        }else{
          res.json({
            status: "success",
            name: req.session.fullname ,
            toppic_name:  req.body.toppic_name,
            exercise_name: req.body.exercise_name,
            activity: activity
          }) 
        }
      })
    }
  })
})

router.post("/delVal", (req, res)=>{
  let sql="delete from exer_valuation where id='"+req.body.id_del+"'";
  con.query(sql, (err)=>{
    if(err){
      console.log("err to delete valuation");
      return ;
    }else {
      res.end("success");
    }
  });
})
router.post("/schedule", (req, res)=>{
  let start_date = req.body.start_date;
  let start_time = req.body.start_time;
  let finish_date = req.body.finish_date;
  let finish_time = req.body.finish_time;
  let id_exer = req.body.id_exer;
  let sql = "insert into exer_schedule(start_date, start_time,"+
            " finish_date, finish_time, id_exercise, id_adm) "+
            " values('"+start_date+"', '"+start_time+"', '"+finish_date+"' "+
            ", '"+finish_time+"', '"+id_exer+"', '"+req.session.uid+"' )";
  con.query(sql, (err)=>{
    if(err) {
      console.log("error to insert to exercise_schedule");
      return ;
    }else {
      let activity = "Thêm lịch mới";
      let sqlActivity = "INSERT INTO show_activity(name, toppic_name, exercise_name, group_id, activity)"+
      " VALUES('"+req.session.fullname+"', '"+req.body.toppic_name+
       "', '"+req.body.exercise_name+"', '"+req.body.id_group+"', '"+activity+"')";
      con.query(sqlActivity, (err)=>{
        if(err){
          console.log("Error to insert activity add schedule ");
          return ;
        }else{
          res.json({
            status: "success",
            name: req.session.fullname ,
            toppic_name:  req.body.toppic_name,
            exercise_name: req.body.exercise_name,
            activity: activity
          })

        }
      })

    }
  })
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
                      "FROM `user_group` WHERE id_user = '"+req.session.uid+"' ";
      con.query(sqlViewUsrInGr, (err)=>{
        if(err){
          console.log("error to create view User In groups");
          return ;
        }else{
          let sqlSearchGr = "SELECT g.id, g.group_name, g.is_public, uig.status,g.id_user "+
                  "FROM  groups g "+
                  "LEFT JOIN user_in_gr uig "+
                  "ON g.id = uig.id_group "+
                  "WHERE g.is_public = 1 AND g.id_user != '"+req.session.uid+"' AND "+
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
                  "WHERE id_user_a = '"+req.session.uid+"' "+
                  "UNION "+
                  "SELECT id, id_user_b as id_user_a, id_user_a as id_user_b, "+
                  "IF(status=1, 3, 2) as status "+
                  "FROM user_is_friend "+
                  "WHERE id_user_b = '"+req.session.uid+"' ";
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
            " VALUES('"+req.session.uid+"', '"+id_friend+"', 1)";
  con.query(sql, (err)=>{
    if(err){
      console.log("error to add new friend");
      return ;
    }else {
      let id_user = req.body.id_user;
      let info_notifi = req.body.info_notifi;
      let sqlNotifi = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+id_user+"', '"+id_friend+"', '"+info_notifi+"')";
      con.query(sqlNotifi, (err)=>{
        if(err) throw err;
      })
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
      let id_friend = req.body.id_friend;
      let info_notifi = req.body.info;
      let sqlNotiAccept = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+req.session.uid+"', '"+id_friend+"', '"+info_notifi+"')";
      con.query(sqlNotiAccept, (err)=>{
        if(err) throw err;
      })
      res.end("success");
    }
  });
});
router.post("/joinGroup", (req, res)=>{
  var gid_join = req.body.gid_join;
  let sql = "INSERT INTO user_group(id_user, id_group, status)"+
      "VALUES('"+req.session.uid+"', '"+gid_join+"', '"+1+"')";
  con.query(sql, (err)=>{
    if(err)throw err;
    else{
      let info_notifi = req.session.fullname+" yêu cầu tham gia nhóm "+req.body.gr_name;
      let sqlnotifi = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+req.session.uid+"', '"+req.body.id_user+"', '"+info_notifi+"')";
      con.query(sqlnotifi, (err)=>{
        if(err)throw err;
      })
      res.end("success");
    }
  })
  // let sql1 = "SELECT u.fullname, g.group_name FROM groups g join user u "+
  // " on g.id_user = u.id WHERE g.id = '"+gid_join+"'";
  // con.query(sql1, (err, thisFullname)=>{
  //   if(err)throw err;
  //   else {
  //     let sqlNotifi = ""+
  //     "INSERT INTO notification(id_a, id_b, info_notification, state, seen) "+
  //     " VALUES ('"+req.session.uid+"', '"+gid_join+
  //     "', '"+thisFullname[0].fullname+" yêu cầu tham gia nhóm "+thisFullname[0].group_name+" ' "+
  //     ", 0, 0) ";
  //     con.query(sqlNotifi, (err)=>{
  //       if(err) throw err;
  //       else {
  //
  //       }
  //     })
  //   }
  // });
//888888888888888888888888888888888888*******NOTIFYCATION 8*****************8

});
router.get("/profile", (req, res)=>{
  if(req.session.email){
    let sqlMember = "SELECT g.id_user, g.id as id_group, ug.status, g.is_public,"+
          " g.group_name, ug.id as id_user_group FROM groups g join user_group ug on "+
          "g.id = ug.id_group WHERE ug.status=2 AND ug.id_user='"+req.session.uid+"'";
    let sqlAdm = "SELECT * FROM groups WHERE id_user='"+req.session.uid+"'";
    con.query(sqlMember, (err, listMem)=>{
      if(err) throw err;
      con.query(sqlAdm, (err, listAdm)=>{
        let sqlGrMem="SELECT ug.id, ug.id_user,"+
        "  ug.id_group, ug.status, u.fullname FROM "+
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
              " FROM user_is_friend uif WHERE id_user_a ='"+req.session.uid+"'"+
              " UNION "+
              " SELECT uif.id as id_friend_ship, uif.id_user_a as friend_id, uif.status "+
              " FROM user_is_friend uif WHERE id_user_b ='"+req.session.uid+"'";
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
                      " FROM user WHERE id='"+req.session.uid+"'";
                      con.query(sqlProfileUser, (err, listInfoProfile)=>{
                        if(err){
                          console.log("err to list profile");
                          return ;
                        }else {
                          res.render("profile",
                          {
                            name: req.session.fullname,
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
     sql += " SET fullname='"+val_edit+"' WHERE id='"+req.session.uid+"'";
    else if(i == 1)
      sql += " SET birthday='"+val_edit+"' WHERE id='"+req.session.uid+"'";
    else if(i==2)
      sql += " SET address='"+val_edit+"' WHERE id='"+req.session.uid+"'";
    else if(i ==3)
      sql += " SET jobs='"+val_edit+"' WHERE id='"+req.session.uid+"'";
    else if(i == 4)
      sql += " SET hobbies='"+val_edit+"' WHERE id='"+req.session.uid+"'";
    else if(i==5)
      sql += " SET favorite_motto='"+val_edit+"' WHERE id='"+req.session.uid+"'";
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
      " SELECT id, id_user_b as id_friend, status FROM user_is_friend WHERE id_user_a='"+req.session.uid+"'"+
      " UNION "+
      " SELECT id, id_user_a as id_friend, IF(status=1,3,2) as status"+
      " FROM user_is_friend WHERE id_user_b='"+req.session.uid+"'";
      con.query(sqlViewFriendShip, (err)=>{
        if(err) throw err;
        else{
          let sqlSearchFriend = " SELECT fl.id as id_friend_search, "+
          " fl.id_friend, u.id, u.fullname, fl.status "+
          " FROM user u left join friend_list fl"+
          " ON u.id = fl.id_friend"+
          " WHERE u.fullname like'%"+val_search_friend+"%' AND u.id !='"+req.session.uid+"'";
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
            "VALUES('"+req.session.uid+"', '"+req.body.id_friend_request+"', 1)";
  con.query(sql, (err)=>{
    if(err){
      console.log("err to make friend");
      return ;
    }else{
      let info_notifi = req.session.fullname+" gửi lời mời kết bạn";
      let sqlNotiPro = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+req.session.uid+"', '"+req.body.id_friend_request+"', '"+info_notifi+"')";
      con.query(sqlNotiPro, (err)=>{
        if(err) throw err;
      })
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
      let info_notifi = req.session.fullname+" chấp nhận yêu cầu kết bạn";
      let sqlAcc = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+req.session.uid+"', '"+id_acceptF+"', '"+info_notifi+"')";
      con.query(sqlAcc, (err)=>{
        if(err) throw err;
      });
      res.end("success");
    }
  });
});
router.post("/editToppicName", (req, res)=>{
  let new_toppic_name = req.body.new_toppic_name;
  let id_toppic_edit = req.body.id_toppic_edit;
  let sql = "update topic set topic_name = '"+new_toppic_name+"' "+
            " WHERE id = '"+id_toppic_edit+"'";
  con.query(sql, (err)=>{
    if(err){
      console.log("err to update toppic name");
      return ;
    }else{
      res.end("success");
    }
  })
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
    else {
      let info_notifi = req.session.fullname+" chấp nhận yêu cầu tham gia nhóm "+
      req.body.groupName+" của bạn";
      let sqlNoti = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+req.session.uid+"', '"+req.body.id_user+"', '"+info_notifi+"')";

      con.query(sqlNoti, (err)=>{
        if(err)throw err;
      })
      res.end("success");
    }
  })
});
router.post("/removeMember", (req, res)=>{
  let sql = "DELETE FROM user_group WHERE id='"+req.body.idAcc+"'";
  con.query(sql, (err)=>{
    if(err) throw err;
    else {
      let info_notifi = req.session.fullname+" loại bạn ra khỏi nhóm "+req.body.groupName;
      let sqlRMNotifi = "insert into notification(id_a, id_b, info_notification) "+
      " values('"+req.session.uid+"', '"+req.body.id_user+"', '"+info_notifi+"')";
      con.query(sqlRMNotifi, (err)=>{
        if(err)throw err;
      });
      res.end("success");
    }
  })
});
router.get("/login", (req, res)=>{
  res.render("login", {name: req.session.fullname});
});
router.get("/register", (req, res)=>{
  res.render("register", {name: req.session.fullname});
});

router.get("/logout", (req, res)=>{

  req.session.destroy((err)=>{
    if(err) throw err;
    else{
      // req.session.fullname = null;
      // delete req.session.fullname;
      // req.session.uid = null;
      // delete req.session.uid;
      //
      // req.session.email = null;
      // delete req.session.email;
      res.redirect("/login");
    }
  });
});
module.exports = router;

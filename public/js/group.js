var socket = io("http://localhost:3000");
$(document).ready(function(){

  if($("#rs_UNG").val()=="false"){
    $("#icon-add-newmember").hide();
    $('#btn-add-toppic').hide();

    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
        $("#box_manager_time"+i+""+j).hide();
        $("#admin_add_work"+i+""+j).hide();
        $("#admin_evaluation"+i+""+j).hide();
        $("#form_add_attachment"+i+""+j).hide();
      }
    }

  }else if($("#rs_UNG").val()=="true"){
    $('#btn-add-toppic').show();
    $("#icon-add-newmember").show();
  }
  $('#box-add-toppic').hide();
  // $('#btn-add-toppic').show();
  $('#btn-add-toppic').click(function(){
    $('#btn-add-toppic').hide();
    $('#box-add-toppic').show();
  });
  $('#box-add-toppic .child-add-toppic a').click(function(){
    $('#box-add-toppic').hide();
    $('#btn-add-toppic').show();

  });
  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $("#btn_send_edit_exer"+i+""+j).click(function(){
        if(validateEmpty($("#exer_edit_name"+i+""+j).val())){
          $("#exer_edit_name"+i+""+j).attr("placeholder", "Sửa tên bài tập");
          $.post("/updateNameExercise", {
            new_exer_name: $("#exer_edit_name"+i+""+j).val(),
            id_exer_edit: $("#id_exer_edit"+i+""+j).val()
          }, (data)=>{
            if(data == "success"){

              $("#name_exer_edit"+i+""+j).show();
              $("#box_edit_exercise"+i+""+j).hide();
              $("#name_exer_edit"+i+""+j).text($("#exer_edit_name"+i+""+j).val());
              $("#exer_edit_name"+i+""+j).val("");
            }
          });
        }else{
          $("#exer_edit_name"+i+""+j).attr("placeholder","Cần nhập nội dung");
        }

      })
    }
  }




  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $("#li_time_activity"+i+""+j).click(function(){
        $("#box_evaluation"+i+""+j).hide();
        $("#box_manager_work"+i+""+j).hide();
        $("#box_time_learn"+i+""+j).show();
      })
      $("#li_exer_activity"+i+""+j).click(function(){
        $("#box_evaluation"+i+""+j).hide();
        $("#box_manager_work"+i+""+j).show();
        $("#box_time_learn"+i+""+j).hide();
      })
      $("#li_evalua_activity"+i+""+j).click(function(){
        $("#box_evaluation"+i+""+j).show();
        $("#box_manager_work"+i+""+j).hide();
        $("#box_time_learn"+i+""+j).hide();
      })
    }
  }

  $('#subm-toppic').click(function(){
    var nameToppic = $('#toppic-name').val();
    var toppicType = $('#toppic_type').val();

    if(validateEmpty(nameToppic)){
      $('#messageAddToppic').html("");
      $.post("/group/addToppic",
        {
          name_toppic: nameToppic,
          toppic_type: toppicType,
          id_user: $('#id_user').val(),
          id_group: $('#id_group').val()
        },
        function(data){
          if(data.message=="success"){
            $('#messageAddToppic').html("Thêm chủ đề thành công").css('color', 'green');
            setTimeout(()=>{
              $('#messageAddToppic').html("");
              $('#toppic-name').val("");
              window.location.reload();
            }, 2000);
          }
      });
    }else{
      $('#messageAddToppic').html("Bạn cần nhập tên chủ đề").css('color', 'red');
    }
  });

  for(let i=0;i<$('#lenListToppic').val(); i++){
   if($("#rs_UNG").val()=="false"){
     $("#exe_btn"+i).hide();
   }else if($("#rs_UNG").val()=="true"){
      $("#exe_btn"+i).show();
   }
  }
  for(let i=0;i<$('#lenListToppic').val(); i++){
    let zed = "exe-box"+i;
    $("#"+zed+"").hide();
  }

  for(let i=0;i<$('#lenListToppic').val(); i++){
    let zed = "exe_btn"+i;
    $("#"+zed+"").click(function(){
      let zed_a = "exe-box"+i;
      $("#"+zed_a+"").show();
      $("#"+zed+"").hide();
    });
  }
  for(let i=0;i<$('#lenListToppic').val(); i++){
    let zed = "rm_box"+i;
    $("#"+zed+"").click(function(){
      let zed_a = "exe-box"+i;
      let zed_b = "exe_btn"+i;
      $("#"+zed_a).hide();
      $("#"+zed_b).show();
    });
  }
  for(let i = 0;i<$('#lenListToppic').val(); i++){
    let zed="exercise_add"+i;
    $("#"+zed).click(function(){
      var exercise_name = "exercise_name"+i;
      if(validateEmpty($("#"+exercise_name).val())){
        $("#exercise_name"+i).removeAttr("placeholder");

        $.post("/addExercise",
          {
            name_exercise: $("#exercise_name"+i).val(),
            id_toppic: $("#toppic_id"+i).val(),
            toppic_name: $("#toppic_name"+i).val(),
            id_group: $("#id_group").val()
          },function(data){

            if(data.status=="success"){
              $("#activity_box ul").append(""+
              '<li>'+
                '<a class="mainTarget" href="#">'+data.name+'</a>'+
                '<span class="content_activi"> trong </span>'+
                '<a class="mainTarget" href="#">'+data.toppic_name+'</a>'+
                '<br>'+
                 '<span class="content_activi">'+
                  data.activity+
                 '</span>'+
              '</li>'+
              "");

              $("#exe-box"+i).hide();
              $("#exe_btn"+i).show();
              $("#msg_add_toppic"+i).html("<span class='glyphicon glyphicon-ok'></span><br>").css('color','green');
              setTimeout(function(){
                $("#msg_add_toppic"+i).html("");
              },2000);


            }
        });
      }else{
        $("#exercise_name"+i).attr("placeholder","Bạn cần nhập tên bài tập");
      }
    });
  }


  socket.on("ServerDiscussHanle", (data)=>{
    let binhluan = "Bình luận: "+data.discuss;
    $("#activity_box ul").append(""+
    '<li>'+
      '<a class="mainTarget" href="#">'+data.name_user+'</a>'+
      '<span class="content_activi"> trong </span>'+
      '  <a class="mainTarget" href="#">'+data.exercise_name+'</a>'+
        '<span class="content_activi"> của </span>'+
      '<a class="mainTarget" href="#">'+data.toppic_name+'</a>'+
      '<br>'+
       '<span class="content_activi">'+
        binhluan+
       '</span>'+
    '</li>'+
    "");
    let date = new Date();
    if(data.id_user == $("#id_user").val()){
      $("#modal_body_discuss"+data.i_loop1+""+data.j_loop2).append(""+
      '<div class="container">'+
       '<img src="./images/user.png" alt="Avatar" style="width:100%;">'+
       '<p>'+data.discuss+'</p>'+
       '<span class="time-right">'+data.name_user+' ('+date.getHours()+
       ':'+date.getMinutes()+':'+date.getSeconds()+')</span>'+
      '</div>'+
      "");
    }else {
      $("#modal_body_discuss"+data.i_loop1+""+data.j_loop2).append(""+
      '<div class="container darker">'+
       '<img src="./images/userth.png" alt="Avatar" class="right" style="width:100%;">'+
       '<p>'+data.discuss+'</p>'+
       '<span class="time-left">'+data.name_user+' ('+date.getHours()+
       ':'+date.getMinutes()+':'+date.getSeconds()
       +')</span>'+
      '</div>'+
      "");
    }
  });
  var numSchedule = 0;
  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $("#exe_list"+i+""+j).click(function(){
        numSchedule++;
        if(numSchedule < 2){
          $.post("/getSchedule", {
            id_exer: $("#id_exer_edit"+i+""+j).val()
          }, (data)=>{

            if(data.data.length > 0){
              $("#time_schedule"+i+""+j+" table tbody").html("");
              for(let ind = 0; ind < data.data.length; ind++){
                $("#time_schedule"+i+""+j+" table tbody").append(""+
                '<tr id="tr_listSche'+ind+'">'+
                  '<td> '+data.data[ind].start_date+' </td>'+
                  '<td> '+data.data[ind].start_time+' </td>'+
                  '<td>-></td>'+
                  '<td> '+data.data[ind].finish_date+'</td>'+
                  '<td> '+data.data[ind].finish_time+' </td>'+
                  '<td>'+
                    '<input type="hidden" id="id_del'+ind+'" '+
                    ' value="'+data.data[ind].id+'">'+
                    '<input style="border: none;" type="button" '+
                    'id="destroy_sch'+ind+'" value="x"> '+
                  '</td>'+
                '</tr>'+
                "");
              }
            }
            for(let fdis=0; fdis < data.listDisFile.length; fdis++){
              if(data.listDisFile[fdis].file_tail == "jpg" ||
              data.listDisFile[fdis].file_tail=="png" || data.listDisFile[fdis].file_tail=="gif"
               || data.listDisFile[fdis].file_tail=="jpeg"){
                 $("#modal_body_discuss"+i+""+j).append(""+
                 '<div class="container">'+
                  '<a style="width: 100%; height: 70px;" href="'+data.listDisFile[fdis].file_path+'" target="_blank">'+
                  '<img style="width: 50px; height: 50px;display: inline-block; " src="'+
                   data.listDisFile[fdis].file_path+'">'+
                  ' <span style="display: inline-block;">'+data.listDisFile[fdis].file_name+'</span> '+
                  '</a>'+

                  '<span class="time-right">'+data.listDisFile[fdis].fullname+
                  '('+data.listDisFile[fdis].time+')</span>'+
                 '</div>'+
                 "");
               }
               else{
                 $("#modal_body_discuss"+i+""+j).append(""+
                 '<div class="container">'+
                  '<a style="width: 100%; height: 70px;" href="'+data.listDisFile[fdis].file_path+'" target="_blank">'+
                  '<img style="width: 50px; height: 50px;display: inline-block; " src="'+
                   +'images/image-file1.png">'+
                  ' <span style="display: inline-block;">'+data.listDisFile[fdis].file_name+'</span> '+
                  '</a>'+

                  '<span class="time-right">'+data.listDisFile[fdis].fullname+
                  '('+data.listDisFile[fdis].time+')</span>'+
                 '</div>'+
                 "");
               }
            }
            for(let ind = 0; ind < data.data.length; ind++){
              if(data.my_id==data.data[i].id_adm){

                $("#destroy_sch"+ind).click(()=>{
                  $.post("/delSchedule", {
                    id_del: $("#id_del"+ind).val()
                  }, (data)=>{
                    if(data=="success"){
                      $("#tr_listSche"+ind).remove();
                    }
                  })

                });
              }

            }

            $("#work_time_member"+i+""+j).html("");
            console.log("listWork"+ data.listWork.length);
            for(let work=0; work < data.listWork.length; work++){
              $("#work_time_member"+i+""+j).append(""+
              '<div id="box_work'+work+'" class="box-work">'+
                '<div class="work-title">'+
                '  <span class="color-title">'+data.listWork[work].fullname+' </span>'+
                  '<span class="color-title">hoàn thiện công việc</span>'+
                  '<span id="value_report'+work+'" class="color-title">'+
                  data.listWork[work].done+'%</span>'+
                  '<span>'+
                    '<select class="" id="report'+work+'">'+
                      '<option value="0">0%</option>'+
                      '<option value="10">10%</option>'+
                      '<option value="20">20%</option>'+
                      '<option value="30">30%</option>'+
                      '<option value="40">40%</option>'+
                      '<option value="50">50%</option>'+
                      '<option value="60">60%</option>'+
                      '<option value="70">70%</option>'+
                      '<option value="80">80%</option>'+
                      '<option value="90">90%</option>'+
                      '<option value="100">100%</option>'+
                    '</select>'+
                  '</span>'+
                  '<span style="float: right; margin-right: 10px;" '+
                  ' id="del_Work'+work+'" class="glyphicon glyphicon-remove"> '+
                  ' </span>'+
                '</div>'+
              '  <div class="work-content">'+
                '  <span>'+data.listWork[work].work_info+'</span>'+
                '</div>'+
                '<div class="work-footer">'+
                  '<span>Thời gian hết  hạn: </span>'+
                  '<span>'+data.listWork[work].time_bound+'</span>'+
                '</div>'+
              '</div>'+

              "");
            }


            for(let work=0; work < data.listWork.length; work++){
              if(data.my_id == data.listWork[work].id_admin){
                $("#del_Work"+work).click(function(){

                  $.post("/delWork", {
                    id_del_work: data.listWork[work].id
                  }, (data)=>{
                    if(data=="success"){
                      $("#box_work"+work).remove();
                    }
                  })
                });
              }
            }

            for(let work=0; work < data.listWork.length; work++){
              $("#report"+work).hide();
            }
            console.log(data.my_id);
            for(let work=0; work < data.listWork.length; work++){
              if(data.listWork[work].id_user == data.my_id){
                $("#report"+work).show();
              }
            }


            for(let work=0; work < data.listWork.length; work++){
              $("#report"+work).click(()=>{

                $.post("/reportReq",{
                  req_val: $("#report"+work).val(),
                  id_exer: $("#id_exer_edit"+i+""+j).val(),
                  id_up: data.listWork[work].id
                }, (data)=>{
                  if(data=="success"){
                    $("#value_report"+work).text($("#report"+work).val()+"%");
                  }
                });
              })
            }




            $("#display_file_attachment"+i+""+j).html("");
            for(let file = 0; file < data.listFile.length; file++){

              if(data.listFile[file].tail_path == "jpg" || data.listFile[file].tail_path=="png"
              || data.listFile[file].tail_path=="gif"
               || data.listFile[file].tail_path=="jpeg"){

                 $("#display_file_attachment"+i+""+j).append(""+
                 '<a id="a_tag_rm'+file+'"  href="'+data.listFile[file].file_path+'" target="_blank">'+
                 '<img style="width: 100px; height: 70px;" src="'+data.listFile[file].file_path+'"> '+
                 '<span style="color: #404144;"> '+data.listFile[file].file_name+' </span>'+
                 '<span style="float: right; color: #606b7c;"class="glyphicon glyphicon-remove" '+
                 'id="rm_file_attach'+file+'"'+
                 '> </span>'+
                 '<input type="hidden" id="id_file_rm'+file+'" value="'+data.listFile[file].id+'">'+
                 '</a>'+
                 "");
               }else{
                 $("#display_file_attachment"+i+""+j).append(""+
                 '<a id="a_tag_rm'+file+'" href="'+data.listFile[file].file_path+'" target="_blank">'+
                   '<img style="width: 70px; height: 60px;" src="images/image-file1.png">'+
                   '<span style="color: #404144;"> '+data.listFile[file].file_name+'</span>'+
                   '<span style="float: right; color: #606b7c;"class="glyphicon glyphicon-remove" '+
                   'id="rm_file_attach'+file+'"'+
                   '> </span>'+
                   '<input type="hidden" id="id_file_rm'+file+'" value="'+data.listFile[file].id+'">'+
                 '</a>'+
                 "");
               }

            }
            for(let file = 0; file < data.listFile.length; file++){
              $("#rm_file_attach"+file).click(function(){

                $.post("/removeFileAtt", {
                  id_rm: $("#id_file_rm"+file).val()
                }, (data)=>{
                  if(data=="success"){
                    $("#a_tag_rm"+file).remove();
                  }
                });

              });
            }
            $("#list_valuation"+i+""+j).html("");
            for(let val=0; val < data.listValuation.length; val++){
              $("#list_valuation"+i+""+j).append(""+
              '<div id="box_eval_del'+val+'" class="box-eval">'+
                '<div class="eval-title">'+
                '  <span class="color-title">'+data.listValuation[val].fullname+'</span>'+
                  '<span class="color-title">, Xếp loại: </span>'+
                  '<span class="color-title">'+data.listValuation[val].rank +'</span>'+
                  '<span id="del_Val'+val+'" class="glyphicon glyphicon-remove" '+
                  'style="float: right; margin-right: 5px; margin-top: 3px;" >'+
                  ''+
                  '</span>'+
                '</div>'+
                '<div class="eval-content">'+
                  '<span>'+
                    data.listValuation[val].comment+
                  '</span>'+

                '</div>'+
              '</div>'+

              "");
            }

            for(let val=0; val < data.listValuation.length; val++){
              if(data.my_id==data.listValuation[val].id_adm){
                $("#del_Val"+val).click(()=>{
                  $.post("/delVal", {
                    id_del: data.listValuation[val].id
                  }, (data)=>{
                    if(data=="success"){
                      $("#box_eval_del"+val).remove();
                    }
                  });
                });
              }
            }

          });
        }

      })

    }
  }
  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $("#exe_list"+i+""+j).click(function(){
        console.log("click"+i+""+j);
        socket.emit("discuss-room", {
          discuss_room_id: "diss"+i+""+j
        });
      });
    }
  }
  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $('#send_dis'+i+""+j).click(function(){
        if(validateEmpty($('#val_dis'+i+""+j).val())){
          socket.emit("ClientDiscussHandle", {
            discuss: $("#val_dis"+i+""+j).val(),
            id_user: $("#id_user").val(),
            id_exercise: $("#val_eid"+i+""+j).val(),
            name_user: $("#name_user"+i+""+j).val(),
            id_group: $("#id_group").val(),
            toppic_name: $("#toppic_name"+i).val(),
            exercise_name: $("#exercise_name_hidden"+i+""+j).val(),
            i_loop1: i,
            j_loop2: j
          })
          $('#val_dis'+i+""+j).attr('placeholder', "Thảo luận");
          $('#val_dis'+i+""+j).val("");

        }else{
          $('#val_dis'+i+""+j).attr('placeholder','Cần nhập nội dung thảo luận!');
        }
      });
    }
  }

  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $("#btn_file_diss"+i+""+j).click(function(){
        var file = $("#file_diss"+i+""+j)[0].files[0];
        var formData2 = new FormData();
        formData2.append("file_dis", file);
        formData2.append("id_exer", $("#val_eid"+i+""+j).val());
        if($("#file_diss"+i+""+j).val()!=""){
          $.ajax({
            url: "/fileDiscuss",
            type: "post",
            data: formData2,
            processData: false,
            contentType: false,
            success: function(data){
              console.log(data);
              var date = new Date();
              if(data.status=="success"){
                $("#ms_file_discuss"+i+""+j).html("Đính kèm file thành công").css('color', 'green');
                setTimeout(function(){
                  $("#ms_file_discuss"+i+""+j).html("");
                }, 2000);
                console.log(data.path_file);
                if(data.tail_file == "jpg" || data.tail_file=="png" || data.tail_file=="gif"
                 || data.tail_file=="jpeg"){
                   $("#modal_body_discuss"+i+""+j).append(""+
                   '<div class="container">'+
                    '<a style="width: 100%; height: 70px;" href="'+data.path_file+'" target="_blank">'+
                    '<img style="width: 50px; height: 50px;display: inline-block; " src="'+
                     data.path_file+'">'+
                    ' <span style="display: inline-block;">   '+data.file_name+'</span> '+
                    '</a>'+

                    '<span class="time-right">'+data.fullname+
                    '('+date.getHours()+':'+date.getMinutes()+')</span>'+
                   '</div>'+
                   "");
                 }
                 else{
                   $("#modal_body_discuss"+i+""+j).append(""+
                   '<div class="container">'+
                    '<a style="width: 100%; height: 70px;" href="'+data.path_file+'" target="_blank">'+
                    '<img style="width: 50px; height: 50px;display: inline-block; " src="'+
                     'images/image-file1.png'+'">'+
                    ' <span style="display: inline-block;">   '+data.file_name+'</span> '+
                    '</a>'+

                    '<span class="time-right"> '+data.fullname+''+
                    '('+date.getHours()+':'+date.getMinutes()+')</span>'+
                   '</div>'+
                   "");
                 }

                $("#file_diss"+i+""+j).val("");
              }else{
                $("#ms_file_discuss"+i+""+j).html("Đính kèm file thất bại").css('color', 'red');
                setTimeout(()=>{
                  $("#ms_file_discuss"+i+""+j).html("");
                }, 2000);
              }
            },
            crossDomain: true
          });
        }
      });
    }
  }



  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $("#name_exer_edit"+i+""+j).show();
      $("#box_edit_exercise"+i+""+j).hide();

    }
  }
  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $("#name_exer_edit"+i+""+j).click(function(){
        $("#name_exer_edit"+i+""+j).hide();
        $("#box_edit_exercise"+i+""+j).show();
      });
    }
  }
  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $("#un_edit_exer_name"+i+""+j).click(function(){
        $("#name_exer_edit"+i+""+j).show();
        $("#box_edit_exercise"+i+""+j).hide();
      });
    }
  }

  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){

      $("#btn_send_edit_exer"+i+""+j).click(function(e){

      });
    }
  }



  for(let i=0; i< $('#lenListToppic').val(); i++){
    $("#box_edit_toppic"+i).hide();
    $("#btn_edit_toppic"+i).show();
  }
  for(let i=0; i< $('#lenListToppic').val(); i++){
    $("#btn_edit_toppic"+i).click(function(){
      $("#box_edit_toppic"+i).show();
      $("#btn_edit_toppic"+i).hide();
    });
  }

  for(let i=0; i< $('#lenListToppic').val(); i++){
    $("#un_edit_toppic"+i).click(function(){
      $("#box_edit_toppic"+i).hide();
      $("#btn_edit_toppic"+i).show();
    })
  }
  for(let i=0; i< $('#lenListToppic').val(); i++){
    $("#btn_send_edit_toppic"+i).click(function(){

      if(validateEmpty($("#toppic_edit_name"+i).val())){
        $("#toppic_edit_name"+i).attr("placeholder", "sửa chủ đề");
        $.post("/editToppicName", {
          new_toppic_name: $("#toppic_edit_name"+i).val(),
          id_toppic_edit: $("#id_toppic_edit"+i).val()
        }, (data)=>{
          if(data=="success"){
            $("#box_edit_toppic"+i).hide();
            $("#btn_edit_toppic"+i).show();
            $("#btn_edit_toppic"+i).text($("#toppic_edit_name"+i).val());
          }
        });
      }else{
        $("#toppic_edit_name"+i).attr("placeholder", "cần nhập thông tin");
      }
    });
  }
  $("#search-gr").hide();
  $("#icon-add-newmember").click(()=>{
    $("#icon-add-newmember").hide();
    $("#search-gr").show();
  });
  $("#cancel_search").click(()=>{
    $("#icon-add-newmember").show();
    $("#search-gr").hide();
  });

  $("#list-search").hide();
  $("#search-gr-btn").click(()=>{
    if(validateEmpty($("#val-search-gr").val())){

      $.post("/searchMemGroup",
      {
        val_req_search: $("#val-search-gr").val(),
        id_gr: $("#id_of_group").val()
      }, (data)=>{
        if(data.status=="success"){
          $("#list-search").show();

          $("#icon-add-newmember").show();
          $("#search-gr").hide();
          $("#val-search-gr").val("");
          $("#content_list_search ul").html("");

          for(let mems=0; mems<data.listSearchMemGr.length; mems++){


            $("#content_list_search ul").append(""+
            "<li>"+
            "<div class='col-sm-2'>"+
            " <div class='icon-member'>"+
                "<img src='images/user.png' alt='member icon'>"+
              "</div>"+
            "</div>"+
            "<div class='name-member col-sm-7'>"+
              "<a href='#'> "+data.listSearchMemGr[mems].fullname+" </a>"+
            "</div>"+
            "<div class='invite-mem col-sm-3'>"+
              "<input type='hidden' id='id_user_invite"+mems+"' value='"+data.listSearchMemGr[mems].id+"'>"+
              "<input type='hidden' id='id_user_group"+mems+"' value='"+data.listSearchMemGr[mems].id_user_group+"'>"+
              "<button type='button' id='isMem"+mems+"'>"+
                "<span class='glyphicon glyphicon-plus'></span>"+
                "<span> Mời</span>"+
              "</button>"+
              "<button id='mem_suc"+mems+"'>"+
              "<span  class='glyphicon glyphicon-ok'> </span>"+
              "<span> Mời</span>"+
              "</button>"+
              "<button id='memAcc"+mems+"'>"+
              "<span> Nhận</span>"+
              "</button>"+
              "<button id='isMemG"+mems+"'>"+
              "<span> TV</span>"+
              "</button>"+
            "</div>"+
            "</li>"+
            "");
          }
          for(let i=0; i<data.listSearchMemGr.length; i++){
            $("#mem_suc"+i).hide();
            $("#isMem"+i).hide();
            $("#isMemG"+i).hide();
            $("#memAcc"+i).hide();
          }
          for(let i=0; i<data.listSearchMemGr.length; i++){
            if(data.listSearchMemGr[i].status==1 && data.listSearchMemGr[i].id_group==$("#id_of_group").val()){
              $("#mem_suc"+i).hide();
              $("#isMem"+i).hide();
              $("#isMemG"+i).hide();
              $("#memAcc"+i).show();
            }else if(data.listSearchMemGr[i].status==2 && data.listSearchMemGr[i].id_group==$("#id_of_group").val()){
              $("#mem_suc"+i).hide();
              $("#isMem"+i).hide();
              $("#isMemG"+i).show();
              $("#memAcc"+i).hide();
            }else if(data.listSearchMemGr[i].status==3 && data.listSearchMemGr[i].id_group==$("#id_of_group").val()){
              $("#mem_suc"+i).show();
              $("#isMem"+i).hide();
              $("#isMemG"+i).hide();
              $("#memAcc"+i).hide();
            }else{
              $("#mem_suc"+i).hide();
              $("#isMem"+i).show();
              $("#isMemG"+i).hide();
              $("#memAcc"+i).hide();
            }
          }
          for(let i=0; i<data.listSearchMemGr.length; i++){
            $("#isMem"+i).click(function () {

              $.post("/inviteUser",
                  {
                    id_invite: $("#id_user_invite"+i).val(),
                    id_gr_invite: $("#id_of_group").val(),
                    name_of_group: $("#name_of_group").val()
                }, (data)=>{
                  if(data=="success"){
                    $("#mem_suc"+i).show();
                    $("#isMem"+i).hide();
                    $("#isMemG"+i).hide();
                    $("#memAcc"+i).hide();
                  }else{

                  }
              });
            });
          }
          for(let i=0; i<data.listSearchMemGr.length; i++){
            $("#memAcc"+i).click(function(){
              $.post("/acceptUser",
              {
                id_user_group: $("#id_user_group"+i).val(),
                name_of_group: $("#name_of_group").val(),
                id_invite: $("#id_user_invite"+i).val()
              }, (data)=>{
                if(data=="success"){
                  $("#mem_suc"+i).hide();
                  $("#isMem"+i).hide();
                  $("#isMemG"+i).show();
                  $("#memAcc"+i).hide();
                }
              })
            });
          }
        }
      });

    }else{
      $("#val-search-gr").attr('placeholder','Nhập từ khóa');
    }

  });
  $("#rm_box_search").click(()=>{
    $("#list-search").hide();
  });
  $("#box_chat_child").hide();


  for(let i = 0; i < ($("#lenListMemg").val() +1); i++){
    $("#member_chat"+i).click(function(){
      socket.emit("tao-room" , {
        my_id: $("#id_user").val(),
        mem_id: $("#member_chat_id"+i).val()
      });
      $.post("/message/partnerInfo",
      {
        partner_id: $("#member_chat_id"+i).val()
      },(data)=>{
        $("#box_chat_child").show();
        $("#box_chat_child").html(""+
        '<div class="name-child-chat">'+
          '<a href="#">'+data.infoPartner.fullname+'</a>'+
          '<a href="#" style="float: right; margin-right: 2px;" id="rm_box_child_chat">'+
            '<span class="glyphicon glyphicon-remove"></span>'+
          '</a>'+
        '</div>'+
        '<div id="content_child_chat" class="content-child-chat">'+
        '<ul>'+

        "</ul>"+
        '</div>'+
        '<div class="send-child-chat">'+
        '<div class="input-group" >'+
          '<textarea id="info_chat"class="form-control"'+
          'placeholder="Nhập nội dung" rows="1" cols="20"></textarea>'+

          '<div class="input-group-btn" >'+
            '<button class="btn btn-default" id="chat" type="button">'+
              'Gửi'+
            '</button>'+
          '</div>'+
        '</div>'+
        '</div> '+
        "");

        $("#chat").click(function(){
          if(validateEmpty($("#info_chat").val())){
            $("#info_chat").attr("placeholder", "Nhập nội dung");
            socket.emit("MessageExchange", {
              my_id: $("#id_user").val(),
              mem_id: $("#member_chat_id"+i).val(),
              content_ex:  $("#info_chat").val()
            })
            $("#info_chat").val("");
          }else{
            $("#info_chat").attr("placeholder", "Bạn cần nhập nội dung");
          }
        });

        for(let infox = 0; infox < data.listExchangeInfo.length; infox++){

          if(data.listExchangeInfo[infox].id_user_a == $("#member_chat_id"+i).val()){
            $("#content_child_chat ul").append(""+
            '<li class="container darker">'+
              '<img src="./images/user.png" alt="Avatar" class="right" style="width:100%;">'+
              '<p>'+data.listExchangeInfo[infox].question_answer+'</p>'+
              '<span class="time-left">11:01</span>'+
            '</li>'+
            "");
          }else{
            $("#content_child_chat ul").append(""+
            '<li class="container">'+
              '<img src="./images/userth.png" alt="Avatar" style="width:100%;">'+
              '<p>'+data.listExchangeInfo[infox].question_answer+'</p>'+
              '<span class="time-right">11:00</span>'+
            '</li>'+
            "");
          }

        }
        $("#rm_box_child_chat").click(function(){
          $("#box_chat_child").hide();
        });
      });

    });
  }


  socket.on("ServerMessageExchange", (data)=>{
    if(data.my_id == $("#id_user").val()){
      $("#content_child_chat ul").append(""+
      '<li class="container">'+
        '<img src="./images/userth.png" alt="Avatar" style="width:100%;">'+
        '<p>'+data.content_ex+'</p>'+
        '<span class="time-right">11:00</span>'+
      '</li>'+
      "");
    }else{
      $("#content_child_chat ul").append(""+
      '<li class="container darker">'+
        '<img src="./images/user.png" alt="Avatar" class="right" style="width:100%;">'+
        '<p>'+data.content_ex+'</p>'+
        '<span class="time-left">11:01</span>'+
      '</li>'+
      "");
    }
  })





  //88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
        $("#box_evaluation"+i+""+j).hide();
        $("#box_manager_work"+i+""+j).hide();
        $("#box_time_learn"+i+""+j).show();
        $("#form_add_exer_app"+i+""+j).hide();
        $("#btn_click_add"+i+""+j).show();
      }
    }

    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
        $("#add_work"+i+""+j).click(()=>{
          $("#form_add_exer_app"+i+""+j).show();
          $("#btn_click_add"+i+""+j).hide();
        });
        $("#un_add_work"+i+""+j).click(function(){
          $("#form_add_exer_app"+i+""+j).hide();
          $("#btn_click_add"+i+""+j).show();
        });
      }
    }

    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
        $("#btn_create_schedule"+i+""+j).click(function(){
          socket.emit("schedule-client", {
            schedule: "Trưởng nhóm tạo lịch"
          });
          if(validateTimeSchedule($("#start_date"+i+""+j).val(),
            $("#start_time"+i+""+j).val(), $("#finish_date"+i+""+j).val(),
            $("#finish_time"+i+""+j).val()) && validateTime(
              $("#start_time"+i+""+j).val()
            ) && validateTime($("#finish_time"+i+""+j).val())){

              $.post("/schedule",
              {
                start_date:  $("#start_date"+i+""+j).val(),
                start_time: $("#start_time"+i+""+j).val(),
                finish_date: $("#finish_date"+i+""+j).val(),
                finish_time: $("#finish_time"+i+""+j).val(),
                id_exer: $("#id_exer_edit"+i+""+j).val(),
                id_group: $("#id_group").val(),
                exercise_name: $("#exercise_name_hidden"+i+""+j).val(),
                toppic_name: $("#toppic_name"+i).val()
              }, (data)=>{
                if(data.status=="success"){
                  $("#activity_box ul").append(""+
                  '<li>'+
                    '<a class="mainTarget" href="#">'+data.name+'</a>'+
                    '<span class="content_activi"> trong </span>'+
                    '  <a class="mainTarget" href="#">'+data.exercise_name+'</a>'+
                      '<span class="content_activi"> của </span>'+
                    '<a class="mainTarget" href="#">'+data.toppic_name+'</a>'+
                    '<br>'+
                     '<span class="content_activi">'+
                      data.activity+
                     '</span>'+
                  '</li>'+
                  "");
                  $("#msg_success_schedule"+i+""+j).html("Thành công").css("color", "green");
                  setTimeout(()=>{
                    $('#msg_success_schedule'+i+''+j).html("");
                    $("#start_date"+i+""+j).val("");
                    $("#start_time"+i+""+j).val("");
                    $("#finish_date"+i+""+j).val("");
                    $("#finish_time"+i+""+j).val("");

                  }, 2000);
                  $("#time_schedule"+i+""+j+" table tbody").append(""+
                  '<tr>'+
                    '<td> '+$("#start_date"+i+""+j).val()+' </td>'+
                    '<td> '+$("#start_time"+i+""+j).val()+' </td>'+
                    '<td>-></td>'+
                    '<td> '+$("#finish_date"+i+""+j).val()+'</td>'+
                    '<td> '+$("#finish_time"+i+""+j).val()+' </td>'+
                    '<td>'+'<input type="button" style="border:none;" value="x">'+'</td>'+
                  '</tr>'+
                  "");
                }else{
                  $("#msg_success_schedule"+i+""+j).html("Thất bại").css("color", "red");
                  setTimeout(()=>{
                    $('#msg_success_schedule'+i+''+j).html("");
                    $("#start_date"+i+""+j).val("");
                    $("#start_time"+i+""+j).val("");
                    $("#finish_date"+i+""+j).val("");
                    $("#finish_time"+i+""+j).val("");
                }, 2000);
              }
            })
          }else {
            $("#msg_success_schedule"+i+""+j).html("Thất bại").css("color", "red");
            setTimeout(()=>{
              $('#msg_success_schedule'+i+''+j).html("");
              $("#start_date"+i+""+j).val("");
              $("#start_time"+i+""+j).val("");
              $("#finish_date"+i+""+j).val("");
              $("#finish_time"+i+""+j).val("");
            }, 2000);
          }
        });
      }
    }
    function validateTime(time){
      var value = false;
      for(let i = 0; i< time.length; i++){
        if(time[i] == ":"){
          value = true;
          break;
        }
      }
      if(value == true){
        var str = time.split(":");
        if(str[0] > 0 && str[0] < 25 && str[1] > 0 && str[1] < 61){
          return true;
        }else return false;
      }
      return false;
    }
    function validateTimeSchedule(start_date, start_time, end_date, end_time){
      if(start_date != "" && start_time != "" && end_date != "" && end_time != "" ){
        return true;
      }else return false;
    }

    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){

        $("#li_time_activity"+i+""+j).click(function(){
          $("#li_time_activity"+i+""+j).addClass("active");
          $("#li_exer_activity"+i+""+j).removeClass("active");
          $("#li_evalua_activity"+i+""+j).removeClass("active");
        })
        $("#li_exer_activity"+i+""+j).click(function(){
          $("#li_exer_activity"+i+""+j).addClass("active");
          $("#li_time_activity"+i+""+j).removeClass("active");
          $("#li_evalua_activity"+i+""+j).removeClass("active");
        })
        $("#li_evalua_activity"+i+""+j).click(function(){
          $("#li_evalua_activity"+i+""+j).addClass("active");
          $("#li_time_activity"+i+""+j).removeClass("active");
          $("#li_exer_activity"+i+""+j).removeClass("active");
        })
      }
    }

    var check = 0;
  var id_mem;
    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){

        $("#select_member"+i+""+j).click(()=>{
          id_mem = $("#select_member"+i+""+j).val();
          $("#work_for_mem"+i+""+j).val(id_mem) ;

          $("#td_select_member"+i+""+j).html(""+
          "<span id='val_select_member"+i+""+j+""+(check)+ "' >"+$("#select_member"+i+""+j+" :selected").text()+"</span> &nbsp;"+
          "<button id='undo_add_mem_work"+i+""+j+""+(check++)+ "' "+
          "style='font-size: 11px; border:none;' class='glyphicon glyphicon-remove'> </button>"+
          " &nbsp; ");
          for(let checked=0; checked < check; checked++){

            $("#undo_add_mem_work"+i+""+j+""+checked).click(()=>{
              $("span[id^='val_select_member"+i+""+j+checked+"']").remove();
              $("button[id^='undo_add_mem_work"+i+""+j+checked+"']").remove();
            })
          }

        })

      }
    }


    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
        $("#add_new_work"+i+""+j).click(()=>{
          $name_mem = $("#select_member"+i+""+j+" :selected").text();
          $work_name = $("#work_name"+i+""+j).val();
          $work_mem = $("#work_for_mem"+i+""+j).val();
          $work_time = $("#time_bound"+i+""+j).val();
          $id_exer = $("#id_exer_edit"+i+""+j).val();

          if(validateWork($work_name, $work_mem, $work_time)){
            $.post("/addwork", {
              work_name: $work_name,
              work_mem: $work_mem,
              work_time: $work_time,
              id_exer: $id_exer,
              id_group: $("#id_group").val(),
              toppic_name: $("#toppic_name"+i).val(),
              exercise_name: $("#exercise_name_hidden"+i+""+j).val()
            }, (data)=>{
              if(data.status == "success"){
                $("#activity_box ul").append(""+
                '<li>'+
                  '<a class="mainTarget" href="#">'+data.name+'</a>'+
                  '<span class="content_activi"> trong </span>'+
                  '  <a class="mainTarget" href="#">'+data.exercise_name+'</a>'+
                    '<span class="content_activi"> của </span>'+
                  '<a class="mainTarget" href="#">'+data.toppic_name+'</a>'+
                  '<br>'+
                   '<span class="content_activi">'+
                    data.activity+
                   '</span>'+
                '</li>'+
                "");
                $("#msg_success_work"+i+""+j).html("Thành công!").css('color', "green");
                setTimeout(()=>{
                    $("#msg_success_work"+i+""+j).html("");
                }, 2000);
                $("#work_time_member"+i+""+j).append(""+
                '<div class="box-work">'+
                  '<div class="work-title">'+
                  '  <span class="color-title">'+$name_mem+' </span>'+
                    '<span class="color-title">hoàn thiện công việc</span>'+
                    '<span class="color-title">'+0+'%</span>'+
                  '</div>'+
                '  <div class="work-content">'+
                  '  <span>'+$work_name+'</span>'+
                  '</div>'+
                  '<div class="work-footer">'+
                    '<span>Thời gian hết  hạn: </span>'+
                    '<span>'+$work_time+'</span>'+
                  '</div>'+
                '</div>'+
                "");
                $("#work_name"+i+""+j).val("");
                $("#work_for_mem"+i+""+j).val("");
                $("#time_bound"+i+""+j).val("");

              }else{
                $("#msg_success_work"+i+""+j).html("Thêm công việc thất bại").css('color', "red");
                setTimeout(()=>{
                  $("#msg_success_work"+i+""+j).html("");
                }, 2000)
              }
            });
          }else {
            $("#msg_success_work"+i+""+j).html("Thêm công việc thất bại").css('color', "red");
            setTimeout(function(){
              $("#msg_success_work"+i+""+j).html("");
            }, 2000);
          }
        })

      }
    }



    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
          $("#btn_comment"+i+""+j).click(function(){

            if(validate1($("#comment_member"+i+""+j).val(), $("#rank_member"+i+""+j).val(),
                      $("#valuation_mem"+i+""+j).val())){
                console.log($("#valuation_mem"+i+""+j+" :selected").text());
                $.post("/advaluation", {
                  comment: $("#comment_member"+i+""+j).val(),
                  rank: $("#rank_member"+i+""+j).val(),
                  id_user: $("#valuation_mem"+i+""+j).val(),
                  id_exer: $("#id_exer_edit"+i+""+j).val(),
                  id_group: $("#id_group").val(),
                  toppic_name: $("#toppic_name"+i).val(),
                  exercise_name: $("#exercise_name_hidden"+i+""+j).val()
                }, (data)=>{
                  if(data.status == "success"){
                    $("#activity_box ul").append(""+
                    '<li>'+
                      '<a class="mainTarget" href="#">'+data.name+'</a>'+
                      '<span class="content_activi"> trong </span>'+
                      '  <a class="mainTarget" href="#">'+data.exercise_name+'</a>'+
                        '<span class="content_activi"> của </span>'+
                      '<a class="mainTarget" href="#">'+data.toppic_name+'</a>'+
                      '<br>'+
                       '<span class="content_activi">'+
                        data.activity+
                       '</span>'+
                    '</li>'+
                    "");
                    $("#msg_success_evaluation"+i+""+j).html("Thành công").css('color', 'green');
                    setTimeout(()=>{
                      $("#msg_success_evaluation"+i+""+j).html("");
                    }, 2000);
                    $("#list_valuation"+i+""+j).append(""+

                    '<div class="box-eval">'+
                      '<div class="eval-title">'+
                      '  <span class="color-title">'+$("#valuation_mem"+i+""+j+" :selected").text()+'</span>'+
                        '<span class="color-title">, Xếp loại: </span>'+
                        '<span class="color-title">'+$("#rank_member"+i+""+j).val() +'</span>'+
                        '<span class="glyphicon glyphicon-remove" '+
                        'style="float: right; margin-right: 5px; margin-top: 3px;" >'+
                        ''+
                        '</span>'+
                      '</div>'+
                      '<div class="eval-content">'+
                        '<span>'+
                          $("#comment_member"+i+""+j).val()+
                        '</span>'+
                      '</div>'+
                    '</div>'+
                    "");
                    $("#valuation_mem"+i+""+j+" :selected").text("");
                    $("#rank_member"+i+""+j).val("");
                    $("#comment_member"+i+""+j).val("");
                  }else{

                  }
                });
            }else {
              $("#msg_success_evaluation"+i+""+j).html("Thất bại").css('color', 'red');
              setTimeout(()=>{
                $("#msg_success_evaluation"+i+""+j).html("");
              }, 2000);
            }
        })
      }
    }
    function validate1(a,b,c){
      if(a != "" && b!= "-1" && c!="-1"){
        return true;
      }else {
        return false;
      }
    }
    function validateWork($work_name, $work_mem, $work_time){
      if(($work_name != "" && $work_time != "" && $work_mem != "")){
        return true;
      }else{
        return false;
      }
    }


    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){

       $("#btn_fileupload"+i+""+j).click(function(){

         var file = $("#file_upload"+i+""+j)[0].files[0];
         var formData = new FormData();
         formData.append("file_up", file);
         formData.append("id_exer", $("#id_exer_edit"+i+""+j).val());

         if($("#file_upload"+i+""+j).val()!= ""){
           $.ajax({
             url: "/uploadattachment",
             type: "post",
             data: formData,
             processData: false,
             contentType: false,
             success: function(data){
               $("#file_upload"+i+""+j).val("");
               if(data.status=="success"){
                 $("#mess_att"+i+""+j).text("Đính kèm file thành công").css('color', 'green');
                 setTimeout(function(){
                    $("#mess_att"+i+""+j).text("")
                 }, 2000);
                 if(data.tail_path == "jpg" || data.tail_path=="png" || data.tail_path=="gif"
                  || data.tail_path=="jpeg"){
                    $("#display_file_attachment"+i+""+j).append(""+
                     '<a  href="'+data.path_file+'" target="_blank">'+
                     '<img style="width: 100px; height: 70px;" src="'+data.path_file+'"> '+
                     '<span style="color: #404144;"> '+data.name_path+' </span>'+
                     '</a>'+
                    "");
                  }else{
                    $("#display_file_attachment"+i+""+j).append(""+
                    '<a href="'+data.path_file+'" target="_blank">'+
                      '<img style="width: 70px; height: 60px;" src="images/image-file1.png">'+
                      '<span style="color: #404144;"> '+data.name_path+'</span>'+
                    '</a>'+
                    "");
                  }
               }else{
                 $("#mess_att"+i+""+j).text("Đính kèm file thất bại").css('color', 'red');
                 setTimeout(function(){
                    $("#mess_att"+i+""+j).text("")
                 }, 2000);
               }

             },
             crossDomain: true
           });
         }else{
           $("#mess_att"+i+""+j).text("Đính kèm file thất bại").css('color', 'red');
           setTimeout(function(){
              $("#mess_att"+i+""+j).text("")
           }, 2000);
         }
       });
      }
    }

    socket.on("ServerSchedule", (data)=>{
      alert(data.schedule+"thuckate");
      $("#show_activity").append(""+
      '<li>'+
        '<a href="#">'+"Thuc "+data.schedule+'</a>'+
      '</li>'+
      "")
    });

    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
        $("#honors_mem"+i+""+j).click(function(){
          if($("#honors_mem"+i+""+j).val()=="_10"){
            $.post("/unHonors", {
              id_exer: $("#id_exer_edit"+i+""+j).val()
            }, (data)=>{
              if(data == "success"){
                $("#honors_div"+i+""+j).html("");
              }
            })
          }else {

            let honors = $("#honors_mem"+i+""+j).val()+" là thành viên hoạt động tích cực "+
            " nhất";
            $.post("/honorsMember", {
              id_exer: $("#id_exer_edit"+i+""+j).val(),
              honors: honors
            }, (data)=>{
              if(data == "success"){
                // $("#honors_div"+i+""+j).show();
                // $("#remind_div"+i+""+j).hide();
                 $("#honors_div"+i+""+j).html(""+
                 '<p style="color: green;"'+
                    'class="microsoft marquee">'+
                    honors+
                 '</p> '+
                 "")
              }
            });
          }
        });
      }
    }
    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
        //  $("#honors_div"+i+""+j).hide();
        //  $("#remind_div"+i+""+j).hide();
      }
    }
    for(let i=0; i< $('#lenListToppic').val(); i++){
      for(let j = 0; j < $('#lenListExer').val(); j++){
        $("#remind_mem"+i+""+j).click(function(){
          if($("#remind_mem"+i+""+j).val()=="_10"){
            $.post("/unRemind", {
              id_exer: $("#id_exer_edit"+i+""+j).val()
            }, (data)=>{
              if(data == "success"){
                $("#remind_div"+i+""+j).html("");
              }
            });
          }else {
            let remind = $("#remind_mem"+i+""+j).val()+" cần cố gắng hơn nữa trong "+
            " việc học nhóm ";
            $.post("remindMember", {
              id_exer: $("#id_exer_edit"+i+""+j).val(),
              remind: remind
            }, (data)=>{
              if(data=="success"){
                $("#remind_div"+i+""+j).html(""+
                '<p style="color: red;"'+
                  ' class="microsoft marquee">'+
                   remind+
                '</p>'+
                "")
              }
            });
          }
        });
      }
    }

    $("#activity_box").hide();
    $("#closeBoxMember").hide();
    $("#activity_close_btn").hide();
    $("#all_member").hide();
    $("#open_member").click(()=>{
      $("#closeBoxMember").show();
      $("#all_member").show();
      $("#activity_box").hide();
      $("#activity_close_btn").hide();
    })
    $("#closeBoxMember").click(()=>{
      $("#closeBoxMember").hide();
      $("#all_member").hide();
    })
    $("#activity_close_btn").click(()=>{
      $("#activity_box").hide();
      $("#activity_close_btn").hide();
    });
    $("#activity_btn").click(()=>{
      $("#activity_box").show();
      $("#activity_close_btn").show();
      $("#closeBoxMember").hide();
      $("#all_member").hide();

      $.post("/activity", {
        id_group: $('#id_group').val()
      }, (data)=>{
        if(data.listActivity.length == 0){
          $("#activity_box ul").html("<h4> Chưa có hoạt động nào</h4>");
        }else{
          $("#activity_box ul").html("");
          for(let i = 0; i < data.listActivity.length; i++){
            if(data.listActivity[i].exercise_name == null &&
              data.listActivity[i].toppic_name != null){
              $("#activity_box ul").append(""+
              '<li>'+
                '<a class="mainTarget" href="#">'+data.listActivity[i].name+'</a>'+
                '<span class="content_activi"> trong </span>'+
                '<a class="mainTarget" href="#">'+data.listActivity[i].toppic_name+'</a>'+
                '<br>'+
                 '<span class="content_activi">'+
                  data.listActivity[i].activity+
                 '</span>'+
              '</li>'+
              "");
            }else if(data.listActivity[i].toppic_name == null&&
              data.listActivity[i].exercise_name == null){
                $("#activity_box ul").append(""+
                '<li>'+
                  '<a class="mainTarget" href="#">'+data.listActivity[i].name+'</a>'+
                  '<br>'+
                   '<span class="content_activi">'+
                    data.listActivity[i].activity+
                   '</span>'+
                '</li>'+
                "");
              }else if(data.listActivity[i].exercise_name != null&&
              data.listActivity[i].toppic_name != null){
                $("#activity_box ul").append(""+
                '<li>'+
                  '<a class="mainTarget" href="#">'+data.listActivity[i].name+'</a>'+
                  '<span class="content_activi"> trong </span>'+
                  '  <a class="mainTarget" href="#">'+data.listActivity[i].exercise_name+'</a>'+
                    '<span class="content_activi"> của </span>'+
                  '<a class="mainTarget" href="#">'+data.listActivity[i].toppic_name+'</a>'+
                  '<br>'+
                   '<span class="content_activi">'+
                    data.listActivity[i].activity+
                   '</span>'+
                '</li>'+
                "");
              }

          }
        }
      })
    });
    $("#member_group").show();
    $("#closeActivity").click(()=>{
      $("#member_group").hide();
      $("#member_group").removeClass("col-sm-3");
      $("#content_group").removeClass("col-sm-9");
      $("#member_group").addClass("col-sm-0");
      $("#content_group").addClass("col-sm-12");
    });
    $("#title_group").click(()=>{
      $("#member_group").show();
      $("#member_group").addClass("col-sm-3");
      $("#content_group").addClass("col-sm-9");
      $("#member_group").removeClass("col-sm-0");
      $("#content_group").removeClass("col-sm-12");
    });
});

function validateEmpty(name1){
  if(name1=="" || name1 =="undefined")return false;
  return true;
}

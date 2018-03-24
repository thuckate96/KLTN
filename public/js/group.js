var socket = io("http://localhost:3000");
$(document).ready(function(){

  if($("#rs_UNG").val()=="false"){
    $("#icon-add-newmember").hide();
    $('#btn-add-toppic').hide();
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
          if(data=="success"){
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
            id_toppic: $("#toppic_id"+i).val()
          },function(data){
            if(data.status=="success"){
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
    if(data.id_user == $("#id_user").val()){
      $("#modal_body_discuss"+data.i_loop1+""+data.j_loop2).append(""+
      '<div class="container">'+
       '<img src="./images/user.png" alt="Avatar" style="width:100%;">'+
       '<p>'+data.discuss+'</p>'+
       '<span class="time-right">(11:00)</span>'+
      '</div>'+
      "");
    }else {
      $("#modal_body_discuss").append(""+
      '<div class="container darker">'+
       '<img src="./images/userth.png" alt="Avatar" class="right" style="width:100%;">'+
       '<p>'+data.discuss+'</p>'+
       '<span class="time-left"> (12:00)</span>'+
      '</div>'+
      "");
    }
  });

  for(let i=0; i< $('#lenListToppic').val(); i++){
    for(let j = 0; j < $('#lenListExer').val(); j++){
      $('#send_dis'+i+""+j).click(function(){
        if(validateEmpty($('#val_dis'+i+""+j).val())){
          socket.emit("ClientDiscussHandle", {
            discuss: $("#val_dis"+i+""+j).val(),
            id_user: $("#id_user").val(),
            id_exercise: $("#val_eid"+i+""+j).val(),
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
                    id_gr_invite: $("#id_of_group").val()
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
                id_user_group: $("#id_user_group"+i).val()
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
          console.log($("#member_chat_id"+i).val());
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


});

function validateEmpty(name1){
  if(name1=="")return false;
  return true;
}

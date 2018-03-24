$('document').ready(function(){
  $('.pro-detail .info-profile').show();
  $('.pro-detail .group-profile').hide();
  $('.pro-detail .friend-profile').hide();
  $('ul[id*=info-id] li a').click(function(){
      $('ul[id*=info-id] li a').removeClass();
      $(this).addClass('active');
  });
  $('.pro-nav .list-prof ul li.info1').click(function(){
    $('.pro-detail .info-profile').show();
    $('.pro-detail .group-profile').hide();
    $('.pro-detail .friend-profile').hide();
  })
  $('.pro-nav .list-prof ul li.info2').click(function(){
    $('.pro-detail .info-profile').hide();
    $('.pro-detail .group-profile').show();
    $('.pro-detail .friend-profile').hide();

  })
  $('.pro-nav .list-prof ul li.info3').click(function(){
    $('.pro-detail .info-profile').hide();
    $('.pro-detail .group-profile').hide();
    $('.pro-detail .friend-profile').show();
  });
  for(let i=0;i < $("#admLen").val(); i++){
    for(let j=0;j< $("#grmemLen").val(); j++){
      $("#btn_acc_mem"+i+""+j).hide();
      $("#btn_cancel_invite"+i+""+j).hide();
      if($("#val_status"+i+""+j).val() ==1){
        $("#btn_acc_mem"+i+""+j).show();
        $("#btn_rm_mem"+i+""+j).hide();
        $("#btn_cancel_invite"+i+""+j).hide();
      }else if($("#val_status"+i+""+j).val()== 2){
        $("#btn_acc_mem"+i+""+j).hide();
        $("#btn_rm_mem"+i+""+j).show();
        $("#btn_cancel_invite"+i+""+j).hide();
      }else if($("#val_status"+i+""+j).val()== 3){
        $("#btn_acc_mem"+i+""+j).hide();
        $("#btn_rm_mem"+i+""+j).hide();
        $("#btn_cancel_invite"+i+""+j).show();
      }else{
        $("#btn_acc_mem"+i+""+j).hide();
        $("#btn_rm_mem"+i+""+j).hide();
        $("#btn_cancel_invite"+i+""+j).hide();
      }
    }
  }

  for(let i=0;i < $("#admLen").val(); i++){
    for(let j=0;j< $("#grmemLen").val(); j++){
      $("#btn_cancel_invite"+i+""+j).click(function(){
        $.post("/cancelInvite",
        {
          id_user_group_cancel: $("#val_id_gacc"+i+""+j).val()
        }, (data)=>{
          if(data=="success"){
            $("#li_gr"+i+""+j).hide();
          }
        });
      });
    }
  }

  for(let i=0;i < $("#admLen").val(); i++){
    for(let j=0;j< $("#grmemLen").val(); j++){
       $("#btn_acc_mem"+i+""+j).click(function(){
         $.post("/accessMember",
         {
           idAcc: $("#val_id_gacc"+i+""+j).val()
         },(data)=>{
           if(data=="success"){
             $("#btn_acc_mem"+i+""+j).hide();
             $("#btn_rm_mem"+i+""+j).show();
           }
         });
       });
    }
  }
  for(let i=0;i < $("#admLen").val(); i++){
    for(let j=0;j< $("#grmemLen").val(); j++){
       $("#btn_rm_mem"+i+""+j).click(function(){
         $.post("/removeMember",
         {
           idAcc: $("#val_id_gacc"+i+""+j).val()
         },(data)=>{
           if(data=="success"){
             $("#mess"+i).html("Loại bỏ thành công").css('color', 'green');
             $("#li_gr"+i+""+j).hide();
             setTimeout(function(){
               $("#mess"+i).html("");
             }, 2000);
           }
         });
       });
    }
  }
  for(let i=0;i < $("#admLen").val(); i++){
    $("#btnAdmGrRm"+i).click(function(){
      $.post("/cancelGroupAdm",
      {
        id_group_cancel: $("#idRmAdmGr"+i).val()
      }, (data)=>{
        if(data=="success"){
          $("#li_listAdm"+i).hide();
        }
      });
    });
  }
  for(let i = 0; i < $("#lenListMem").val(); i++){
    $("#out_group"+i).click(function(){
      $.post("/profileOutGroup",
      {
        id_cancel: $("#user_group_cancel"+i).val()
      } , (data)=>{
        if(data=="success"){
          $("#li_usr_is_mem"+i).hide();
        }
      });
    });
  }




// Tai day chinh phan nay dang can duoc lam tiep ------------------------------


  $("#title_icon_friend").show();
  $("#box_enter_search_friend").hide();
  $("#btn_click_form_pro").click(function(){
    $("#title_icon_friend").hide();
    $("#box_enter_search_friend").show();
  });
  $("#not_search_friend").click(function(){
    $("#val-search-friend").val("");
    $("#title_icon_friend").show();
    $("#box_enter_search_friend").hide();
  });
  $("#result_search_friend").hide();
  $("#box_list_friend").show();
  $("#search-friend").click(function(){
    if(validateEmpty($("#val-search-friend"))){
      $("#val-search-friend").attr('placeholder', 'Tìm kiếm bạn bè');
      $("#result_search_friend ul").html("");
      $("#box_list_friend").hide();
      $.post("/searchFriend",
      {
        val_search_friend: $("#val-search-friend").val()
      }, (data)=>{
        if(data.status="success"){
          $("#title_icon_friend").show();
          $("#box_enter_search_friend").hide();
          $("#val-search-friend").val("");
          $("#result_search_friend").show();
          $("#result_search_friend ul").html("");
          for(let friend=0; friend < data.listSearchFriend.length; friend++){
            $("#result_search_friend ul").append(""+
            '<li id="li_search_friend">'+
              '<div class="col-sm-2 left-gr">'+
                '<div class="pr_gr_img_box">'+
                  '<img src="./images/user-icon.png" alt="icon-group">'+
                '</div>'+
              '</div>'+
              '<div class="col-sm-6 middle-gr">'+
                '<a href="#" style="text-decoration:none;">'+data.listSearchFriend[friend].fullname+'</a>'+
              '</div>'+
              '<div class="col-sm-4 right-gr">'+
                '<input type="hidden" id="val_friend_action'+friend+'"'+
                'value="'+data.listSearchFriend[friend].id_friend_search+'">'+
                '<input type="hidden" id="val_id_friend_action'+friend+'"'+
                'value="'+data.listSearchFriend[friend].id+'">'+
                 '<button type="button" id="make_friend'+friend+'">'+
                   '<span>Kết bạn</span>'+
                 '</button>'+
                 '<button type="button" id="send_make_friend'+friend+'">'+
                   "<span>Đã yêu cầu </span>"+
                 "</button>"+
                 '<button type="button" id="is_friend'+friend+'">'+
                   "<span>Bạn bè </span>"+
                 "</button>"+
                 "<button type='button' id='accFriend"+friend+"'>"+
                   "<span>Chấp nhận</span>"+
                 "</button>"+
              "</div>"+
            "</li>"
          )
          }
          for(let friend=0; friend < data.listSearchFriend.length; friend++){
            $("#accFriend"+friend).click(function(){

              $.post("/acceptFriendPR",
              {
                id_acceptF: $("#val_friend_action"+friend).val()
              }, (data)=>{
                if(data=="success"){
                  $("#make_friend"+friend).hide();
                  $("#send_make_friend"+friend).hide();
                  $("#is_friend"+friend).show();
                  $("#accFriend"+friend).hide();
                }
              });
            });
          }

          for(let friend=0; friend < data.listSearchFriend.length; friend++){
            $("#make_friend"+friend).click(function(){
              $.post("/makeFriendReq",
               {
                 id_friend_request: $('#val_id_friend_action'+friend).val()
               }, (data)=>{
                if(data=="success"){
                  $("#make_friend"+friend).hide();
                  $("#send_make_friend"+friend).show();
                  $("#is_friend"+friend).hide();
                  $("#accFriend"+friend).hide();
                }
              });
            });
          }
          for(let friend=0; friend < data.listSearchFriend.length; friend++){
            $("#make_friend"+friend).hide();
            $("#send_make_friend"+friend).hide();
            $("#is_friend"+friend).hide();
            $("#accFriend"+friend).hide();
          }
          for(let friend=0; friend < data.listSearchFriend.length; friend++){
            if(data.listSearchFriend[friend].status == 1){
              $("#make_friend"+friend).hide();
              $("#send_make_friend"+friend).show();
              $("#is_friend"+friend).hide();
              $("#accFriend"+friend).hide();
            } else if(data.listSearchFriend[friend].status == 2){
              $("#make_friend"+friend).hide();
              $("#send_make_friend"+friend).hide();
              $("#is_friend"+friend).show();
              $("#accFriend"+friend).hide();
            }else if(data.listSearchFriend[friend].status == 3){
              $("#make_friend"+friend).hide();
              $("#send_make_friend"+friend).hide();
              $("#is_friend"+friend).hide();
              $("#accFriend"+friend).show();
            }else {
              $("#make_friend"+friend).show();
              $("#send_make_friend"+friend).hide();
              $("#is_friend"+friend).hide();
              $("#accFriend"+friend).hide();
            }
          }

        }
      });
    }else{
      $("#val-search-friend").attr('placeholder', 'Nhập từ khóa');
      $("#result_search_friend ul").html("");
    }
  });
  $("#cancel_box_search").click(function(){
    $("#result_search_friend ul").html("");
    $("#result_search_friend").hide();
    $("#box_list_friend").show();
  });


//************************************* XU LY HUY KET BAN ********************************

  for(let i=0; i< $("#lenFriend").val(); i++){
    $("#btn_undo_friend"+i).click(function(){
      $.post("/undoFriend",
      {
        id_undo: $("#val_id_undo_friend"+i).val()
      }, (data)=>{
        if(data == "success"){
          $("#li_list_friend"+i).remove();
        }
      });
    });
  }


  for(let i=0;i < 6; i++){
    $("#val_edit"+i).hide();
    $("#btn_edit"+i).hide();
    $("#cancel_edit"+i).hide();
  }
  for(let i=0;i < 6; i++){
    $("#val"+i).show();
    $("#edit"+i).show();
  }

  for(let i=0;i < 6; i++){
    $("#edit"+i).click(function(){
      $("#val"+i).hide();
      $("#edit"+i).hide();
      $("#val_edit"+i).show();
      $("#btn_edit"+i).show();
      $("#cancel_edit"+i).show();
    });
  }
  for(let i=0;i < 6; i++){
    $("#cancel_edit"+i).click(function(){
      $("#val"+i).show();
      $("#edit"+i).show();
      $("#val_edit"+i).hide();
      $("#btn_edit"+i).hide();
      $("#cancel_edit"+i).hide();
    });
  }

  for(let i=0;i < 6; i++){
     $("#btn_edit"+i).click(function(){
       $.post("/editProfile"+i,
       {
         val_edit: $("#val_edit"+i).val()
       }, (data)=>{
         if(data=="success"){
           if(i==1){
             let birth= $("#val_edit"+i).val();

             let resBirth = birth.split("-");
             let dd = resBirth[2];
             let mm=resBirth[1];
             let yyyy=resBirth[0];
             let birthday=dd+'/'+mm+'/'+yyyy ;
             $("#val"+i).text(birthday);
           }else $("#val"+i).text($("#val_edit"+i).val());

           $("#val"+i).show();
           $("#edit"+i).show();
           $("#val_edit"+i).hide();
           $("#btn_edit"+i).hide();
           $("#cancel_edit"+i).hide();
           $("#val_edit"+i).val("");
         }
       });
     });
  }

});
function validateEmpty(value){
  if(value=="") return false;
  else return true;
}

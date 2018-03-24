function checkValSearchEmp(val){
  if(val =="") return true;
  else return false;
}
$(document).ready(()=>{
  $('#search').click(function(){
    if(!checkValSearchEmp($("#val-search").val())){
      $("#box-search").show();
      $.post("/search",
        {
          val_search: $("#val-search").val()
        }, function(data){
          $("#result ul").html("");
          for(let group=0; group < data.listGroupSearch.length; group++){
            $("#result ul").append(""+
            "<li> "+
            "<div class='col-sm-2 left-result' >"+
            "<div class='gimg-box'>"+
            "<img src='./images/pub-icon2.png' alt='icon-group'>"+
            "</div>"+
            "</div>"+
            "<div class='col-sm-6 middle-result' >"+
            "<a href='#' style='text-decoration:none;'>"+
            data.listGroupSearch[group].group_name+
            "</a>"+
            "</div>"+
            "<div class='col-sm-4 right-result'>"+
            "<input type='hidden' id='id_gr_search"+group+"' value='"+data.listGroupSearch[group].id+"'>"+
            "<button type='button' id='btn_join_group"+group+"'>"+
            "<span style='font-size: 14px;' class='glyphicon glyphicon-plus'></span>"+
            "<span style='font-size: 14px;'>Tham gia</span>"+
            "</button>"+
            "<button type='button' id='btn_send_require"+group+"'>"+
            "<span style='font-size: 14px;'>Đã yêu cầu</span>"+
            "</button>"+
            "<button type='button' id='btn_is_member"+group+"'>"+
            "<span style='font-size: 14px;'>Thành viên</span>"+
            "</button>"+
            "</div>"+
            "</li>"+
            "");
           }
           for(let i=0; i < data.listGroupSearch.length; i++){
             $("#btn_join_group"+i).hide();
             $("#btn_send_require"+i).hide();
             $("#btn_is_member"+i).hide();
           }
           for(let i=0; i < data.listGroupSearch.length; i++){
             console.log(data.listGroupSearch.status);
             if(data.listGroupSearch[i].status == 2){
               $("#btn_send_require"+i).hide();
               $("#btn_send_require"+i).hide();
               $("#btn_is_member"+i).show();
             }else if(data.listGroupSearch[i].status == 3){
               $("#btn_join_group"+i).hide();
               $("#btn_send_require"+i).show();
               $("#btn_is_member"+i).hide();
             }else{
               $("#btn_join_group"+i).show();
               $("#btn_send_require"+i).hide();
               $("#btn_is_member"+i).hide();
             }
           }
           for(let i=0; i < data.listGroupSearch.length; i++){
             $("#btn_join_group"+i).click(function(){
               $.post("/joinGroup",
               {
                 gid_join: $("#id_gr_search"+i).val()
               },
               function(data){
                 if(data == "success"){
                   $("#btn_join_group"+i).hide();
                   $("#btn_send_require"+i).show();
                 }
               });

             });
           }
           for(let user=0; user < data.listUserSearch.length; user++){
             $("#result ul").append(""+
             "<li> "+
             "<div class='col-sm-2 left-result' >"+
             "<div class='gimg-box'>"+
             "<img src='./images/user-icon1.png' alt='icon-group'>"+
             "</div>"+
             "</div>"+
             "<div class='col-sm-6 middle-result' >"+
             "<a href='#' style='text-decoration:none;'>"+
             data.listUserSearch[user].fullname+
             "</a>"+
             "</div>"+
             "<div class='col-sm-4 right-result'>"+
             "<button type='button' id='btn_add_fr"+user+"'>"+
             "<span style='font-size: 14px;' class='glyphicon glyphicon-plus'></span>"+
             "<span style='font-size: 14px;'>Thêm bạn</span>"+
             "</button>"+
             "<button type='button' id='btn_asked_friend"+user+"'>"+
             "<span style='font-size: 14px;' class='glyphicon glyphicon-plus'></span>"+
             "<span style='font-size: 14px;'>Đã yêu cầu</span>"+
             "</button>"+
             "<button type='button' id='btn_friend"+user+"'>"+
             "<span style='font-size: 14px;' class='glyphicon glyphicon-plus'></span>"+
             "<span style='font-size: 14px;'>Bạn bè</span>"+
             "</button>"+
             "<button type='button' id='btn_accept_fr"+user+"'>"+
             "<span style='font-size: 14px;' class='glyphicon glyphicon-plus'></span>"+
             "<span style='font-size: 14px;'>Chấp nhận</span>"+
             "</button>"+
             "</div>"+
             "</li>"+
             "");
           }
           for(let i = 0; i < data.listUserSearch.length; i++){
             $("#btn_add_fr"+i).hide();
             $("#btn_asked_friend"+i).hide();
             $("#btn_friend"+i).hide();
             $("#btn_accept_fr"+i).hide();
           }
           for(let i = 0; i < data.listUserSearch.length; i++){
             if(data.listUserSearch[i].status == 1){
               $("#btn_add_fr"+i).hide();
               $("#btn_asked_friend"+i).show();
               $("#btn_friend"+i).hide();
               $("#btn_accept_fr"+i).hide();
             }else if(data.listUserSearch[i].status == 2) {
               $("#btn_add_fr"+i).hide();
               $("#btn_asked_friend"+i).hide();
               $("#btn_friend"+i).show();
               $("#btn_accept_fr"+i).hide();
             }else if(data.listUserSearch[i].status == 3){
               $("#btn_add_fr"+i).hide();
               $("#btn_asked_friend"+i).hide();
               $("#btn_friend"+i).hide();
               $("#btn_accept_fr"+i).show();
             }else {
               $("#btn_add_fr"+i).show();
               $("#btn_asked_friend"+i).hide();
               $("#btn_friend"+i).hide();
               $("#btn_accept_fr"+i).hide();
             }
           }
           for(let i = 0; i < data.listUserSearch.length; i++){
             $("#btn_add_fr"+i).click(function(){
               $.post("/addFriend",
               {
                 id_friend: data.listUserSearch[i].id
               }, (data)=>{
                 if(data == "success"){
                   $("#btn_add_fr"+i).hide();
                   $("#btn_asked_friend"+i).show();
                   $("#btn_friend"+i).hide();
                   $("#btn_accept_fr"+i).hide();
                 }
               });
             });


           }
           for(let i = 0; i < data.listUserSearch.length; i++){
             $("#btn_accept_fr"+i).click(function(){

               $.post("/acceptFriend",
               {
                 id_update: data.listUserSearch[i].id_update
               }, (data)=>{
                 if(data == "success"){
                   $("#btn_add_fr"+i).hide();
                   $("#btn_asked_friend"+i).hide();
                   $("#btn_friend"+i).show();
                   $("#btn_accept_fr"+i).hide();
                 }
               })
             });
           }
        });
    }else{
      $("#val-search").attr('placeholder', 'Nhập từ khóa');
    }
  });
  $("#rm-search").click(function(){
    $("#result ul").html("");
    $("#box-search").hide();
  });
  $("#box-search").hide();
  $("#box_add_group").hide();

  $("#addNewGr").click(function(){
    $("#box_add_group").show();
  });
  $("#unCreGr").click(function(){
    $("#box_add_group").hide();
  });
  $("#sendAddNewGr").click(function(){

    if(validateEmpty($("#nameGR").val())){
      $("#nameGR").attr("placeholder", "Nhập tên nhóm");
      $.post("/addNewGroup", {
        name_group: $("#nameGR").val(),
        type_gr: $("#typeGroup").val()
      }, (data)=>{
        if(data == "success"){
          $("#box_add_group").hide();
          $("#nameGR").val("");
          location.reload();
        }
      });
    }else{
      $("#nameGR").attr("placeholder", "Bạn cần nhập tên nhóm");
    }
  });

  function validateEmpty(name) {
    if(name == "") return false;
    return true;
  }
});

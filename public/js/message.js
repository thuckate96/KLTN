var socket = io("http://localhost:3000");

$(document).ready(function(){

  $("#friend_box ul li ").click(function(){
    $(this).parent().find('li.active').removeClass('active');
    $(this).addClass('active');
  });


  $("#searchFriendChat").click(function(){
    if(validateEmpty($("#val_search_friend_chat").val())){
      $("#val_search_friend_chat").attr("placeholder", "Tìm kiếm bạn bè");
      $.post("/message/friendChat",
      {
        val_search: $("#val_search_friend_chat").val()
      }, (data)=>{
        console.log(data.listFriendChat.length)
      });
    }else{
      $("#val_search_friend_chat").attr("placeholder", "Bạn cần nhập từ khóa");
    }
  })

  for(let i = 0; i < $("#lenListFriendBoxChat").val(); i++){
    $("#show_friend_box_chat"+i).click(function(){
      console.log("Khong biet: "+$("#id_user_self").val());
      socket.emit("message-room", {
        myID: $("#id_user_self").val(),
        friendID: $("#friend_chat_id"+i).val()
      });
      $.post("/message/infoFriendBoxChat",
      {
        id_friend_chat: $("#friend_chat_id"+i).val()
      },(data)=>{
        $("#message_box").html(""+
        '<div class="name-box">'+
          '<div class="buff-name">'+

          '</div>'+
          '<div class="name-img">'+
            '<img src="./images/user.png" alt="user-icon">'+
          '</div>'+
          '<div style="margin-top: 10px;">'+
            '<a  href="#"><span id="parner_name">'+data.infoPartner.fullname+' </span></a>'+
          '</div>'+
        '</div>'+
        '<div id="chat_box" class="chat-box">'+

        '</div>'+
        '<div id="send_box" class="send-box">'+
          '<div class="buff-name"> </div>'+
          '<div class="">'+
            '<input type="hidden" id="id_myself" value="'+data.id_myself+'">'+
            '<input type="hidden" id="id_partner" value="'+data.infoPartner.id+'">'+
            '<textarea style="margin-top:5px; float:left;" class=""'+
             'placeholder="Nhập nội dung tin nhắn" id="msgChat" rows="2" cols="110"></textarea>'+
            '<button style="margin-top:10px; margin-left: 6px;"'+
                    'type="button" class="btn btn-primary" id="btnChat">'+
              'Gửi'+
            '</button>'+
          '</div>'+
        '</div>'+
        "");

        for(let mess = 0; mess < data.listMessage.length; mess++){
          console.log(data.listMessage[mess].id);
          if(data.listMessage[mess].id_user_a == data.infoPartner.id){
            $("#chat_box").append("" +
              '<div class="container darker">'+
               '<img src="./images/user.png" alt="Avatar" class="right" style="width:100%;">'+
               '<p>'+data.listMessage[mess].message+'</p>'+
               '<span class="time-left">11:01</span>'+
              '</div>'+
            "");
          }else{
            $("#chat_box").append("" +
              '<div class="container">'+
               '<img src="./images/userth.png" alt="Avatar" style="width:100%;">'+
               '<p>'+data.listMessage[mess].message+'</p>'+
               '<span class="time-right">11:00</span>'+
              '</div>'+
            "");
          }

        }


        $("#btnChat").click(function(){
          if(validateEmpty($("#msgChat").val())){
            $("#msgChat").attr("placeholder", "Nhập nội dung tin nhắn");
            socket.emit("MessageChat",
            {
              id_myself: $("#id_myself").val(),
              id_partner: $("#id_partner").val(),
              contentChat: $("#msgChat").val()
            });
            $("#msgChat").val("");
          }else{
            $("#msgChat").attr("placeholder", "Bạn cần nhập nội dung");
          }
        });

      });
    });
  }
  socket.on("ServerMessageChat", (data)=>{
    if(data.id_myself == $("#id_user_self").val()){
      $("#chat_box").append(""+
      '<div class="container">'+
       '<img src="./images/userth.png" alt="Avatar" style="width:100%;">'+
       '<p>'+data.contentChat+'</p>'+
       '<span class="time-right">11:00</span>'+
      '</div>'+
      "");
    }else{
      $("#chat_box").append("" +
        '<div class="container darker">'+
         '<img src="./images/user.png" alt="Avatar" class="right" style="width:100%;">'+
         '<p>'+data.contentChat+'</p>'+
         '<span class="time-left">11:01</span>'+
        '</div>'+
      "");
    }
    
  });
  console.log("no biet: "+$("#id_user_self").val());
  $("#message_box").html("<h2> Chat với bạn bè </h2>");
});

function validateEmpty(value) {
  if(value == "")
    return false;
  else return true;
}

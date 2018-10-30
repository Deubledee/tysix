var socket = io(),
  header1 = document.querySelector("#header1"),
  header2 = document.querySelector("#header2"),
  nickWrap = document.querySelector("#nickWrap"), //login wrapper
  nickname = document.querySelector("#nickname"), //login input
  contentWrap = document.querySelector("#contentWrap"), //chat wrapper
  chat = document.querySelector("#chat"), //chat output area
  users = document.querySelector("#users"), //users output area
  dropUers = document.querySelector("#dropUers"), //users output area
  message = document.querySelector("#message"), //message input
  scroller = document.getElementById("scroller"),
  scroll = document.getElementById("scroll"),
  roomLb = document.querySelector("#roomLb"),
  roomLb2 = document.querySelector("#roomLb2"), //
  roomIn = document.querySelector("#roomIn"),
  roomSelect = document.querySelector("#roomSelect"),
  activeRoom = document.querySelector("#activeRoom"),
  pageContW = document.querySelector("#page-content-wrapper"),
  windowErr = document.querySelector("#windowErr"),
  windowErrMsg = document.querySelector("#windowErrMsg"),
  errorHeader = document.querySelector("#errorHeader")
buttonArea = document.querySelector("#buttonArea"),
  fixbottomwrapper = document.querySelector("#fixbottomwrapper"),
  chatBox = document.querySelector('.chatBox')
// roomsArray = [],por usar
warning = "list-group-item list-group-item-warning",
  welcome = "list-group-item list-group-item-info";


/*
  window.onresize = function (e) {
      if (window.innerWidth < 168) {
          scroll.style.maxHeight = "122px";
          scroller.style.maxHeight = "300px"
          console.log(`< 820"${scroller.scrollHeight}px" ${scroll.style.maxHeight}`);

      } else {
          scroll.style.maxHeight = `${scroller.scrollHeight}px`;
          scroller.style.maxHeight = "600px"
          console.log(`> 820"${scroller.scrollHeight}px" ${scroll.style.maxHeight}`);
      }
  };

*/

//chatbox toggle event
chatBox.value = '0'
chatBox.addEventListener("click", function () {
  var style1 = { 'height': '350px', "transition": "height .5s cubic-bezier(0.4, 0, 1, 1)" },
    style2 = { "height": "0px", "transition": "height .5s ease-out" };
  toggle('chatBox', style1, style2);
  toggle('page-content-wrapper', style1, style2);
}, false)

//keyboard events
nickname.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 13) {
    start("public");
  }
});

message.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 13) {
    newMessage();
  }
});
/* roomIn.addEventListener("keydown", function (evt) {
     if (evt.keyCode === 13) {
         changeRoom();
     }
 });*/

//#page-content-wrapper events
pageContW.onclick = function (e) {
  if (document.getElementById("sidebar-wrapper").value) {
    toggleSidebar("sidebar-wrapper");
  }
}

//error handler
function errorhandler(data, msg, time) {
  if (data) {
    windowErr.style.display = "block";
    errorHeader.innerHTML = msg;
    windowErrMsg.innerHTML = `</strong> <b>${data} <b></strong>`;
    if (time) {
      setTimeout(function () {
        windowErr.style.display = "none";
        windowErrMsg.setAttribute("class", "");
        windowErrMsg.innerHTML = "";
      }, time)
    }
  } else {
    windowErr.style.display = "none";
    windowErrMsg.setAttribute("class", "");
    windowErrMsg.innerHTML = "";
  }
};

//start function
function start(room) {
  if (nickname.value && nickname.value != "<") {
    Room(room, function (valid) {
      if (valid) {
        nickWrap.style.display = "none";
        contentWrap.style.display = "inline-grid";
        header1.style.display = "none";
        header2.style.display = "block";
        //console.log(room);
      } else {
        errorhandler("O nickname já existe!! :( ", "warning")
      }
    });
  } else {
    errorhandler("Nickname inválido!! Não são permitidos os seguintes caractéres: '<'", "warning")
  }
  return
};

//adds rooms
function Room(room, callback) {
  if (nickname.value.match(/</)) {
    errorhandler("caractér ´<´ não aceite", "warning")
  }
  socket.emit("chatRoom", nickname.value, room, function (data) {
    if (data.room) {
      if (data.user) {
        if (activeRoom.value === undefined) {
          callback(true);
        };
        activeRoom.value = "";
        activeRoom.value = room;
        roomLb2.innerHTML = "";
        roomLb.style.display = "block"
        roomLb2.style.display = "block"
        buttonArea.style.display = "block"
        roomLb2.innerHTML = `<b>User:</b> ${nickname.value} <b>Room:</b> ${room}`;
        //  errorhandler(data.msg, "welcome", 2000);
      } else {
        callback(false);
        errorhandler(data.msg, "warning")
      }
    } else {
      errorhandler(data.msg, "warning")
    }
  });
};

//room button placer and setter
function detailButtons(room, newButton) {
  var child = document.querySelector(`#${room}`);
  if (child) {
    buttonArea.removeChild(child);
  };
  newButton.setAttribute("class", "list-group-item list-group-item-danger");
  if (room === activeRoom.value) {
    newButton.setAttribute("class", "list-group-item list-group-item-info");
  }
  newButton.setAttribute("onclick", `changeRoom('${room}')`);
  buttonArea.appendChild(newButton);
};

//room button maker
function newRoomButton(rooms) {
  rooms.map(function (item) {
    var newButton = document.createElement("button");
    newButton.setAttribute("onclick", `changeRoom('${item}')`);
    newButton.setAttribute("id", item);
    //ewButton.setAttribute("class", "list-group-item list-group-item-warning")
    newButton.innerHTML = item;
    detailButtons(item, newButton);
  });
};

////////////////******chat events******///////////

//WEBRTC signal
function sendMessage(user, mess) {
  // console.log('sending signal: ', mess, 'to ' + user);
  socket.emit("signal", user, activeRoom.value, mess, function (data) {
    errorhandler(data, "warning");
  });
}

socket.on('signal', function (signal, user) {
  // console.log('received signal:', user, signal);
  signalingMessageCallback(user, signal);
});

//gets room users
socket.on('loggedusers', function (usr, remoteUsr, rooms, room) {
  users.innerHTML = "";
  for (var i = 0; i < usr.length; i++) {
    if (usr[i] != nickname.value) {
      var div = document.createElement("div"),
        div1 = document.createElement("div"),
        div2 = document.createElement("div"),
        div3 = document.createElement("div"),
        button = document.createElement("button"),
        button2 = document.createElement("button");
      button.setAttribute("id", `${usr[i]}`);
      button.setAttribute("onclick", `setUser('${usr[i]}')`);
      button.innerHTML = usr[i];
      button2.setAttribute("onclick", `onGetUserMediaButtonClick('${usr[i]}')`);
      button2.innerHTML = 'Call';
      div1.appendChild(button);
      div1.appendChild(button2);
      div.appendChild(div1);
      // div2.innerHTML = usr + " / " + remoteUsr
      div.appendChild(div2);
      div3.innerHTML = "<span> Online </span> <br>";
      div.appendChild(div3);
      users.appendChild(div);
    }
  };
  newRoomButton(rooms);
});

//sends new message checks if private
function newMessage() {
  var user = users.value
  if (message.value.match(/</) || !message.value) {
    errorhandler("mensagem inválida!! caractére ´<´ não aceite", "warning")
  } else {
    if (!user.length) {
      socket.emit('send-message', activeRoom.value, message.value, function (data) {
        errorhandler(data, "warning");
      });
    } else {
      user.map(function (item) {
        socket.emit("private", item, activeRoom.value, message.value, function (data) {
          errorhandler(data, "warning");
        });
      })
      // }
      message.value = "";
    }
  };
}
//gets incomming messge
socket.on('message', function (data, user) {
  var div = ` <section class="col-xs-9">
                <h3 class="text-right"> ${user} @${data.room}</em></h3>
              <span><em>               
              </span>
                    <p class="text-right">
                    <span>
                    ${data.msg}
                    </span>
                    </p>
             </section> `,
    div2 = ` <section class="col-xs-9">
                <h3> ${user} @${data.room}</em></h3>
              <span><em>                
              </span>
                    <p>
                    <span>
                    ${data.msg}
                    </span>
                    </p>
             </section> `;

  if (user === nickname.value) {

    chat.innerHTML += div;
  } else {
    chat.innerHTML += div2;
  }
  pageContW.scrollBy({}, chat.innerHTML.length, 0)
});

socket.on("private-msg", function (data, user) {
  var style = "col-xs-8";
  var div = ` <section class="col-xs-9">
                <h3> PV/ ${user} @${data.room}</em></h3>
              <span><em>               
              </span>
              <p>
              <span>
              ${data.msg}
            </span>
             </p>
             </section>
     </div> `;
  if (data.sender) {
    user = data.nick;
    div = ` <section class="col-xs-9">
                <h3 class="text-right"> PV/ ${user} @${data.room}</em></h3>
              <span><em>               
              </span>
              <p class="text-right">
              <span>
              ${data.msg}
            </span>
             </p>
             </section> `;
  }
  chat.innerHTML += div;
  pageContW.scrollTop = pageContW.scrollHeight;
});

//room swapper
function changeRoom(room) {
  socket.emit("leaveRoom", room, function (valid, msg) {
    if (valid) {
      Room(room);
    } else {
      errorhandler(msg, "warning")
    }
  });
};

////////////////////////////*************************************** */

function downloaYouTubeStream() {
  var element = document.querySelector('video')
  var options = { mimeType: 'video/mp4;codecs=mp3' }, videoRecorder
  element.play()
  let stream = element.captureStream()
  videoRecorder = new MediaRecorder(stream, options);
  window.recordedVideo = []
  videoRecorder.start(25)
  videoRecorder.ondataavailable = function (event) {
    console.log('handling data to record', event.data)
    if (event.data && event.data.size > 0) {
      window.recordedVideo.push(event.data);
    }
  };
  element.onended = function () {
    videoRecorder.onstop = function () {
      var blob = new Blob(window.recordedVideo, { type: 'video/mp4' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      var title = document.querySelector('.title')
      // a.download = Math.floor(Math.random(1) * 1000) + 'test.webm';
      a.download = title.firstElementChild.innerText.trim().split(' ').join('').split('-').join('_') + '.webm'
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    }
    videoRecorder.stop()
  };
}
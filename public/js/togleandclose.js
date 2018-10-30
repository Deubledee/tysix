'use strict';

function toggle(id, style1, style2) {
  if (document.getElementById(`${id}`).value == 0) {
    for (let style in style1) {
      document.getElementById(id).style[style] = style1[style];
      document.getElementById(id).value = 1;
    }

  } else {
    for (let style in style2) {
      document.getElementById(id).style[style] = style2[style];
      document.getElementById(id).value = 0;
    }
  }
};


function toggleSidebar(id) {
  var style1 = { "width": "300px", "transition": "width .5s cubic-bezier(0.4, 0, 1, 1)" },
    style2 = { "width": "0px", "transition": "width .5s ease-out" };
  toggle(id, style1, style2);
}

function toggleSidebar2(id) {
  var style1 = { "width": "95px", "transition": "width .5s cubic-bezier(0.4, 0, 1, 1)" },
    style2 = { "width": "0px", "transition": "width .5s ease-out" };
  toggle(id, style1, style2);
}



var d = document.querySelector("#users");
d.value = [];

function setUser(user) {
  var dUser = document.querySelector(`#${user}`)
  if (d.value[d.value.indexOf(user)]) {
    dUser.setAttribute("class", "btn btn-sm btn-warning")
    d.value.pop(user);
  } else {
    dUser.setAttribute("class", "btn btn-sm btn-danger")
    d.value.push(user);
  }
}

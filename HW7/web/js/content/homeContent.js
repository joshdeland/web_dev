"use strict";
function homeContent() {
  // ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
  //
  // NetBeans menu option "Source - Format" will not work with the text inside of a
  // String, so you have to do this indentation manually with the editor.

  var content = `<h4>Find your perfect camera.</h4> Looking to upgrade your camera gear? Searching for an obscure photography accessory? 
Explore our vast user-run used camera market! If you have some gear of your own, sell it to interested buyers.

<img src="pics/camera_wide.jpg" alt="Camera">

`;
  var ele = document.createElement("div");
  ele.innerHTML = content;
  return ele;
}

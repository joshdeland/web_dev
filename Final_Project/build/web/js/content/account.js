var account = {};

(function () {
  account.logon = function () {
    var logOnDiv = document.createElement("div");
    logOnDiv.classList.add("logon");

    var logOnTitle = document.createElement("h2");
    logOnTitle.innerHTML = `Log Into Your Account`;
    logOnDiv.appendChild(logOnTitle);

    var userEmailSpan = document.createElement("span");
    userEmailSpan.innerHTML = "Enter your email: ";
    logOnDiv.appendChild(userEmailSpan);

    var userEmailInput = document.createElement("input");
    logOnDiv.appendChild(userEmailInput);

    var userPassSpan = document.createElement("span");
    userPassSpan.innerHTML = "Enter your password: ";
    logOnDiv.appendChild(userPassSpan);

    var userPassInput = document.createElement("input");
    userPassInput.setAttribute("type", "password"); // so it shows dots not characters
    logOnDiv.appendChild(userPassInput);

    var logOnButton = document.createElement("button");
    logOnButton.innerHTML = "Log In";
    logOnDiv.appendChild(logOnButton);

    var msgDiv = document.createElement("div");
    logOnDiv.appendChild(msgDiv);

    logOnButton.onclick = function () {
      // You have to encodeURI user input before putting into a URL for an AJAX call.
      // Otherwise, your URL may be refused (for security reasons) by the web server.
      var url =
        "webAPIs/logonAPI.jsp?email=" +
        userEmailInput.value +
        "&password=" +
        userPassInput.value;

      console.log("onclick function will make AJAX call with url: " + url);
      ajax(url, processLogon, msgDiv);

      function processLogon(obj) {
        msgDiv.innerHTML = buildProfile(obj);
      }
    }; // onclick function

    return logOnDiv;
  };

  function buildProfile(obj) {
    var msg = "";
    console.log(
      "Successfully called the find API. Next line shows the returned object."
    );
    console.log(obj);
    if (obj.errorMsg.length > 0) {
      msg += "<strong>Error: " + obj.errorMsg + "</strong>";
    } else {
      msg += "<strong>Welcome Web User " + obj.webUserId + "</strong>";
      msg += "<br/> Birthday: " + obj.birthday;
      msg += "<br/> Membership Fee: " + obj.membershipFee;
      msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
      msg += "<p> <img src ='" + obj.image + "'></p>";
    }
    return msg;
  }
  account.getProfile = function () {
    var profileDiv = document.createElement("div");
    profileDiv.classList.add("logon");

    var profileTitle = document.createElement("h2");
    profileTitle.innerHTML = `Your Profile`;
    profileDiv.appendChild(profileTitle);

    var url = "webAPIs/getProfileAPI.jsp";
    ajax(url, processProfile, profileDiv);

    function processProfile(obj) {
      profileDiv.innerHTML = buildProfile(obj);
    }
    return profileDiv;
  };
  account.logoff = function () {
    // create a div, invoke logoff API, fill div with “logged off” message, return the div.
    var logOffDiv = document.createElement("div");
    logOffDiv.classList.add("logon");

    var url = "webAPIs/logoffAPI.jsp";
    ajax(url, processLogOff, logOffDiv);

    function processLogOff(obj) {
      logOffDiv.innerHTML = buildProfile(obj);
    }
    return logOffDiv;
  };
})();

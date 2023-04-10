"use strict";

function userContent() {
  var ele = document.createElement("div");

  ele.classList.add("clickSort");

  ajax("webAPIs/listUsersAPI.jsp", processUserData, ele);

  function processUserData(userList) {

    if (userList["dbError"] == "") {
      delete userList["dbError"];
    }

    else {
      var errorMsg = document.createElement("h2");
      errorMsg.innerHTML = `${userList["dbError"]}`;
      ele.appendChild(errorMsg);
    }

    userList = userList["webUserList"];
    // callback function

    // now userList has been populated with data from the AJAX call to file users.json
    console.log(
      "user list (in processUserData) on next line - open triangle to see data"
    );
    console.log(userList);

    // Create new object list where all properties are <td> elements
    var newUserList = [];
    for (var i = 0; i < userList.length; i++) {
      newUserList[i] = {};
      newUserList[i].User_Email = SortableTableUtils.makeText(
        userList[i].userEmail
      );
      newUserList[i].Image = SortableTableUtils.makeImage(
        userList[i].image,
        "4rem"
      );
      newUserList[i].Birthday = SortableTableUtils.makeDate(
        userList[i].birthday
      );
    }

    // MakeTableBetter expects all properties to be <td> elements.
    var userTable = MakeClickSortTable(
      "Users",
      newUserList,
      "User_Email",
      "icons/sortUpDown16.png"
    );
    //ele.appendChild(MakeFilterTable(newUserList));

     ele.appendChild(userTable);
    //inject(myReport1, "listHere");
  } // processUserData*/

  return ele;
}

"use strict";

function userContent() {
  var ele = document.createElement("div");

  ele.classList.add("clickSort");

  ajax("webAPIs/listUsersAPI.jsp", processUserData, ele);

  function processUserData(userList) {
    if (userList["dbError"] == "") {
      delete userList["dbError"];
    } else {
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
      newUserList[i].User_ID = SortableTableUtils.makeNumber(
        userList[i].webUserId,
        false
      );
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
      newUserList[i].Update = SortableTableUtils.makeIconLink(
        "icons/update.png", // iconFile
        "width:1rem", // iconStyle
        "#/userUpdate/" + userList[i].webUserId
      ); // href

      newUserList[i].Delete = SortableTableUtils.makeImage("icons/delete.png", '1rem');

        // Remember newObj.Delete is a <td> dom element that's going to be part of the 
        // HTML table that's being built. You can add an onclick to it because it's a DOM element.
        // The only reason you can rely upon origObj to be the right webUser object 
        // is because you the code to this function (makeNewObj) instead of leaving it inside 
        // the for loop where makeNewObj was called.
        newUserList[i].Delete.onclick = (function (user) {
          return function () {
            console.log("user to delete: " + user);
            deleteUser(user, this);
          };
        })(userList[i]);
    }

    // MakeTableBetter expects all properties to be <td> elements.
    var userTable = MakeClickSortTable({
      title: "Users",
      objList: newUserList,
      firstCol: 2,
      sortOrderPropName: "User_Email",
      sortIcon: "icons/sortUpDown16.png",
    });
    //ele.appendChild(MakeFilterTable(newUserList));

    ele.appendChild(userTable);
    //inject(myReport1, "listHere");
  } // processUserData*/

  function deleteUser(origObj, clickedTd) {

    var userId = origObj.webUserId;
    console.log("To delete user " + userId + "?");

    var messageDOM = document.createElement("div");
    ele.appendChild(messageDOM);
    messageDOM.classList.add("message");

    // Since you have the whole webUser object passed in (origObj), give a better 
    // indication of the webUser that you are asking about (to delete? deleted?) - better
    // than just an id. 

    if (confirm("Do you really want to delete user" + origObj.userEmail + "? ")) {


      // parameter properties needed for ajax call: url, successFn, and errorId
      ajax("webAPIs/user/delete.jsp?deleteId=" + userId, APISuccess, messageDOM);

      function APISuccess(obj) { // function is local to callDeleteAPI
          console.log("successful ajax call");

          // var obj = JSON.parse(httpReq.responseText);  // already done by ajax2...

          // Empty string means sucessful delete. The HTML coder gets to decide how to 
          // deliver the good news.
          if (obj.errorMsg.length === 0) {
              var msg = "Record " + userId + " successfully deleted. ";
              console.log(msg);
              messageDOM.innerHTML = msg;
          } else {
              console.log("Delete Web API got this error: "+ obj.errorMsg);
              messageDOM.innerHTML = "Web API successfully called, but " +
                      "got this error from the Web API: <br/><br/>" + obj.errorMsg;
          }
      }

        // get the row of the cell that was clicked 
        var dataRow = clickedTd.parentNode;
        var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
        var dataTable = dataRow.parentNode;
        dataTable.deleteRow(rowIndex);
        
        // Let the user know if the record was deleted or not. 
        // If the user to be deleted has records pointing to it, then the database 
        // should provide a user friendly message like "you cannot delete this user 
        // because he or she has posts". 
        
        // Alert the user to let them know if the delete was successful or not. 
        // Better yet, use the modalFw to alert them (prettier). OR give them a snackBar 
        // (nicer interface -- disappears even if they do not click close). 

    }
} // deleteUser

  return ele;
}

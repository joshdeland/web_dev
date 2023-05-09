"use strict"; // new insert soln -> update sp23

function userInsertOrUpdate(webUserId) {
  var component = document.createElement("div");

  var isInsert = false; // isInsert false means update...
  if (webUserId === undefined) {
    isInsert = true;
  }

  // Invoke an API to get the info needed to create the role pick list.
  // Although I could have gotten the roles just once (at initial page load time),
  // I wanted to show how you could get fresh list of user roles from the DB
  // with each user insert/update since you'll need to do something like this for
  // insert/update "other" (get a fresh copy of users for the webuser FK from "other").
  ajax("webAPIs/role/getAll.jsp", processRoles, component);
  function processRoles(obj) {
    // obj is the list of roles returned by the getRolesAPI.jsp
    if (obj.dbError.length > 0) {
      component.innerHTML +=
        "Error: Cannot Create Role Pick List from webAPIs/role/getAll" +
        obj.dbError;
    } else {
      var fields = [
        {
          fieldName: "webUserId",
          prompt: "User Id",
          disabled: true,
        },
        {
          fieldName: "userEmail",
          //prompt: "Email"  // if you forget to add the prompt, it uses the field name as prompt
        },
        {
          fieldName: "userPassword",
          prompt: "Password",
          password: true,
        },
        {
          fieldName: "userPassword2",
          prompt: "Retype Password",
          password: true,
        },
        {
          fieldName: "image",
          prompt: "Image URL",
        },
        {
          fieldName: "birthday",
          prompt: "Birthday",
        },
        {
          fieldName: "membershipFee",
          prompt: "Membership Fee",
        },
        {
          fieldName: "userRoleId",
          prompt: "User Role",
          selectTag: true,
          list: obj.roleList, // object list holds role names/ids (from getRolesAPI) - to build select tag
          idProp: "userRoleId", // field name (within that list) that holds ids (select tag values)
          displayProp: "userRoleType", // field name (within that list) that holds select tag display values
        },
      ];

      // call reusable function to make an edit area component
      var userEditArea = MakeEditArea({
        areaTitle: isInsert ? "New Web User" : "Update Web User",
        fieldDefns: fields,
      });
      component.appendChild(userEditArea);

      if (!isInsert) {
        // if update, prefill the text boxes with values from the DB.

        // get the web user record with the given webUserId
        ajax(
          "webAPIs/user/getById.jsp?userId=" + webUserId,
          gotRecordById,
          userEditArea.formMsg
        );

        // webUserObj is the output of getUserByIdAPI.jsp
        function gotRecordById(webUserObj) {
          userEditArea.writeDbValuesToUI(webUserObj);
        }
      }

      userEditArea.button.onclick = function () {
        // SAVE

        // get inputObj which contains all user input values.
        var userInputObj = userEditArea.getDataFromUI();

        // convert userInputObj to JSON and URL encode (e.g., turns space to %20),
        // We must URL encode so that the server does not reject URL for security reasons.
        var urlParams = encodeURIComponent(JSON.stringify(userInputObj));
        console.log("URLParams for save are: " + urlParams);

        var url = isInsert ? "insert.jsp" : "update.jsp";

        ajax(
          "webAPIs/user/" + url + "?jsonData=" + urlParams,
          reportOutcome,
          userEditArea.formMsg
        );

        function reportOutcome(obj) {
          // obj is the error message object (passed back from the Insert API).
          // obj (conveniently) has its fields named exactly the same as the input data was named.

          console.log(
            "insert or update API response (error message object) on next line"
          );
          console.log(obj);

          // write all the error messages to the UI (into the third column for each row).
          userEditArea.writeErrorObjToUI(obj);
          if (obj.errorMsg.length === 0) {
            // success
            userEditArea.formMsg.innerHTML = isInsert
              ? "Record inserted."
              : "Record updated.";
          } else {
            userEditArea.formMsg.innerHTML = obj.errorMsg;
          }
        }
      };
    }
  } // processRoles (ajax call back function)

  return component;
} // userInsertOrUpdate

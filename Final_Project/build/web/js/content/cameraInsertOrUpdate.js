"use strict"; // new insert soln -> update sp23

function cameraInsertOrUpdate(userCameraId) {
  var component = document.createElement("div");

  var isInsert = false; // isInsert false means update...
  if (userCameraId === undefined) {
    isInsert = true;
  }

  // Invoke an API to get the info needed to create the role pick list.
  // Although I could have gotten the roles just once (at initial page load time),
  // I wanted to show how you could get fresh list of user roles from the DB
  // with each user insert/update since you'll need to do something like this for
  // insert/update "other" (get a fresh copy of users for the webuser FK from "other").
  ajax("webAPIs/user/getAll.jsp", processUsers, component);
  function processUsers(obj) {
    // obj is the list of roles returned by the getRolesAPI.jsp
    if (obj.dbError.length > 0) {
      component.innerHTML +=
        "Error: Cannot Create Web User Pick List from webAPIs/users/getAll" +
        obj.dbError;
    } else {
      var fields = [
        {
          fieldName: "userCameraId",
          prompt: "Camera Id",
          disabled: true,
        },
        {
          fieldName: "brand",
          prompt: "Brand",
          //prompt: "Email"  // if you forget to add the prompt, it uses the field name as prompt
        },
        {
          fieldName: "model",
          prompt: "Model",
        },
        {
          fieldName: "price",
          prompt: "Price",
        },
        {
          fieldName: "camera_type",
          prompt: "Camera Type",
        },
        {
          fieldName: "camera_condition",
          prompt: "Camera Condition",
        },
        {
          fieldName: "megapixels",
          prompt: "Megapixel Count",
        },
        {
          fieldName: "year_made",
          prompt: "Year Made",
        },
        {
          fieldName: "primary_image",
          prompt: "Primary Image",
        },
        {
          fieldName: "description",
          prompt: "Description",
        },
        {
          fieldName: "webUserId",
          prompt: "User Email",
          selectTag: true,
          list: obj.webUserList, // object list holds role names/ids (from getRolesAPI) - to build select tag
          idProp: "webUserId", // field name (within that list) that holds ids (select tag values)
          displayProp: "userEmail", // field name (within that list) that holds select tag display values
        },
      ];

      // call reusable function to make an edit area component
      var cameraEditArea = MakeEditArea({
        areaTitle: isInsert ? "New Camera" : "Update Camera",
        fieldDefns: fields,
      });
      component.appendChild(cameraEditArea);

      if (!isInsert) {
        // if update, prefill the text boxes with values from the DB.

        // get the web user record with the given webUserId
        ajax(
          "webAPIs/camera/getById.jsp?userCameraId=" + userCameraId,
          gotRecordById,
          cameraEditArea.formMsg
        );

        // webUserObj is the output of getUserByIdAPI.jsp
        function gotRecordById(cameraObj) {
          cameraEditArea.writeDbValuesToUI(cameraObj);
        }
      }

      cameraEditArea.button.onclick = function () {
        // SAVE

        // get inputObj which contains all user input values.
        var cameraInputObj = cameraEditArea.getDataFromUI();

        // convert userInputObj to JSON and URL encode (e.g., turns space to %20),
        // We must URL encode so that the server does not reject URL for security reasons.
        var urlParams = encodeURIComponent(JSON.stringify(cameraInputObj));
        console.log("URLParams for save are: " + urlParams);

        var url = isInsert ? "insert.jsp" : "update.jsp";

        ajax(
          "webAPIs/camera/" + url + "?jsonData=" + urlParams,
          reportOutcome,
          cameraEditArea.formMsg
        );

        function reportOutcome(obj) {
          // obj is the error message object (passed back from the Insert API).
          // obj (conveniently) has its fields named exactly the same as the input data was named.

          console.log(
            "insert or update API response (error message object) on next line"
          );
          console.log(obj);

          // write all the error messages to the UI (into the third column for each row).
          cameraEditArea.writeErrorObjToUI(obj);
          if (obj.errorMsg.length === 0) {
            // success
            cameraEditArea.formMsg.innerHTML = isInsert
              ? "Record inserted."
              : "Record updated.";
          } else {
            cameraEditArea.formMsg.innerHTML = obj.errorMsg;
          }
        }
      };
    }
  } // processRoles (ajax call back function)

  return component;
} // userInsertOrUpdate

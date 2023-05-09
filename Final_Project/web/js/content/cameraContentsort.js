"use strict";

function cameraContentsort() {
  var ele = document.createElement("div");

  ele.classList.add("clickSort");

  ajax("webAPIs/listCamerasAPI.jsp", processCameraData, ele);

  function processCameraData(cameraList) {
    if (cameraList["dbError"] == "") {
      delete cameraList["dbError"];
    } else {
      var errorMsg = document.createElement("h2");
      errorMsg.innerHTML = `${cameraList["dbError"]}`;
      ele.appendChild(errorMsg);
    }

    cameraList = cameraList["cameraList"];
    // callback function

    // now userList has been populated with data from the AJAX call to file users.json
    console.log(
      "camera list (in processUserData) on next line - open triangle to see data"
    );
    console.log(cameraList);

    // Create new object list where all properties are <td> elements
    var newCameraList = [];
    for (var i = 0; i < cameraList.length; i++) {
      newCameraList[i] = {};
      newCameraList[i].Name = SortableTableUtils.makeText(
        cameraList[i].brand + " " + cameraList[i].model
      );
      newCameraList[i].Image = SortableTableUtils.makeImage(
        cameraList[i].primary_image,
        "4rem"
      );
      newCameraList[i].Price = SortableTableUtils.makeNumber(
        cameraList[i].price,
        true
      );
      newCameraList[i].User_Email = SortableTableUtils.makeText(
        cameraList[i].userEmail
      );
      newCameraList[i].Update = SortableTableUtils.makeIconLink(
        "icons/update.png", // iconFile
        "width:1rem", // iconStyle
        "#/cameraUpdate/" + cameraList[i].userCameraId
      );

      newCameraList[i].Delete = SortableTableUtils.makeImage("icons/delete.png", '1rem');

        // Remember newObj.Delete is a <td> dom element that's going to be part of the 
        // HTML table that's being built. You can add an onclick to it because it's a DOM element.
        // The only reason you can rely upon origObj to be the right webUser object 
        // is because you the code to this function (makeNewObj) instead of leaving it inside 
        // the for loop where makeNewObj was called.
        newCameraList[i].Delete.onclick = (function (camera) {
          return function () {
            console.log("camera to delete: " + camera);
            deleteCamera(camera, this);
          };
        })(cameraList[i]);
    }

    // MakeTableBetter expects all properties to be <td> elements.
    var userTable = MakeClickSortTable({
      title: "Cameras",
      objList: newCameraList,
      firstCol: 2,
      sortOrderPropName: "Name",
      sortIcon: "icons/sortUpDown16.png",
    });
    ele.appendChild(userTable);
    //inject(myReport1, "listHere");
  } // processUserData*/


  function deleteCamera(origObj, clickedTd) {

    var cameraId = origObj.userCameraId;
    console.log("To delete user " + cameraId + "?");

    var messageDOM = document.createElement("div");
    ele.appendChild(messageDOM);
    messageDOM.classList.add("message");

    // Since you have the whole webUser object passed in (origObj), give a better 
    // indication of the webUser that you are asking about (to delete? deleted?) - better
    // than just an id. 

    if (confirm("Do you really want to delete camera " + origObj.brand + " " + origObj.model + "? ")) {


      // parameter properties needed for ajax call: url, successFn, and errorId
      ajax("webAPIs/camera/delete.jsp?deleteId=" + cameraId, APISuccess, messageDOM);

      function APISuccess(obj) { // function is local to callDeleteAPI
          console.log("successful ajax call");

          // var obj = JSON.parse(httpReq.responseText);  // already done by ajax2...

          // Empty string means sucessful delete. The HTML coder gets to decide how to 
          // deliver the good news.
          if (obj.errorMsg.length === 0) {
              var msg = "Record " + cameraId + " successfully deleted. ";
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
} // deleteCamera

  return ele;
}

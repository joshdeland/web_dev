"use strict";

function cameraContentsort() {
  var ele = document.createElement("div");

  ele.classList.add("clickSort");

  ajax("webAPIs/listCamerasAPI.jsp", processCameraData, ele);

  function processCameraData(cameraList) {

    if (cameraList["dbError"] == "") {
      delete cameraList["dbError"];
    }

    else {
      var errorMsg = document.createElement("h2");
      errorMsg.innerHTML = `${cameraList["dbError"]}`;
      ele.appendChild(errorMsg);
    }

    cameraList = cameraList["cameraList"];
    // callback function

    // now userList has been populated with data from the AJAX call to file users.json
    console.log(
      "user list (in processUserData) on next line - open triangle to see data"
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
        cameraList[i].price, true
      );
    }

    // MakeTableBetter expects all properties to be <td> elements.
    var userTable = MakeClickSortTable(
      "Cameras",
      newCameraList,
      "Name",
      "icons/sortUpDown16.png"
    );
    ele.appendChild(userTable);
    //inject(myReport1, "listHere");
  } // processUserData*/

  return ele;
}

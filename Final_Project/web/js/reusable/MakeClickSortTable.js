// This version of MakeTable expects objList to hold an array of objects
// in which all the properties are already "td" tags which may contain images,
// alignment, etc.
function MakeClickSortTable({
  title = "Table",
  objList = {},
  firstCol = 2,
  initialSortCol = "",
  sortIcon = "icons/sortUpDown16.png",
}) {
  // This function sorts the array of objects in "list" by object property "byProperty".
  // Think of list as an I/O parameter (gets changed by the fn).

  function jsSort(objList, byProperty) {
    console.log("Property" + byProperty);

    var currentHeader = document.getElementById(byProperty);

    var obj = objList[0];
    if (!obj[byProperty]) {
      var message =
        "objList does not have property " +
        byProperty +
        " -- cannot sort by that property.";
      throw message;
      return; // early return -- dont try to sort.
    }

    if (!obj[byProperty].sortOrder || obj[byProperty].sortOrder === null) {
      var message =
        "Cannot sort objList by property " +
        byProperty +
        " because this property never had it's sortOrder set (by a method in SortableTableUtils.js).";
      throw message;
      return; // early return -- dont try to sort.
    }

    // q and z are just elements in the array and the function you write below has to return
    // negative or positive or zero - depending on the comparison of q and z.

    objList.sort(function (q, z) {
      // in line (and anonymous) def'n of fn to compare list elements.

      // q and z are objects to be compared. Their 'byProperty' property is the <td> by which we want to
      // sort. Each <td> has a sortOrder property that was set (according to data type) by a method
      // from SortableTableUtils. The sortOrder is a number or date or string (depends on type of column).

      var qVal = q[byProperty].sortOrder;
      var zVal = z[byProperty].sortOrder;

      // Set a comparison variable to 0 by default
      var c = 0;

      if (currentHeader) {
        if (currentHeader.dataset.sorted === "forward") {
          // if values are greater than the last, sort forward
          c = qVal > zVal ? 1 : qVal < zVal ? -1 : 0;
          // if values are smaller than the last, sort backward
        } else if (currentHeader.dataset.sorted === "reverse") {
          c = qVal > zVal ? -1 : qVal < zVal ? 1 : 0;
        }
      } else {
        c = qVal > zVal ? 1 : qVal < zVal ? -1 : 0;
      }

      console.log("comparing " + qVal + " to " + zVal + " is " + c);
      return c;
    });
    if (currentHeader) {
      // Switch between sorting direction depending on what the current direction is
      if (currentHeader.dataset.sorted === "forward") {
        currentHeader.dataset.sorted = "reverse";
      } else if (currentHeader.dataset.sorted === "reverse") {
        currentHeader.dataset.sorted = "forward";
      }
    }
  } // jsSort

  // Return true if any property of obj contains searchKey. Otherwise, return false.
  function isToShow(obj, searchKey) {
    // show the object if searchKey is empty
    if (!searchKey || searchKey.length === 0) {
      return true;
    }

    // convert search key to upper case (will convert values also to upper case before comparing).
    var searchKeyUpper = searchKey.toUpperCase();

    for (var prop in obj) {
      // Do not try to find a match for Table cells that hold images.
      if (prop[0] !== "_") {
        // pull out the innerHTML because all properties of obj are actually <td> tags, not just text.
        var propVal = obj[prop].innerHTML; // associative array, using property name as if index.
        var propValUpper = propVal.toUpperCase(); // convert to upper case to match searchKey.

        console.log("checking if " + searchKeyUpper + " is in " + propValUpper);

        if (propValUpper.includes(searchKeyUpper)) {
          console.log("Yes it is inside");
          return true;
        }
      } // excluding image tds
    }
    console.log("no it is not inside");
    return false;
  } // isToShow

  function MakeHeaderRow(obj, firstCol) {
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = `
            <th class="identHeaderC mobCell">
            </th>
            <th class="infoHeaderC mobCell">
            </th>
        `;

    // These first two <th>s will be visible only in narrow windows. They will hold
    // the property names vertically (part in the 1st, the rest in the 2nd).
    var identHeader = headerRow.getElementsByClassName("identHeaderC")[0];
    var infoHeader = headerRow.getElementsByClassName("infoHeaderC")[0];

    var j = 0;
    // The rest of these headers will show only in desktop
    // iterate through the properties in the first object in the object list.

    for (let propName in obj) {
      let headerNameContainerNarrow = document.createElement("p");
      headerNameContainerNarrow.id = propName;

      if (headerNameContainerNarrow.id === sortOrderPropName) {
        headerNameContainerNarrow.dataset.sorted = "reverse";
      } else {
        headerNameContainerNarrow.dataset.sorted = "forward";
      }

      // Underscores in the property name will be replaced by space in the column headings.
      narrowHeader = propName.replace("_", " ");
      headerNameContainerNarrow.innerHTML = narrowHeader;

      // If the <td> for this property has a null sortOrder property, then do not add sort icon,
      // do not add onclick to sort the table by this column.
      if (obj[propName].sortOrder !== null) {
        narrowHeaderText = `<img src='${sortIcon}'/> ${narrowHeader}`;
        headerNameContainerNarrow.innerHTML = narrowHeaderText;
        headerNameContainerNarrow.onclick = function () {
          addTableBody(newTable, objList, propName);
        };
      }

      // Each property name is added to one of two narrow header cells.

      if (j < firstCol) {
        identHeader.appendChild(headerNameContainerNarrow);
      } else {
        infoHeader.appendChild(headerNameContainerNarrow);
      }

      j++;

      // each property name is also added to a desktop header cell.
      let headingCell = document.createElement("th");
      //            headingCell.setAttribute('data-sorted', "forward");
      headingCell.id = propName;
      console.log("id:" + headingCell.id);
      if (headingCell.id === sortOrderPropName) {
        headingCell.dataset.sorted = "reverse";
      } else {
        headingCell.dataset.sorted = "forward";
      }
      // underscores in the property name will be replaced by space in the column headings.
      headingText = propName.replace("_", " ");

      // if the <td> for this property has a null sortOrder property, then do not add sort icon,
      // do not add onclick to sort the table by this column.
      if (obj[propName].sortOrder !== null) {
        headingText = `<img src='${sortIcon}'/> ${headingText}`;
        headingCell.onclick = function () {
          console.log("WILL SORT ON " + propName);
          console.log("Attribute:" + headingCell.dataset.sorted);
          addTableBody(newTable, objList, propName);
        };
      }
      headingCell.innerHTML = headingText;
      headerRow.appendChild(headingCell);
    }
    return headerRow;
  } // MakeHeaderRow

  // Create a <tr> then add all the (<td>) properties of obj to that <tr>
  function MakeDataRow(obj, firstCol) {
    var dataRow = document.createElement("tr");
    // For responsive design, add the first columns that will show values
    // (vertically) only in mobile.
    dataRow.innerHTML = `
          <td class="mobCell identColC">
          </td>
          <td class="mobCell infoColC">
          </td>
        `;
    var identCol = dataRow.getElementsByClassName("identColC")[0];
    var infoCol = dataRow.getElementsByClassName("infoColC")[0];
    // The rest of the <td>s will show horizontally, only in desktop.

    var i = 0;
    for (var prop in obj) {
      // The innerHTML of each <td> (property of obj) gets added to one of
      // the first two mobile columns (added vertically with new lines between)
      if (i < 1) {
        identCol.innerHTML += obj[prop].innerHTML;
      } else if (i < firstCol) {
        identCol.innerHTML += "<br/>" + obj[prop].innerHTML;
      } else if (i === firstCol) {
        infoCol.innerHTML += obj[prop].innerHTML;
      } else {
        infoCol.innerHTML += "<br/>" + obj[prop].innerHTML;
      }
      i++;
      // These same <td>s (of obj) will be added to desktop columns
      // and will show horizontally.
      dataRow.appendChild(obj[prop]);
      // style this cell to show only in desktop.
      obj[prop].classList.add("deskCell");
      
    }
    return dataRow;
  } // MakeDataRow

  // Remove the tbody from 'table' (if there is one). Sort 'list' by 'sortOrderPropName'.
  // Then add a new tbody to table, inserting rows from the sorted list.
  function addTableBody(table, list, sortOrderPropName, filterValue) {
    // remove old tbody element if there is one (else you'll get the new sorted rows
    // added to end of what's there).
    var oldBody = table.getElementsByTagName("tbody");
    if (oldBody[0]) {
      console.log("ready to remove oldBody");
      table.removeChild(oldBody[0]);
    }

    jsSort(list, sortOrderPropName);

    // Add one row (to HTML table) per element in the array.
    // Each array element has a list of properties that will become
    // td elements (Table Data, a cell) in the HTML table.
    var tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    // To the tbody, add one row (to HTML table) per object of the object list.
    for (var obj of objList) {
      if (isToShow(obj, filterValue)) {
        tableBody.appendChild(MakeDataRow(obj, firstCol));
      }
    }
  } // addTableBody

  function getFirstProp(obj) {
    for (var prop in obj) {
      return prop;
    }
  }

  // ***************** Entry Point ************************
  console.log("objList on next line");
  console.log(objList);

  // Create a container to hold the HTML table
  var container = document.createElement("div");
  var header = document.createElement("h1");
  container.appendChild(header);
  header.innerHTML = title;
  container.classList.add("clickSort");

  // create an area (between title and html table) where the user
  // can enter their search criteria.
  var searchDiv = document.createElement("div");
  container.appendChild(searchDiv);
  searchDiv.innerHTML = "Filter by: ";

  // Create a filter text box for user input and append it.
  var searchInput = document.createElement("input");
  searchDiv.appendChild(searchInput);

  if (objList === undefined || objList[0] === undefined) {
    var msg =
      "Error: MakeClickSortTable requires parameter property 'objList', an array with >=1 object.";
    throw msg;
    return container; // The throw above will halt execution, but just in case that gets removed...
  }

  var sortOrderPropName = initialSortCol || getFirstProp(objList[0]);

  var newTable = document.createElement("table");
  container.appendChild(newTable);

  // use the first object's property names as column headings.
  newTable.appendChild(MakeHeaderRow(objList[0], firstCol));

  addTableBody(newTable, objList, sortOrderPropName, "");

  searchInput.onkeyup = function () {
    console.log("search filter changed to " + searchInput.value);
    addTableBody(newTable, objList, sortOrderPropName, searchInput.value);
  };

  return container;
} // MakeClickSortTable

"use strict";

function MakeFilterTable(objList) {

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


    // remove the tbody from 'table' (if there is one). 
    // add a new tbody to table inserting rows from the sorted list, 
    // but only add rows that contain the filterValue.
    function addTableBody(table, objList, filterValue) {

        // remove old tbody element if there is one (else you'll get the new sorted rows 
        // added to end of what's there).
        var oldBody = table.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            table.removeChild(oldBody[0]);
        }

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);

        // To the tbody, add one row (to HTML table) per object in the object list.
        // To each row, add a td element (Table Data, a cell) that holds the object's 
        // property values. 
        for (var i in objList) {
            if (isToShow(objList[i], filterValue)) {
                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);

                // create one table data <td> content matching the property name
                var obj = objList[i];
                for (var prop in obj) {

                    // obj[prop] should already hold a "td" tag
                    tableRow.appendChild(obj[prop]);
                }
            }
        }

    } // addTableBody


    // **** ENTRY POINT *****

    // Create a container to hold the title (heading) and the HTML table
    var container = document.createElement("div");
    container.classList.add("clickSort");

    // create an area (between title and html table) where the user 
    // can enter their search criteria.
    var searchDiv = document.createElement("div");
    container.appendChild(searchDiv);
    searchDiv.innerHTML = "Filter by: ";

    // Create a filter text box for user input and append it.
    var searchInput = document.createElement("input");
    searchDiv.appendChild(searchInput);


    // Create a new HTML table tag (DOM object) and add that to the container.
    var newTable = document.createElement("table");
    container.appendChild(newTable);

    // To the HTML table, add a tr element to hold the headings of our table.
    var headerRow = document.createElement("tr");
    newTable.appendChild(headerRow);

    // To the table heading row, add one th (table heading cell) per property 
    // of the objects in the object list. 

    // iterate through the properties in the first object in the object list.
    var obj = objList[0];
    for (var propName in obj) {
        var headingCell = document.createElement("th");

        if (propName[0] === "_") {
            headingCell.innerHTML = propName.substring(1); // remove leading _ from column heading
        } else {
            headingCell.innerHTML = propName;
        }

        headerRow.appendChild(headingCell);
    }

    // initially, you want to show all rows -- that's what you get when you 
    // provide an empty string for filterValue (3rd param).
    addTableBody(newTable, objList, sortOrderPropName, "");

    searchInput.onkeyup = function () {
        console.log("search filter changed to " + searchInput.value);
        addTableBody(newTable, objList, sortOrderPropName,  searchInput.value);
    };

    return container;

}  // MakeFilterTable
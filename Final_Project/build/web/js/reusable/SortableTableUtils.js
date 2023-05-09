var SortableTableUtils = {};

SortableTableUtils.makeText = function (text) {
    var tableData = document.createElement('td');
    text = text || ""; // set it to empty string if the input parameter does not exist
    if (text === "") {
        tableData.sortOrder = "";  // put empty entries at top if sorting by this column
    } else {
        tableData.sortOrder = text.toUpperCase();
    }
    tableData.innerHTML = text;
    tableData.style.textAlign = "left"; // text elements usually align left

    return tableData;
};

SortableTableUtils.makeNumber = function (num, isFormatCurrency) {

    var tableData = document.createElement('td');

    if (!num) { // empty data
        num = "";
        tableData.sortOrder = -1; // put empty entries at top if sorting by this column

    } else { // non empty data

        tmp = num + ""; // tmp will be num but converted to string.

        // In case the number is already formatted, remove the formatting characters.
        tmp = tmp.replace(" ", "");
        tmp = tmp.replace(",", "");
        tmp = tmp.replace("$", "");

        if (isNaN(tmp)) { // non numeric data
            tableData.sortOrder = -1; // put invalid entries at top if sorting by this column
            num = "Not numeric " + num; // preserve the original data when added this error msg.
        } else { // numeric data
            var convertedNum = Number(tmp);
            tableData.sortOrder = convertedNum; // put empty entries at top if sorting by this column
            if (isFormatCurrency) {
                num = convertedNum.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
            }
        }
    }

    tableData.innerHTML = num;
    tableData.style.textAlign = "right"; // text elements usually align left
    return tableData;
};


// UPDATED 3/17/2022  
SortableTableUtils.makeDate = function (dateString) {
    var origDateString = dateString;

    var tableData = document.createElement('td');

    if (!dateString) { // empty data
        dateString = "";
        tableData.sortOrder = -1; // put empty entries at top if sorting by this column

    } else { // check if it's a date

        var parsedDate = Date.parse(dateString);
        if (isNaN(dateString) && !isNaN(parsedDate)) {

            // First, I'm creating a sortOrder that is just the number of DAYS from jan 1, 1970... 

            // divide by 1000 making seconds not milliseconds, 
            // divide by 60 making minutes not second
            // divide by another 60 making hours not minutes...
            // divide by 24 making days, not hours
            // Now parsedDate is the number of days since Jan 1st, 1970... 
            parsedDate = parsedDate / (1000 * 60 * 60 * 24);

            // So that we can appropriately sort dates before Jan 1, 1970 
            // (all the way back to 0 AD), add on the days from 0 AD to Jan 1, 1970...
            var years = 1970;
            var days = years * 365;

            // we'll use this as the sort order... 
            // Everything else (invalid dates, empty string, no value) will be -1 and 
            // show up at the top when sorting by this column.
            tableData.sortOrder = parsedDate + days;
        } else {
            tableData.sortOrder = -1; // put invalid entries at top if sorting by this column
            dateString = "Not a Date " + dateString;
        }
    }

    //console.log("Date string orig: " + origDateString + " sortOrder" + tableData.sortOrder);

    tableData.innerHTML = dateString;
    tableData.style.textAlign = "center"; // center the dates
    return tableData;
};

SortableTableUtils.makeImage = function (imageFileName, imgStyle) {

    var tableData = document.createElement('td');
    var img = document.createElement("img");
    if (imageFileName && imageFileName !== "") {
        img.src = imageFileName;
    }
    img.style = imgStyle;

    tableData.appendChild(img);
    tableData.style.textAlign = "center"; // center the images 
    tableData.sortOrder = null; // should not be sorting on image columns
    return tableData;
};

SortableTableUtils.makeIconLink = function (iconFile, iconStyle, href) {
    //console.log("makeLink inner is "+innerHTML + " and href is "+href);

    var tableData = document.createElement('td');
    tableData.innerHTML = `<a href='${href}'><img src='${iconFile}' style='${iconStyle}' /></a>`;
    tableData.style.textAlign = "center"; // center the icon
    tableData.sortOrder = null; // dont let users sort this type of column
    return tableData;
};
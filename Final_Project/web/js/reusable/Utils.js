var Utils = {};


// Utils.make: using document.createElement(), create a DOM element with HTML tag name params.htmlTag (required property).
// Optional property: params.innerHTML. Set the newly created element's innerHTML to this (if provided).
// Optional property: params.class. Set the newly created DOM element to the class (if provided). 
// Optional property: params.parent. Append the newly created element to this parent DOM element (if provided).
Utils.make = function (params) {
    if (!params.htmlTag) {
        throw new Error("Utils.make function requires parameter object with htmlTag property.");
        return; // should not really need this, just being cautious
    }

    var ele = document.createElement(params.htmlTag);

    if (params.innerHTML) {
        ele.innerHTML = params.innerHTML;
    }

    if (params.class) {
        ele.classList.add(params.class);
    }

    if (params.cssClass) { // different versions of code calling this differently. do both. 
        ele.classList.add(params.cssClass);
    }

    if (params.parent) {
        params.parent.appendChild(ele);
    }

    return ele;
};

// Utils.makePickList - makes a select tag from a list of objects. 
// Required INPUTS:
//   params.list: the JS array of objects that holds the name/value pairs for the pick list
//   params.displayProp (used to be params.valueProp): name of field that holds what will show in the pick list. 
//   params.idProp (used to be params.keyProp): name of field that holds the values of the selectTag options.
//   params.errorEle: DOM element that will hold any error messages, if any.
// Optional input:
//   params.selectedId: value of the option that is to be pre-selected.


Utils.makeSelect = function ( {list, displayProp, idProp, selectedId, parent, cssClass}) {

    function jsSort(objList, byProperty) {

        // q and z are just elements in 'objList' (that we will sort. 
        // The function you write below has to return negative or positive or zero 
        // - depending on the comparison of q and z.
        objList.sort(function (q, z) {  // in line (and anonymous) def'n of fn to compare list elements. 

            // q[byProperty] and z[byProperty] are the "compare values" for the two objects we are 
            // comparing. Since we assume alphabetic data, compare the upperCase version of these values.  
            var qVal = q[byProperty].toUpperCase();
            var zVal = z[byProperty].toUpperCase();

            var c = 0;
            if (qVal > zVal) {
                c = 1;
            } else if (qVal < zVal) {
                c = -1;
            }
            //console.log("comparing " + qVal + " to " + zVal + " is " + c);
            return c;
        });

    } // jsSort


// **********   ENTRY POINT ***************

    var selectList = document.createElement("select");

    // check that we have the parameter properties that we need.

    if (!list) {
        let msg = "Utils.makePickList needs a parameter object with 'list' property " +
                "(holds list of display/id pairs from which to make the select tag).";
        throw new Error(msg);
        return selectList; // empty <select> tag
    }

    var firstObj = list[0];

    if (!idProp || !(idProp in firstObj)) {
        let msg = "Utils.makePickList needs a parameter object with a valid 'idProp' property " +
                "(tells the property name within 'list' that becomes the values for the select tag).";
        throw new Error(msg);
        return selectList; // empty <select> tag
    }

    if (!displayProp || !(displayProp in firstObj)) {
        let msg = "Utils.makePickList needs a parameter object with a valid 'displayProp' property " +
                "(tells the property name within 'list' that should show in the select tag's UI).";
        throw new Error(msg);
        return selectList; // empty <select> tag
    }

    jsSort(list, displayProp); // make sure every pick list shows options in alphabetic order.  

    if (parent) { // parent is optional
        parent.appendChild(selectList);
    }

    if (cssClass) { // cssClass is optional
        selectList.classList.add(cssClass);
    }

    // add options to the select list
    for (var i in list) { // i goes from 0 to the last element in array list

        var myOption = document.createElement("option");
        myOption.innerHTML = list[i][displayProp]; // what shows in the select tag
        myOption.value = list[i][idProp]; // the value behind each item shown in the select tag.

        // selectedId is optional
        if (selectedId && selectList.options[i].value === selectedId) {
            selectList.selectedIndex = i;
            console.log("selected index is " + i + " value is " + selectList.value);
        }

        // add option into the select list
        selectList.appendChild(myOption);
    }

    console.log("selected value of new select tag is " + selectList.value);

    return selectList;

};

/*
 * One easy way to check if something exists is like this: 
 *    if (!thing) { ... }
 *    
 * and that does not throw an exception or halt execution. 
 * 
 * However, if the value of thing is "" or 0 then you might think the "thing" 
 * does not exist but it actually does exist (just has value "" or 0). 
 * 
 * If you think it's possible that the thing you are testing for might 
 * have a valid value of "" or 0, then you could use the following function. 
 * 
 * It will not throw an exception (uses try/catch) and will return true if the 
 * thing actually exists, false otherwise. 
 */
Utils.exists = function (thing) {
    try {
        if (thing !== undefined) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

// referenece about select tags: 
// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select
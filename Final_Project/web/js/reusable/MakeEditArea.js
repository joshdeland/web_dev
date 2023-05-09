"use strict";
/*
 * MakeEditArea returns a div that contains a prompt, an input box, and a 
 * error message (span tag) for each field it is supposed to get from the user. 
 * It also has a save button and a form level message (both public so consumer can program). 
 * 
 * MakeEditArea expects a parameter object with the following properties: 
 *   * params.areaTitle, 
 *   * params.buttonText.
 *
 * MakeEditArea also expects params.inputSpecs, an array of objects that define 
 * what inputs are to be in the EditArea. Objects in inputSpecs need these properties: 
 *     * fieldName (required)
 *   Optional properties of the objects in params.inputSpecs:
 *     * prompt (will use the fieldName as prompt, if not supplied)
 *     * disabled (boolean): makes the input box disabled, user cannot put data in.
 *     * password (boolean): set "type" of <input> tag to "password" (letters show up as dots). 
 *     * selectTag (boolean): if true, set the following properties as well:
 *       * list: object list that holds display text and values to build the select tag.
 *       * idProp: field name (within the list) that holds ids (or values) of the select tag.
 *       * displayProp: field name (within that list) that holds display text for the select tag
 *       * selectedId (optional): if provided, presets the selectTag to this id. 
 */

function MakeEditArea( {areaTitle, fieldDefns, buttonText}) {

// Add a row to validationTable (this row validates one field). 
// Return an object with these two properties (that we need to validate a field):
//  * inputTag (reference to the input box or select tag) -- to access the user's input
//  * errorTd  -- place the field level validation messges. 

    function makeInputRow(fieldDef) {

        var obj = {}; // create an object for this field with properties: input tag and error span.

        var rowDiv = Utils.make({// this div will hold prompt, user input, and fld level error msg. 
            htmlTag: "div",
            cssClass: "row",
            parent: editArea
        });
        Utils.make({// This is the prompt. 
            htmlTag: "span",
            innerHTML: fieldDef.prompt || fieldDef.fieldName, // use fieldName if prompt not provided. 
            cssClass: "prompt",
            parent: rowDiv
        });

        var inputHolder = Utils.make({// This will hold the input or select tag.  
            htmlTag: "span",
            parent: rowDiv
        });

        obj.error = Utils.make({// Will hold any validation error messages for this input.
            htmlTag: "span",
            parent: rowDiv,
            class: "error"
        });

        if (fieldDef.selectTag) {
            // store reference to select tag that will hold user's input for this field.
            obj.inputTag = Utils.makeSelect({
                list: fieldDef.list, // object list that holds role names/ids
                idProp: fieldDef.idProp, // field name (within that list) that holds ids
                displayProp: fieldDef.displayProp, // field name (within that list) that holds display values
                cssClass:"inputTag",
                errorEle: obj.error, // spot to put error messages from making pick list (if any)
                parent: inputHolder
            });

        } else {
            // store reference to input box to hold user input for this field. 
            // (possibly make it disabled and/or set it to type="password")
            obj.inputTag = Utils.make({
                htmlTag: "input",
                cssClass:"inputTag",
                parent: inputHolder
            });
            if (fieldDef.disabled) {
                obj.inputTag.setAttribute("disabled", true);
            }
            if (fieldDef.password) {
                obj.inputTag.setAttribute("type", "password");
            }
        }

        // obj has two important public properties: 
        //   * error (a span tag to hold an error msg),
        //   * inputTag - either an <input> tag or a <select> tag (both have "value" attribute that we use). 

        return obj;
    } // makeInputRow


    // ******* ENTRY POINT FOR MakeEditArea ***************

    // check parameter object, declare and initialize parameter variables.
    if (!fieldDefns || !fieldDefns[0]) {
        var msg = "MakeEditArea requires a parameter object with property 'fieldDefn' \n " +
                "which is an array of objects that define the fields for the Edit Area.";
        alert(msg);
        throw new Error(msg);
        return;
    }

    var editArea = document.createElement("div");
    editArea.classList.add("editArea");
    editArea.areaTitle = Utils.make({
        htmlTag: "h2",
        innerHTML: areaTitle || "Untitled",
        parent: editArea
    });

    for (var fldDef of fieldDefns) {

        // makeInputRow will add a div for one field to the editArea and return an object
        // that has a reference to properties:
        //    inputTag: <input> tag or <select> tag that holds user's input (both have "value" attribute). 
        //    error: <span> tag to hold any possible field level error messages. 
        // We need to access these two DOM elements programatically to validate a field.

        editArea[fldDef.fieldName] = makeInputRow(fldDef);
    }

    editArea.button = Utils.make({// this is a public DOM element so consumer can easily provide 
        // code for it. 
        htmlTag: "button",
        innerHTML: buttonText || "Save",
        parent: editArea
    });

    editArea.formMsg = Utils.make({// Inject a row into the table 
        htmlTag: "span",
        cssClass: "frmMsg",
        parent: editArea
    });
    editArea.formMsg.colSpan = 2; // form message spans two columns. 

    // create an object from the values typed into the page (using consumer desired field names). 
    editArea.getDataFromUI = function () {

        var userInputObj = {};
        for (var fldDef of fieldDefns) {
            userInputObj[fldDef.fieldName] = editArea[fldDef.fieldName].inputTag.value;
        }

        console.log("getDataFromUI - userInputObj on next line");
        console.log(userInputObj);
        return userInputObj;
    };

    // obj holds the field level error messages after clicking the save button. Write errors to UI. 
    editArea.writeErrorObjToUI = function (obj) {

        console.log("error msg object from attempt to insert (see next line)");
        console.log(obj);
        for (var fldDef of fieldDefns) {
            editArea[fldDef.fieldName].error.innerHTML = obj[fldDef.fieldName];
        }

    }; // writeErrorObjToUI

    // obj holds the values from the database (for update) to pre-fill the input tags. 
    editArea.writeDbValuesToUI = function (obj) {

        console.log("the object read from the DB (will be copied to input tags) - see next line");
        console.log(obj);
        for (var fldDef of fieldDefns) {

            //if (editArea[fieldName].inputTag) { // should work for select tags (for update) as well as input tags.
            editArea[fldDef.fieldName].inputTag.value = obj[fldDef.fieldName];
        }

    }; // writeErrorObjToUI

    return editArea;
}
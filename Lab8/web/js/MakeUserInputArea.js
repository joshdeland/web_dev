function MakeUserInputArea() {

    var userInputArea = document.createElement("div");
    var content = `
            <div class="insertArea">
                <table>
                    <tr>
                        <td>Email Address</td>
                        <td><input type="text" class="userEmail" /></td>
                        <td class="userEmailError error"></td> 
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" class="userPassword" /></td>
                        <td class="userPasswordError error"></td>
                    </tr>
                    <tr>
                        <td>Retype Your Password</td>
                        <td><input type="password" class="userPassword2" /></td>
                        <td class="userPassword2Error error"></td>
                    </tr>
                    <tr>
                        <td>Image URL</td>
                        <td><input type="text" class="image" /></td>
                        <td class="imageError error"></td>
                    </tr>
                    <tr>
                        <td>Birthday</td>
                        <td><input type="text" class="birthday" /></td>
                        <td class="birthdayError error"></td> 
                    </tr>
                    <tr>
                        <td>Membership Fee</td>
                        <td><input type="text" class="membershipFee" /></td>
                        <td class="membershipFeeError error"></td>
                    </tr>
                    <tr>
                        <td>User Role</td>
                        <td><input type="text" class="userRoleId" /></td>
                        <td class="userRoleIdError error"></td>
                    </tr>
                    <tr>
                        <td><button class="insertSaveButton">Save</button></td>
                        <td class="recordError error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        `;

    userInputArea.innerHTML = content;
    
    function insertSave() {
        console.log("insertSave was called");
        // create a user object from the values that the user has typed into the page.
        var userInputObj = {"webUserId": "",
            "userEmail": userInputArea.getElementsByClassName("userEmail")[0].value,
            "userPassword": userInputArea.getElementsByClassName("userPassword")[0].value,
            "userPassword2": userInputArea.getElementsByClassName("userPassword2")[0].value,
            "image": userInputArea.getElementsByClassName("image")[0].value,
            "birthday": userInputArea.getElementsByClassName("birthday")[0].value,
            "membershipFee": userInputArea.getElementsByClassName("membershipFee")[0].value,
            "userRoleId": userInputArea.getElementsByClassName("userRoleId")[0].value,
            "userRoleType": "",
            "errorMsg": ""
        };
        console.log(userInputObj);
        // build the url for the ajax call. Remember to encodeURI the user input object or else 
        // you may get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = encodeURI(JSON.stringify(userInputObj));
        var url = "webAPIs/insertUserSimpleAPI.jsp?jsonData=" + myData;
        ajax(url, insertAPISuccess, userInputArea.getElementsByClassName("recordError")[0]);
        function insertAPISuccess(jsObj) {
            // Running this function does not mean insert success. It just means that the Web API
            // call (to insert the record) was successful.
            // 
            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fields named exactly 
            // the same as the input data was named. 
            console.log("here is JSON object (holds error messages.");
            console.log(jsObj);
            userInputArea.getElementsByClassName("userEmailError")[0].innerHTML = jsObj.userEmail;
            userInputArea.getElementsByClassName("userPasswordError")[0].innerHTML = jsObj.userPassword;
            userInputArea.getElementsByClassName("userPassword2Error")[0].innerHTML = jsObj.userPassword2;
            userInputArea.getElementsByClassName("imageError")[0].innerHTML = jsObj.image;
            userInputArea.getElementsByClassName("birthdayError")[0].innerHTML = jsObj.birthday;
            userInputArea.getElementsByClassName("membershipFeeError")[0].innerHTML = jsObj.membershipFee;
            userInputArea.getElementsByClassName("userRoleIdError")[0].innerHTML = jsObj.userRoleId;
            if (jsObj.errorMsg.length === 0) { // success
                jsObj.errorMsg = "Record successfully inserted !!!";
            }
            userInputArea.getElementsByClassName("recordError")[0].innerHTML = jsObj.errorMsg;
        }

    } // insertSave 
       
    userInputArea.getElementsByClassName("insertSaveButton")[0].onclick=insertSave;
    return userInputArea;
}
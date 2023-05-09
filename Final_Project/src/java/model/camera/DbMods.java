package model.camera;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.*;

public class DbMods {



    public static StringData findById (DbConn dbc, String id) {
 
        // The find API needs to represent three cases: found web_user, not found, db error. 

        StringData sd = new StringData();
        try {
            String sql = "SELECT user_email, user_camera_id, brand, model, price, camera_type, camera_condition, megapixels, year_made, primary_image, description, web_user.web_user_id \n" +
            "FROM user_camera, web_user\n" +
            "WHERE user_camera.web_user_id = web_user.web_user_id\n" +
            "AND user_camera_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.userCameraId = FormatUtils.plainInteger(results.getObject("user_camera_id"));
                sd.brand = FormatUtils.formatString(results.getObject("brand"));
                sd.model = FormatUtils.formatString(results.getObject("model"));
                sd.price = FormatUtils.formatDollar(results.getObject("price"));
                sd.camera_type = FormatUtils.formatString(results.getObject("camera_type"));
                sd.camera_condition = FormatUtils.formatString(results.getObject("camera_condition"));
                sd.megapixels = FormatUtils.formatFloat(results.getObject("megapixels"));
                sd.year_made = FormatUtils.plainInteger(results.getObject("year_made"));
                sd.primary_image = FormatUtils.formatString(results.getObject("primary_image"));
                sd.description = FormatUtils.formatString(results.getObject("description"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                
            } else {
                sd.errorMsg = "Web User Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } //

    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
   public String userEmail = "";
    public String userCameraId = ""; // primary key
    public String brand = "";
    public String model = ""; // unique id
    public String price = "";
    public String camera_type = "";
    public String camera_condition = "";
    public String megapixels = "";
    public String year_made = "";
    public String primary_image = "";
    public String description = "";
    public String webUserId = ""; // foreign key
         */

         /*
          Test 
            http://localhost:8080/Insert_Activity/webAPIs/insertOtherAPI.jsp?jsonData=
    {
       "brand": "Fujifilm", 
       "model": "Awesome camera", 
       "price": "455.25",
       "camera_type": "",
       "camera_condition": "used", 
       "megapixels": "",
       "year_made": "",
       "primary_image": "feoija.jpg",
       "description": "", 
       "webUserId": "17",  
       "errorMsg": "" 
    }
          */
        // Validation
        //errorMsgs.userCameraId = ValidationUtils.integerValidationMsg(inputData.userCameraId, true);
        errorMsgs.brand = ValidationUtils.stringValidationMsg(inputData.brand, 30, true);
        errorMsgs.model = ValidationUtils.stringValidationMsg(inputData.model, 45, true);
        errorMsgs.price = ValidationUtils.decimalValidationMsg(inputData.price, true);
        errorMsgs.camera_type = ValidationUtils.stringValidationMsg(inputData.camera_type, 30, false);
        errorMsgs.camera_condition = ValidationUtils.stringValidationMsg(inputData.camera_condition, 20, true);
        errorMsgs.megapixels = ValidationUtils.decimalValidationMsg(inputData.megapixels, false);
        errorMsgs.year_made = ValidationUtils.integerValidationMsg(inputData.year_made, false);
        errorMsgs.primary_image = ValidationUtils.stringValidationMsg(inputData.primary_image, 200, true);
        errorMsgs.description = ValidationUtils.stringValidationMsg(inputData.description, 20, false);
        

       // if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case sensative comparison
       //     errorMsgs.userPassword2 = "Both passwords must match";
        //}
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO user_camera (brand, model, price, camera_type, camera_condition, megapixels, year_made, primary_image, description, web_user_id) "
                    + "values (?,?,?,?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            //pStatement.setString(1, inputData.userCameraId); // string type is simple
            pStatement.setString(1, inputData.brand);
            pStatement.setString(2, inputData.model);
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.price));
            pStatement.setString(4, inputData.camera_type); // string type is simple
            pStatement.setString(5, inputData.camera_condition);
            pStatement.setBigDecimal(6, ValidationUtils.decimalConversion(inputData.megapixels));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.year_made));
            pStatement.setString(8, inputData.primary_image); // string type is simple
            pStatement.setString(9, inputData.description);
            pStatement.setInt(10, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That camera model is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation


            //(brand, model, price, camera_type, camera_condition, megapixels, year_made, primary_image, description, web_user_id) "
            //        + "values (?,?,?,?,?,?,?,?,?,?)
            // Start preparing SQL statement
            String sql = "UPDATE user_camera SET brand=?, model=?, price=?, camera_type=?, camera_condition=?, megapixels=?, "
            + "year_made=?, primary_image=?, description=?, web_user_id=? WHERE user_camera_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.brand);
            pStatement.setString(2, inputData.model);
            pStatement.setBigDecimal(3, ValidationUtils.decimalConversion(inputData.price));
            pStatement.setString(4, inputData.camera_type); // string type is simple
            pStatement.setString(5, inputData.camera_condition);
            pStatement.setBigDecimal(6, ValidationUtils.decimalConversion(inputData.megapixels));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.year_made));
            pStatement.setString(8, inputData.primary_image); // string type is simple
            pStatement.setString(9, inputData.description);
            pStatement.setInt(10, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(11, ValidationUtils.integerConversion(inputData.userCameraId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

          // This will return empty string if all went well, else all error messages.
          errorMsgs.errorMsg = pStatement.getErrorMsg();
          if (errorMsgs.errorMsg.length() == 0) {
              if (numRows == 1) {
                  errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
              } else {
                  // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                  errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
              }
          } else if (errorMsgs.errorMsg.contains("foreign key")) {
              errorMsgs.errorMsg = "Invalid Web User Id";
          } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
              errorMsgs.errorMsg = "That camera model is already taken";
          }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update


    public static String delete (String cameraId, DbConn dbc) {

        if (cameraId == null) {
            return "Error in modelwebUser.DbMods.delete: cannot delete user_camera_id record because 'cameraId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM user_camera WHERE user_camera_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, cameraId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with user_camera_id = " + cameraId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.webUser.DbMods.delete(): " + e.getMessage();
        }

        return result;
    } // delete

} // class

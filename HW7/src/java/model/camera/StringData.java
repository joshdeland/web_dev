package model.camera;

/* The purpose of this class is just to "bundle together" all the 
 * data values that you would get from a single row of a result set
 * from joining the web_user database table with the user_role table. 

 * All fields are declared as type String (even fields might be a
 * different type in the database, like date or decimal). We do this 
 * for two reasons: 
 *     1. so we can store nicely formatted data (e.g., with $s in it). 
 *     2. so we can store "pre-validated" data that might not be able to 
 *        be converted to a valid value of the given type, for example 
 *        a user might have made a data entry error.  
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let Java/JSP code have have
 * free access to put data in or take it out. */

public class StringData {

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
    

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

}
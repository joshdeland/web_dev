package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.camera.*;

// classes in my project
import dbUtils.*;

public class CameraView {
    
    public static StringDataList getAllCameras(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT user_email, user_camera_id, brand, model, price, camera_type, camera_condition, megapixels, year_made, primary_image, description, web_user.web_user_id \n" +
"FROM user_camera, web_user\n" +
"WHERE user_camera.web_user_id = web_user.web_user_id\n" +
"ORDER BY web_user.web_user_id;";
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
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
            
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in CameraView.getAllCameras(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}

<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // Preparing this object to be written out.
    StringData sd = new StringData(); // all fields now set to ""

    session.invalidate();

    sd.errorMsg = "You have been logged out: session has been invalidated"; // it's not really an error message, but... 


    Gson gson = new Gson();
    out.print(gson.toJson(sd));
    
    /*  Note: 
    Because all of our Web APIs are invoked by our ajax (JavaScript) function 
    which expects to find the JSON of a valid object written on the page, we 
    must always write the JSON of some java object to the page, no matter what. 
    
    In this example, we really didnt need to write anything to the page, but 
    we just showed on the page what we invalidated the JSP implicit session object.
     */ 
%>

<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    String userEmail = request.getParameter("email");
    String userPassword = request.getParameter("password");
   if ((userEmail == null) || (userPassword == null)) {
            sd.errorMsg = "Cannot search for user: 'userEmail' and 'userPassword' must be supplied";
        } else {
            DbConn dbc = new DbConn();
            sd.errorMsg = dbc.getErr(); 
            if (sd.errorMsg.length() == 0) { 
                System.out.println("*** Ready to call newFind");
                sd = DbMods.findEmailAndPassword(dbc, userEmail, userPassword);  
                session.setAttribute("loggedOnUser", sd); // webUserObj is a populated StringData object
            }
            dbc.close(); 
    }
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>